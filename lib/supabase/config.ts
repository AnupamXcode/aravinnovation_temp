/**
 * Supabase configuration and safe environment detection.
 * Never prints secret values. Validates that credentials are fully formed.
 */

export interface SupabaseConfigState {
  isConfigured: boolean;
  isServiceConfigured: boolean;
  url: string | null;
  hasAnonKey: boolean;
  hasServiceRoleKey: boolean;
  missingKeys: string[];
}

export function getSupabaseConfig(): SupabaseConfigState {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || null;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || null;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || null;

  const missingKeys: string[] = [];

  const isValidUrl = Boolean(
    url &&
    !url.includes("your-project-url") &&
    !url.includes("placeholder") &&
    (url.startsWith("https://") || url.startsWith("http://localhost"))
  );

  const isValidAnonKey = Boolean(
    anonKey &&
    !anonKey.includes("your-anon-key") &&
    !anonKey.includes("placeholder") &&
    anonKey.length > 20
  );

  const isValidServiceKey = Boolean(
    serviceRoleKey &&
    !serviceRoleKey.includes("your-service-role-key") &&
    !serviceRoleKey.includes("placeholder") &&
    serviceRoleKey.length > 20
  );

  if (!isValidUrl) missingKeys.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!isValidAnonKey) missingKeys.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!isValidServiceKey) missingKeys.push("SUPABASE_SERVICE_ROLE_KEY");

  const isConfigured = isValidUrl && isValidAnonKey;
  const isServiceConfigured = isValidUrl && isValidServiceKey;

  return {
    isConfigured,
    isServiceConfigured,
    url: isValidUrl ? url : null,
    hasAnonKey: isValidAnonKey,
    hasServiceRoleKey: isValidServiceKey,
    missingKeys,
  };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig().isConfigured;
}

export function isSupabaseServiceConfigured(): boolean {
  return getSupabaseConfig().isServiceConfigured;
}
