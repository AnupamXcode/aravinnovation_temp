import { redirect } from "@/i18n/routing";

export default async function RefundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/refund-policy", locale });
}
