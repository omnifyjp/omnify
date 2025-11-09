export function mapOmnifyTypeToTypeScript(omnifyType: string, nullable?: boolean): string {
  let tsType: string;

  switch (omnifyType) {
    // Numeric types
    case 'Id':
    case 'Int':
    case 'TinyInt':
    case 'BigInt':
    case 'Float':
      tsType = 'number';
      break;

    // String types
    case 'String':
    case 'Text':
    case 'LongText':
    case 'Email':
    case 'Password':
    case 'JapanPhone':
    case 'Color':
    case 'Time':
      tsType = 'string';
      break;

    // Boolean types
    case 'Boolean':
      tsType = 'boolean';
      break;

    // Date/Time types
    case 'Date':
    case 'Timestamp':
      tsType = 'string'; // ISO string format
      break;

    // JSON/Object types
    case 'Json':
      tsType = 'Record<string, any>';
      break;

    // Enum types
    case 'Enum':
      tsType = 'string'; // Will be replaced with specific enum type
      break;

    // Relation types
    case 'Association':
    case 'Polymorphic':
    case 'Lookup':
      tsType = 'any'; // Relations are complex
      break;

    // Select types
    case 'Select':
    case 'SingleSelect':
    case 'MultiSelect':
      tsType = 'string';
      break;

    // File types
    case 'File':
    case 'MultiFile':
      tsType = 'string'; // Usually file path or URL
      break;

    // Address type
    case 'Address':
      tsType = 'string';
      break;

    // Composite types (will be expanded)
    case 'JapanAddress':
    case 'JapanPersonName':
      tsType = 'object'; // Complex types - should be expanded
      break;

    default:
      console.warn(`Unknown Omnify type: ${omnifyType}, mapping to 'any'`);
      tsType = 'any';
  }

  return nullable ? `${tsType} | null` : tsType;
}

export function normalizeEnumArray(enumData: any): Array<{ value: string; label: string }> {
  if (Array.isArray(enumData)) {
    return enumData;
  }

  if (typeof enumData === 'object' && enumData !== null) {
    return Object.values(enumData);
  }

  return [];
}

