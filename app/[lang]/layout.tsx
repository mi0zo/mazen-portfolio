import React from "react";
import type { Metadata } from "next";
import { dictionaries, Locale } from "@/lib/dictionary";
import { DirectionSetter } from "@/components/common/DirectionSetter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l: Locale = lang === "ar" ? "ar" : "en";
  const dict = dictionaries[l];
  const isArabic = l === "ar";

  const title = isArabic
    ? `${dict.name} — ${dict.role} والمعماريات السحابية`
    : `${dict.name} — ${dict.role} & Software Architect`;
  const description = dict.tagline;

  return {
    title,
    description,
    keywords: isArabic
      ? ["مازن", "مطور برمجيات", "معمارية برمجيات", "تطبيقات الويب", "تطبيقات الجوال", "أنظمة موزعة", "Next.js", "TypeScript"]
      : ["Mazen", "Software Developer", "Software Architect", "Full-Stack Engineer", "Mobile Applications", "Next.js", "TypeScript", "Portfolio"],
    authors: [{ name: dict.name }],
    creator: dict.name,
    alternates: {
      canonical: `/${l}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      title,
      description,
      locale: isArabic ? "ar_SA" : "en_US",
      type: "website",
      siteName: `${dict.name} Portfolio`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Locale = lang === "ar" ? "ar" : "en";
  const dir = l === "ar" ? "rtl" : "ltr";

  return (
    <>
      <DirectionSetter lang={l} dir={dir} />
      <div dir={dir} className={l === "ar" ? "font-arabic" : "font-sans"}>
        {children}
      </div>
    </>
  );
}
