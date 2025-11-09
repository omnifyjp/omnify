# @omnifyjp/omnify

Convert Omnify schema-lock.json to TypeScript models and enums.

[![npm version](https://badge.fury.io/js/@omnifyjp%2Fomnify.svg)](https://www.npmjs.com/package/@omnifyjp/omnify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A standalone code generator that reads Omnify schema files and generates TypeScript type definitions, enum constants, and React context providers.

## Installation

### From npm
```bash
npm install --save-dev @omnifyjp/omnify
```

### Local development (in monorepo)
```json
{
  "dependencies": {
    "@omnifyjp/omnify": "file:../packages/omnify"
  }
}
```

Then run:
```bash
npm install
```

## Usage

```bash
omnify-build [--schema <path>] --output <output-directory> [--watch]
```

### Options

- `--schema <path>` - Path to schema-lock.json file (optional, auto-detects from `.omnify/`)
- `--output <dir>` - Output directory for generated files (required)
- `--watch` - Watch for schema changes and rebuild automatically
- `--help` - Show help message

### Auto-detection

If `--schema` is not provided, the tool will automatically search for `schema-lock.json` in:
1. `../backend/.omnify/schema-lock.json` (from frontend directory)
2. `./backend/.omnify/schema-lock.json` (from project root)
3. `./.omnify/schema-lock.json` (current directory)

### Examples

```bash
# Auto-detect schema from .omnify/ directory
omnify-build --output src/omnify

# Explicit schema path
omnify-build --schema backend/.omnify/schema-lock.json --output src/omnify

# Watch mode with auto-detection
omnify-build --output src/omnify --watch
```

## Output Structure

```
output-dir/
├── types/
│   ├── enums.ts          # TypeScript enum union types
│   ├── enumOptions.ts    # Enum constant objects
│   ├── models.ts         # TypeScript interfaces
│   └── index.ts
├── contexts/
│   ├── EnumsContext.tsx  # React context provider
│   └── index.ts
└── index.ts
```

## Package.json Scripts

Add to your project's `package.json`:

```json
{
  "scripts": {
    "omnify:build": "omnify-build --output src/omnify",
    "omnify:dev": "omnify-build --output src/omnify --watch"
  }
}
```

## Using Generated Types

```typescript
// Import types
import { ApplicationForm } from '@/omnify/types';
import type { Company_EntityType } from '@/omnify/types';

// Import enum options
import { entity_typeOptions, account_typeOptions } from '@/omnify/types';

// Use in React
function MySelect() {
  return (
    <select>
      {Object.entries(entity_typeOptions).map(([value, label]) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  );
}

// Import context provider
import { EnumsProvider, useEnums } from '@/omnify/contexts';

function App() {
  return (
    <EnumsProvider>
      <YourApp />
    </EnumsProvider>
  );
}

function Component() {
  const { enums } = useEnums();
  return <div>{enums.entity_type.CORPORATION}</div>;
}
```

## Features

- ✅ Generates TypeScript interfaces from Omnify models
- ✅ Creates enum union types
- ✅ Generates enum constant objects for easy use
- ✅ Creates React context provider with static enum data
- ✅ Watch mode for development
- ✅ Type-safe enum usage
- ✅ No runtime dependencies (enums are static)
- ✅ Standalone package - works with any project structure
- ✅ Supports composite types (JapanAddress, JapanPersonName)
- ✅ Includes prefectures enum (47 prefectures)

## Supported Omnify Types

### Numeric Types
- `Id`, `Int`, `TinyInt`, `BigInt`, `Float` → `number`

### String Types
- `String`, `Text`, `LongText`, `Email`, `Password`, `JapanPhone`, `Color`, `Time` → `string`

### Boolean Types
- `Boolean` → `boolean`

### Date/Time Types
- `Date`, `Timestamp` → `string` (ISO format)

### JSON Types
- `Json` → `Record<string, any>`

### Enum Types
- `Enum` → Generated union types

### Relation Types
- `Association`, `Polymorphic`, `Lookup` → `any` (skipped in models)

### Select Types
- `Select`, `SingleSelect`, `MultiSelect` → `string`

### File Types
- `File`, `MultiFile` → `string` (file path/URL)

### Composite Types
- `JapanAddress` → Expanded to flat fields (postal_code, prefecture_id, address1-3)
- `JapanPersonName` → Expanded to flat fields (lastname, firstname, kana_lastname, kana_firstname)

## Requirements

- Node.js >= 16
- TypeScript >= 5.0 (peer dependency)

## Development

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

The package includes comprehensive tests for:
- Type mapping (Omnify types to TypeScript)
- Enum generation
- Model generation  
- Context generation with helper methods

Current coverage:
- Statements: ~70%
- Branches: ~40%
- Functions: ~80%
- Lines: ~70%

## License

MIT
