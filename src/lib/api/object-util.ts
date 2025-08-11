function toCamel(str: string): string {
  return str.replace(/([-_][a-z])/gi, (match) =>
    match.toUpperCase().replace("-", "").replace("_", "")
  );
}

function toSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

function isObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}

function keysToCamelCase<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(keysToCamelCase) as unknown as T;
  } else if (isObject(obj)) {
    const newObj: Record<string, unknown> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = toCamel(key);
        newObj[newKey] = keysToCamelCase((obj as Record<string, unknown>)[key]);
      }
    }
    return newObj as T;
  }
  return obj;
}

function keysToSnakeCase<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(keysToSnakeCase) as unknown as T;
  } else if (isObject(obj)) {
    const newObj: Record<string, unknown> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = toSnakeCase(key);
        newObj[newKey] = keysToSnakeCase((obj as Record<string, unknown>)[key]);
      }
    }
    return newObj as T;
  }
  return obj;
}

export { keysToCamelCase, keysToSnakeCase };
