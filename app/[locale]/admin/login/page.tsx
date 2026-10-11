"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useSiteConfig } from "@/lib/site-config";
import { Lock, ShieldCheck, ArrowRight, AlertCircle, Database, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/BrandLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const { isAuthenticated, loginAdmin } = useSiteConfig();

  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [authStatus, setAuthStatus] = React.useState<{ isConfigured: boolean; checked: boolean }>({
    isConfigured: false,
    checked: false,
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace(`/${locale}/admin`);
    }
  }, [isAuthenticated, locale, router]);

  React.useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        setAuthStatus({
          isConfigured: Boolean(data?.supabaseConfig?.isConfigured),
          checked: true,
        });
      })
      .catch(() => {
        setAuthStatus({ isConfigured: false, checked: true });
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const success = await loginAdmin(identifier, password);
      if (success) {
        router.replace(`/${locale}/admin`);
      } else {
        setErrorMessage("Invalid credentials. Please verify your email/username and password.");
      }
    } catch {
      setErrorMessage("Authentication service unavailable. Please check connectivity.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div data-admin-root="true" className="min-h-screen w-full bg-[#FAF5EE] dark:bg-[#161310] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <BrandLogo />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE3D3]/60 dark:bg-[#2C221B] text-[#f15e1c] text-xs font-semibold border border-[#F4A97F]/40">
            <Lock className="w-3.5 h-3.5" />
            <span>Administrator Access Control</span>
          </div>
          <h1 className="text-2xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
            Admin Sign In
          </h1>
          <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
            Sign in with your verified administrator credentials
          </p>

          {authStatus.checked && (
            <div className="pt-2 flex justify-center">
              {authStatus.isConfigured ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#2e936f]/10 text-[#2e936f] border border-[#2e936f]/20">
                  <Database className="w-3 h-3" />
                  Supabase Auth Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#fab60a]/15 text-[#3A2E27] dark:text-[#ffec69] border border-[#fab60a]/30">
                  <Key className="w-3 h-3 text-[#f15e1c]" />
                  Local Recovery Mode
                </span>
              )}
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
              Admin Email or Username
            </label>
            <input
              type="text"
              required
              disabled={isLoading}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="admin@aravinnovations.com or username"
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FFFDF9] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] focus:outline-none focus:ring-2 focus:ring-[#f15e1c] disabled:opacity-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
              Password
            </label>
            <input
              type="password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FFFDF9] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] focus:outline-none focus:ring-2 focus:ring-[#f15e1c] disabled:opacity-50"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            className="w-full justify-center text-sm font-semibold rounded-xl"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {isLoading ? "Authenticating..." : "Authenticate & Enter Dashboard"}
          </Button>
        </form>

        <div className="pt-4 border-t border-[#EFE2D6] dark:border-[#1f1f1f] text-center">
          <span className="text-[11px] font-mono text-[#7A6A5F] dark:text-[#B8ACA0] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#f15e1c]" />
            <span>Server-Verified Session &bull; RBAC Protected</span>
          </span>
        </div>
      </div>
    </div>
  );
}
