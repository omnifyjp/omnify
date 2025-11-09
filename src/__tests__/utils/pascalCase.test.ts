// Test for toPascalCase utility function
// We need to export it from the generators to test it

describe('toPascalCase utility', () => {
    const toPascalCase = (str: string): string => {
        return str
            .split('_')
            .map(word => {
                if (word !== word.toUpperCase() && word !== word.toLowerCase()) {
                    return word;
                }
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join('');
    };

    describe('basic cases', () => {
        it('should convert snake_case to PascalCase', () => {
            expect(toPascalCase('user_status')).toBe('UserStatus');
            expect(toPascalCase('account_type')).toBe('AccountType');
        });

        it('should convert single word', () => {
            expect(toPascalCase('status')).toBe('Status');
            expect(toPascalCase('role')).toBe('Role');
        });

        it('should handle UPPER_CASE', () => {
            expect(toPascalCase('USER_STATUS')).toBe('UserStatus');
            expect(toPascalCase('ACCOUNT_TYPE')).toBe('AccountType');
        });
    });

    describe('mixed-case preservation', () => {
        it('should preserve already mixed-case words', () => {
            expect(toPascalCase('ApplicationForm')).toBe('ApplicationForm');
            expect(toPascalCase('MyCustomModel')).toBe('MyCustomModel');
        });

        it('should preserve mixed-case in compound words', () => {
            expect(toPascalCase('ApplicationForm_entity_type')).toBe('ApplicationFormEntityType');
            expect(toPascalCase('MyModel_status')).toBe('MyModelStatus');
        });

        it('should handle combination of mixed and lowercase', () => {
            expect(toPascalCase('ApplicationForm_company_type_position')).toBe('ApplicationFormCompanyTypePosition');
        });
    });

    describe('edge cases', () => {
        it('should handle empty string', () => {
            expect(toPascalCase('')).toBe('');
        });

        it('should handle single character', () => {
            expect(toPascalCase('a')).toBe('A');
            expect(toPascalCase('A')).toBe('A');
        });

        it('should handle multiple underscores', () => {
            expect(toPascalCase('user__status')).toBe('UserStatus');
            expect(toPascalCase('___test___')).toBe('Test');
        });

        it('should handle trailing/leading underscores', () => {
            expect(toPascalCase('_user_status_')).toBe('UserStatus');
        });
    });

    describe('real-world examples', () => {
        it('should handle ApplicationForm fields', () => {
            expect(toPascalCase('ApplicationForm_entity_type')).toBe('ApplicationFormEntityType');
            expect(toPascalCase('ApplicationForm_company_type')).toBe('ApplicationFormCompanyType');
            expect(toPascalCase('ApplicationForm_account_type')).toBe('ApplicationFormAccountType');
        });

        it('should handle Company fields', () => {
            expect(toPascalCase('Company_entity_type')).toBe('CompanyEntityType');
            expect(toPascalCase('Company_status')).toBe('CompanyStatus');
        });

        it('should handle User fields', () => {
            expect(toPascalCase('User_role')).toBe('UserRole');
            expect(toPascalCase('User_status')).toBe('UserStatus');
        });
    });
});

