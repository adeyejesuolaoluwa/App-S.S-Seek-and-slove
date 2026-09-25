export type AppRole = 'USER' | 'ADMIN'

export function canAccessAdmin(role: AppRole) {
  return role === 'ADMIN'
}

export function requireAdmin(role: AppRole) {
  if (!canAccessAdmin(role)) {
    throw new Error('ADMIN_ROLE_REQUIRED')
  }
}
