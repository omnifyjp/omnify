# Changelog

All notable changes to this project will be documented in this file.

## [0.4.0] - 2025-11-09

### Added
- **Base Models + Extended Models pattern**: Base models are now auto-generated with `Base` prefix and should not be edited
- **Extended models directory**: `models/` directory with customizable model files that extend base models
- Extended model files are generated once and never overwritten, allowing full customization
- `generateExtendedModelFile()` function to create customizable model templates
- `generateModelsIndexFile()` to export all extended models

### Changed
- Base models now use `Base` prefix (e.g., `BaseUser`, `BaseCompany`)
- Frontend code should import from `models/` instead of `types/models`
- Main `index.ts` now exports from `models/` directory

### Structure
```
omnify/
├── types/
│   ├── models.ts          # BaseUser, BaseCompany, etc (auto-generated, DO NOT EDIT)
│   └── enums.ts
├── models/
│   ├── User.ts            # extends BaseUser (SAFE TO CUSTOMIZE)
│   ├── Company.ts         # extends BaseCompany (SAFE TO CUSTOMIZE)
│   └── index.ts           # exports all
└── contexts/
    └── EnumsContext.tsx
```

### Example
```typescript
// Auto-generated base model (DO NOT EDIT)
// types/models.ts
export interface BaseUser {
  id: number;
  name: string;
}

// Customizable extended model (SAFE TO EDIT)
// models/User.ts
import { BaseUser } from '../types/models';

export interface User extends BaseUser {
  // Add your custom fields here
  fullName?: string;
  avatarUrl?: string;
}

// Use in your app
import { User } from '@/omnify';
```

## [0.3.0] - 2025-11-09

### Added
- **Type-safe enum keys**: Exported `EnumKey` type for better TypeScript autocomplete and type checking
- JSDoc comments for all helper methods (`getLabel`, `getValue`, `getOptions`) with usage examples
- Exported `EnumsContextType` interface for better type inference

### Changed
- All helper methods now use `EnumKey` type instead of `keyof EnumOptions` for cleaner API
- Improved IntelliSense support - now you get autocomplete for enum keys like `'account_type'`, `'company_type'`, etc.

## [0.2.3] - 2025-11-09

### Fixed
- Fixed `npm pkg fix` warning about bin script path

## [0.2.2] - 2025-11-09

### Changed
- Merged `enums.ts` and `enumOptions.ts` into single `enums.ts` file
- Updated `types/index.ts` to only export `enums` and `models`

## [0.2.1] - 2025-11-09

### Added
- Comprehensive test suite using Jest
- Test coverage for all generators and utilities
- PascalCase naming for enum types (e.g., `ApplicationFormEntityType` instead of `ApplicationForm_entity_type`)
- Mixed-case word preservation in PascalCase conversion

### Changed
- Enum type names now use PascalCase for better TypeScript conventions
- Improved code quality with test coverage

## [0.2.0] - 2025-11-09

### Added
- Helper methods in `EnumsContext.tsx`:
  - `getLabel(enumKey, value)` - convert value to label
  - `getValue(enumKey, label)` - convert label to value
  - `getOptions(enumKey)` - get options for Select components
- Prefectures support in enum context (all 47 Japanese prefectures)

### Changed
- Updated package name to `@famgia/omnify`
- Improved documentation in README

## [0.1.3] - 2025-11-09

### Fixed
- Fixed model generation to handle composite types correctly
- Added support for ManyToOne, OneToMany, OneToOne, ManyToMany relations
- Fixed duplicate fields in generated models

## [0.1.2] - 2025-11-09

### Fixed
- Fixed npm registry indexing issue
- Package now available on npm

## [0.1.1] - 2025-11-09

### Fixed
- Fixed npm publish issues

## [0.1.0] - 2025-11-09

### Added
- Initial release
- Generate TypeScript models from `schema-lock.json`
- Generate enum types and options
- Generate React Context for enums
- CLI tool `omnify-build` with watch mode
- Auto-detect `schema-lock.json` from common paths
