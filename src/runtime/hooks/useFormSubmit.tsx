import { useState } from 'react';
import { FormInstance, App } from 'antd';

export interface UseFormSubmitOptions<TResponse = any> {
    form: FormInstance;
    submitFn: (values: any) => Promise<TResponse>;
    onSuccess?: (response: TResponse, values: any) => void | Promise<void>;
    onError?: (error: any, values: any) => void | Promise<void>;
    getCsrfToken?: () => Promise<void>;
    errorMessages?: {
        500?: string;
        401?: string;
        403?: string;
        default?: string;
    };
}

export interface UseFormSubmitResult {
    handleSubmit: (values: any) => Promise<void>;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

/**
 * Custom hook for handling form submission with automatic Laravel validation error mapping
 * 
 * @example
 * ```tsx
 * const { handleSubmit, loading } = useFormSubmit({
 *   form,
 *   submitFn: createUser,
 *   getCsrfToken: () => getCsrfCookie(apiUrl),
 *   onSuccess: (response) => {
 *     message.success('Success!');
 *   },
 * });
 * ```
 */
export function useFormSubmit<TResponse = any>(
    options: UseFormSubmitOptions<TResponse>
): UseFormSubmitResult {
    const {
        form,
        submitFn,
        onSuccess,
        onError,
        getCsrfToken,
        errorMessages = {},
    } = options;

    const [loading, setLoading] = useState(false);
    const { message: messageApi } = App.useApp();

    const handleSubmit = async (values: any): Promise<void> => {
        setLoading(true);
        try {
            if (getCsrfToken) {
                await getCsrfToken();
            }

            const response = await submitFn(values);

            if (onSuccess) {
                await onSuccess(response, values);
            }
        } catch (error: any) {
            console.error('Form submission error:', error);

            if (onError) {
                await onError(error, values);
                return;
            }

            // Handle validation errors (422)
            if (error.response?.status === 422 && error.response?.data?.errors) {
                const errors = error.response.data.errors;

                // Set field errors
                const formErrors = Object.keys(errors).map((field) => ({
                    name: field,
                    errors: errors[field],
                }));
                form.setFields(formErrors);

                // Show error message
                const errorCount = Object.keys(errors).length;
                const errorList = Object.values(errors)
                    .map((msgs: any) => msgs[0])
                    .join(' / ');

                messageApi.error({
                    content: `入力内容にエラーがあります（${errorCount}件）: ${errorList}`,
                    duration: 8,
                });

                console.error('Validation errors:', errors);
            }
            // Handle server errors
            else if (error.response?.status >= 500) {
                messageApi.error(
                    errorMessages[500] || 'サーバーエラーが発生しました。しばらくしてから再度お試しください。'
                );
            }
            // Handle auth errors
            else if (error.response?.status === 401 || error.response?.status === 403) {
                const status = error.response.status as 401 | 403;
                messageApi.error(
                    errorMessages[status] || '認証エラーが発生しました。再度ログインしてください。'
                );
            }
            // Handle generic errors
            else {
                messageApi.error(
                    error.response?.data?.message || errorMessages.default || '送信に失敗しました'
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        handleSubmit,
        loading,
        setLoading,
    };
}

