/** Session cookies only — not PKCE verifier cookies that also contain `auth-token`. */
export function isAuthSessionCookie(name: string): boolean {
  return /(?:^|-)auth-token(?:\.\d+)?$/.test(name);
}
