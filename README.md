# @famgia/omnify

Complete Laravel + React solution: Schema-to-TypeScript generation + Runtime helpers for forms

## Features

### 🎯 Build-time (Code Generation)
- ✅ Convert Omnify `schema-lock.json` to TypeScript types
- ✅ Generate enum types and options
- ✅ Generate model interfaces with relations
- ✅ Generate Enums Context Provider with type-safe helpers
- ✅ Watch mode for auto-regeneration

### 🚀 Runtime (React Helpers)
- ✅ `useFormSubmit` - Auto Laravel validation error mapping
- ✅ `createLaravelAxios` - Pre-configured axios for Laravel
- ✅ `getCsrfCookie` - CSRF token helper
- ✅ Full TypeScript support

## Installation

```bash
npm install @famgia/omnify
```

## Usage

### 1. Generate Types (Build-time)

```bash
# In frontend project
npx omnify-build --output src/omnify

# Watch mode
npx omnify-build --output src/omnify --watch
```

### 2. Use Generated Types & Enums

```typescript
import { User, Company } from '@/omnify/models';
import { useEnums } from '@/omnify';

function MyForm() {
  const { getOptions, getPrefecturesAsNumbers } = useEnums();
  
  const accountTypeOptions = getOptions('ApplicationForm', 'account_type');
  const prefectureOptions = getPrefecturesAsNumbers();
  
  return <Select options={accountTypeOptions} />;
}
```

### 3. Use Runtime Helpers

```typescript
import { useFormSubmit, getCsrfCookie } from '@famgia/omnify';
import { Form, Button } from 'antd';

function MyForm() {
  const [form] = Form.useForm();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const { handleSubmit, loading } = useFormSubmit({
    form,
    submitFn: createUser,
    getCsrfToken: () => getCsrfCookie(apiUrl!),
    onSuccess: (response) => {
      message.success('Success!');
    },
  });

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="email">
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Submit
      </Button>
    </Form>
  );
}
```

## API

### `useFormSubmit<TResponse>(options)`

Hook for form submission with automatic Laravel validation error mapping.

**Options:**
- `form: FormInstance` - Ant Design form instance
- `submitFn: (values) => Promise<TResponse>` - API call function
- `getCsrfToken?: () => Promise<void>` - CSRF token getter
- `onSuccess?: (response, values) => void` - Success callback
- `onError?: (error, values) => void` - Custom error handler
- `errorMessages?: { 500?, 401?, 403?, default? }` - Custom error messages

**Returns:**
- `handleSubmit: (values) => Promise<void>` - Submit handler
- `loading: boolean` - Loading state
- `setLoading: (loading) => void` - Set loading manually

### `createLaravelAxios(baseURL)`

Create pre-configured axios instance for Laravel API.

```typescript
import { createLaravelAxios } from '@famgia/omnify';

const axios = createLaravelAxios('https://api.example.com');
```

### `getCsrfCookie(baseURL)`

Get CSRF cookie for Laravel Sanctum.

```typescript
import { getCsrfCookie } from '@famgia/omnify';

await getCsrfCookie('https://api.example.com');
```

## Benefits

- 🚀 Reduce 100+ lines of boilerplate per form
- 🛡️ Type-safe enums and models
- 🔄 Auto-sync with backend schema
- 📝 Consistent error handling
- ⚡ Build-time code generation
- 🎯 Runtime helpers for common tasks

## License

MIT
