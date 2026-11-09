import React from "react";
import Link from "next/link";
import { dictionaries, Locale } from "@/lib/dictionary";

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Locale = lang === "ar" ? "ar" : "en";
  const dict = dictionaries[l];
  const isRTL = dict.dir === "rtl";

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-secondary selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 h-16 border-b border-line bg-surface/85 backdrop-blur-md px-6 md:px-12 flex items-center justify-between">
        <Link
          href={`/${l}`}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-line bg-surface text-xs font-semibold hover:bg-neutral transition-all"
        >
          <span>{isRTL ? "→" : "←"}</span>
          <span>{isRTL ? "الرئيسية" : "Home"}</span>
        </Link>
        <span className="font-bold text-sm tracking-tight text-foreground">
          {isRTL ? "الخصوصية والاعتمادات" : "Privacy & Credits"}
        </span>
        <div className="w-16" />
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-8">
          {isRTL ? "الخصوصية والاعتمادات البرمجية" : "Privacy Policy & Technical Credits"}
        </h1>

        <div className="space-y-8 text-foreground/85 text-sm md:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              {isRTL ? "بيانات التخزين المحلي (Local Storage)" : "Local Storage Usage"}
            </h2>
            <p>
              {isRTL
                ? "يحفظ هذا الموقع مفتاحاً واحداً فقط في ذاكرة التخزين المحلي لجهازك (mazen-mode) لتذكر تفضيلك لوضع الإضاءة الداكن أو الفاتح عبر جلسات التصفح المختلفة. لا يتم تخزين أي معلومات تتبع أو بيانات شخصية تعريفية."
                : "This website stores only a single key in your browser's local storage (mazen-mode) to preserve your preference for light or dark mode across visits. No persistent tracking cookies or personally identifying cookies are placed on your machine."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              {isRTL ? "نموذج التواصل" : "Contact Inquiry Submissions"}
            </h2>
            <p>
              {isRTL
                ? "يتم استخدام المعلومات المقدمة عبر نموذج طلب المشاريع حصرياً لمناقشة وتقييم العمل البرمجي المطلوب والرد على استفسارك. لا تتم مشاركة هذه البيانات أو بيعها لأي أطراف ثالثة إطلاقاً."
                : "Any information submitted through the project inquiry modal is used solely to evaluate the engineering scope, assess availability, and respond directly to your request. Your contact details are never shared, rented, or distributed to third parties."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              {isRTL ? "الخطوط والبرمجيات مفتوحة المصدر" : "Open-Source Libraries & Fonts"}
            </h2>
            <p>
              {isRTL
                ? "تم بناء هذا الموقع باستخدام تقنيات Next.js و React و TypeScript و Three.js و Lenis. الخطوط المستخدمة هي Onest و EB Garamond و IBM Plex Sans Arabic بموجب رخصة الخطوط المفتوحة SIL Open Font License 1.1."
                : "This website is engineered with Next.js, React, TypeScript, Three.js, and Lenis. Typefaces utilized include Onest, EB Garamond, and IBM Plex Sans Arabic under the SIL Open Font License 1.1."}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

