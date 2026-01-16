/**
 * @famgia/omnify - Schema-driven database migration system
 *
 * Main entry point that re-exports key APIs.
 */

// CLI exports (for config files)
export { defineConfig, loadConfig } from '@famgia/omnify-cli';
// OmnifyConfigはCLIからインライン版をエクスポート（pnpm symlink問題を回避）
export type {
  OmnifyConfig,
  ResolvedOmnifyConfig,
  DatabaseConfig,
  DatabaseDriver,
  OutputConfig,
  LaravelOutputConfig,
  TypeScriptOutputConfig,
  AdditionalSchemaPath,
  PackageLaravelOutputConfig,
  PackageOutputConfig,
} from '@famgia/omnify-cli';

// Core exports
export {
  loadSchemas,
  validateSchemas,
  createOmnify,
  Omnify,
  PluginManager,
  getSchemaMetadata,
  introspectSchema,
  introspectSchemas,
  getSchemaNames,
  getEntitySchemas,
  getEnumSchemas,
  getSchemasByGroup,
  getGroups,
  findReferencingSchemas,
  findReferencedSchemas,
  getRelationshipGraph,
  hasCircularReferences,
  getTopologicalOrder,
} from '@famgia/omnify-core';

// Type exports (OmnifyConfigはCLIからエクスポート済み)
export type {
  SchemaDefinition,
  LoadedSchema,
  SchemaCollection,
  PropertyDefinition,
  AssociationDefinition,
  OmnifyPlugin,
} from '@famgia/omnify-types';

// Laravel generator exports (migrations only)
export {
  generateMigrations,
  generateMigrationFromSchema,
  schemaToBlueprint,
} from '@famgia/omnify-laravel';

export type {
  MigrationFile,
  MigrationOptions,
} from '@famgia/omnify-laravel';

// TypeScript generator exports
export {
  generateTypeScript,
  generateTypeScriptFiles,
  generateInterfaces,
  generateEnums,
  schemaToInterface,
} from '@famgia/omnify-typescript';

export type {
  TypeScriptFile,
  TypeScriptOptions,
} from '@famgia/omnify-typescript';

// Atlas adapter exports
export {
  runAtlasDiff,
  diffHclSchemas,
  generateHclSchema,
  renderHcl,
  readLockFile,
  writeLockFile,
  compareSchemas,
  generatePreview,
  parseDiffOutput,
} from '@famgia/omnify-atlas';

export type {
  AtlasDiffResult,
  HclSchema,
  LockFile,
  DiffResult,
  ChangePreview,
} from '@famgia/omnify-atlas';
