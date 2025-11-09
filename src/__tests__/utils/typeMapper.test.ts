import { mapOmnifyTypeToTypeScript } from '../../utils/typeMapper';

describe('typeMapper', () => {
    describe('mapOmnifyTypeToTypeScript', () => {
        it('should map String types correctly', () => {
            expect(mapOmnifyTypeToTypeScript('String')).toBe('string');
            expect(mapOmnifyTypeToTypeScript('Text')).toBe('string');
            expect(mapOmnifyTypeToTypeScript('Email')).toBe('string');
            expect(mapOmnifyTypeToTypeScript('LongText')).toBe('string');
        });

        it('should map numeric types correctly', () => {
            expect(mapOmnifyTypeToTypeScript('Int')).toBe('number');
            expect(mapOmnifyTypeToTypeScript('BigInt')).toBe('number');
            expect(mapOmnifyTypeToTypeScript('Float')).toBe('number');
            expect(mapOmnifyTypeToTypeScript('Id')).toBe('number');
        });

        it('should map Boolean types correctly', () => {
            expect(mapOmnifyTypeToTypeScript('Boolean')).toBe('boolean');
        });

        it('should map date/time types correctly', () => {
            expect(mapOmnifyTypeToTypeScript('Date')).toBe('string');
            expect(mapOmnifyTypeToTypeScript('Timestamp')).toBe('string');
        });

        it('should map JSON types correctly', () => {
            expect(mapOmnifyTypeToTypeScript('Json')).toBe('Record<string, any>');
        });

        it('should map File types correctly', () => {
            expect(mapOmnifyTypeToTypeScript('File')).toBe('string');
        });

        it('should handle nullable types', () => {
            expect(mapOmnifyTypeToTypeScript('String', true)).toBe('string | null');
            expect(mapOmnifyTypeToTypeScript('Int', true)).toBe('number | null');
            expect(mapOmnifyTypeToTypeScript('Boolean', true)).toBe('boolean | null');
        });

        it('should return "any" for unknown types', () => {
            expect(mapOmnifyTypeToTypeScript('UnknownType')).toBe('any');
        });
    });
});

