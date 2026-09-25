export function isAllowedOrigin(origin: string, allowedOrigins: string[]) {
  return allowedOrigins.includes(origin)
}

export function redactSecret(value: string | undefined) {
  if (!value) return '[missing]'
  if (value.length < 8) return '[redacted]'
  return `${value.slice(0, 3)}...${value.slice(-2)}`
}

export function assertSecureProductionConfig(config: {
  authSecret?: string
  databaseUrl?: string
  stripeSecretKey?: string
}) {
  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key)
  if (missing.length) throw new Error(`Missing server configuration: ${missing.join(', ')}`)
}
