import { dictionaries, Locale } from "@/lib/dictionary";
import { ClientPortfolio } from "@/components/ClientPortfolio";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Locale = lang === "ar" ? "ar" : "en";
  const dict = dictionaries[l];

  return <ClientPortfolio dict={dict} />;
}

