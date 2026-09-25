# S.S. Security Boundary

## Secrets

- Keep database, authentication, payment, webhook, and administrator values in server environment variables.
- Do not prefix secrets with `VITE_`; Vite exposes those values to browser code.
- Never store raw card data. Create payment sessions server-side and verify provider webhooks server-side.

## Authorization

- Authenticate users with a production provider before loading private workspace data.
- Enforce `ADMIN` role checks on the server for every admin request. The client dashboard is only a presentation boundary.
- Scope project, order, notification, and customization queries by the authenticated user id.

## Request handling

- Validate and sanitize every request on the server using the validators in `src/lib/validation.ts` as a baseline.
- Add rate limiting to authentication, contact, checkout, and webhook endpoints.
- Use secure, HTTP-only, same-site cookies for sessions and verify webhook signatures.
- Record sensitive administrator actions in `audit_logs`.

## Deployment checklist

- Set HTTPS-only cookies and a strict Content Security Policy at the hosting layer.
- Configure PostgreSQL least-privilege credentials and automated backups.
- Configure payment webhooks before enabling paid orders.
- Rotate `AUTH_SECRET`, provider keys, and admin recovery credentials using the deployment secret manager.
