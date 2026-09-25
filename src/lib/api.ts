import { validateContactInput, validateProjectInput } from './validation'

export type ApiResponse<T> = {
  ok: boolean
  data?: T
  errors?: Record<string, string>
}

export function createProjectRequest(input: unknown): ApiResponse<{ message: string }> {
  const result = validateProjectInput(input)
  if (!result.success) return { ok: false, errors: result.errors }
  return { ok: true, data: { message: 'Project request validated for server persistence.' } }
}

export function createContactRequest(input: unknown): ApiResponse<{ message: string }> {
  const result = validateContactInput(input)
  if (!result.success) return { ok: false, errors: result.errors }
  return { ok: true, data: { message: 'Contact request validated for server persistence.' } }
}
