import { redirect } from "@/i18n/routing";

export default async function WebApplicationDevRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/services/web-app-development", locale });
}
