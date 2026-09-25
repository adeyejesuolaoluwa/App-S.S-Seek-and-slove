export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> }

const clean = (value: unknown) => typeof value === 'string' ? value.trim() : ''

const required = (value: unknown, field: string, errors: Record<string, string>) => {
  const result = clean(value)
  if (!result) errors[field] = `${field} is required`
  return result
}

export type ProjectInput = {
  name: string
  productType: string
  description: string
  purpose: string
  audience: string
  features?: string
}

export function validateProjectInput(input: unknown): ValidationResult<ProjectInput> {
  const source = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>
  const errors: Record<string, string> = {}
  const data = {
    name: required(source.name, 'name', errors),
    productType: required(source.productType, 'productType', errors),
    description: required(source.description, 'description', errors),
    purpose: required(source.purpose, 'purpose', errors),
    audience: required(source.audience, 'audience', errors),
    features: clean(source.features),
  }
  if (data.name.length > 120) errors.name = 'Name must be 120 characters or fewer'
  if (data.description.length > 4000) errors.description = 'Description must be 4,000 characters or fewer'
  return Object.keys(errors).length ? { success: false, errors } : { success: true, data }
}

export type ContactInput = { name: string; email: string; message: string }

export function validateContactInput(input: unknown): ValidationResult<ContactInput> {
  const source = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>
  const errors: Record<string, string> = {}
  const email = clean(source.email)
  const data = {
    name: required(source.name, 'name', errors),
    email,
    message: required(source.message, 'message', errors),
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address'
  return Object.keys(errors).length ? { success: false, errors } : { success: true, data }
}

export function sanitizeSearchQuery(value: unknown) {
  return clean(value).replace(/[<>]/g, '').slice(0, 120)
}
