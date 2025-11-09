export interface EnumValue {
  value: string;
  label: string;
}

export interface Property {
  objectName: string;
  propertyName: string;
  displayName: string;
  description: string | null;
  type: string;
  enum?: EnumValue[] | Record<string, EnumValue>;
  nullable?: boolean;
  primary?: boolean;
  unique?: boolean;
  length?: number | null;
  default?: string;
  
  // Association/Relation properties
  relation?: string;
  target?: string;
  foreignKey?: string | null;
  inversedBy?: string | null;
  mappedBy?: string | null;
  
  // Composite type properties
  fields?: Record<string, any>;
  
  // Polymorphic properties
  morphName?: string | null;
}

export interface OmnifyObject {
  objectName: string;
  kind: string;
  titleIndex: string;
  groupName: string;
  displayName: string;
  singularName: string;
  pluralName: string;
  tableName: string;
  description: string | null;
  properties: Record<string, Property>;
}

export interface SchemaLock {
  [key: string]: OmnifyObject;
}

