import React from "react";
import Link from "next/link";
import { dictionaries, Locale } from "@/lib/dictionary";

export default async function UiUxEngineerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Locale = lang === "ar" ? "ar" : "en";
  const dict = dictionaries[l];
  const isRTL = dict.dir === "rtl";

  const caseStudies = [
    {
      title: l === "ar" ? "نظام كليك للتعاون والتواصل المؤسسي" : "Cliq Collaboration & Workflow System",
      subtitle: l === "ar" ? "واجهات متجاوبة فائقة السرعة مع تفاعلات لحظية" : "High-density enterprise communication & task orchestration",
      tags: ["Figma Tokens", "Design System", "WCAG 2.1 AA", "Keyboard Traps", "Micro-motion"],
      video: "/projects/ux-cliq.mp4",
      poster: "/projects/ux-cliq.webp",
      desc: l === "ar"
        ? "تصميم وهندسة نظام تصميم كامل لتطبيق محادثات وتنسيق مهام مؤسسي يجمع بين كثافة المعلومات العالية وسلاسة التصفح مع دعم تام لقارئات الشاشة."
        : "Engineered an accessible, high-density design system powering enterprise collaboration. Optimized for full keyboard navigation and multi-theme tokens.",
    },
    {
      title: l === "ar" ? "منصة استئجار السكن الطلابي الذكية" : "Prime Accommodation & Booking Hub",
      subtitle: l === "ar" ? "رحلة مستخدم مبسطة بحركات إرشادية وتأكيد حجز فوري" : "Intuitive spatial search and conversational booking flow",
      tags: ["UX Research", "Figma", "Design Tokens", "Micro-interactions", "User Testing"],
      video: "/projects/ux-1.mp4",
      poster: "/projects/ux-1.webp",
      desc: l === "ar"
        ? "إعادة صياغة تجربة حجز السكن الجامعي من خلال واجهة بصرية تركز على الخرائط التفاعلية وتصفية النتائج اللحظية دون إعادة تحميل الصفحة."
        : "Reimagined the student housing discovery journey through interactive map-driven exploration, fluid progressive disclosures, and frictionless checkout.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-secondary selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-30 h-16 border-b border-line bg-surface/85 backdrop-blur-md px-6 md:px-12 flex items-center justify-between">
        <Link
          href={`/${l}#works`}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-line bg-surface text-xs font-semibold hover:bg-neutral transition-all"
        >
          <span>{isRTL ? "→" : "←"}</span>
          <span>{dict.doors.backPrompt}</span>
        </Link>
        <span className="font-bold text-sm tracking-tight text-foreground">
          {dict.doors.items[3].title}
        </span>
        <div className="w-16" />
      </header>

      {/* Main Content */}
      <main className="max-w-[80rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Intro */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-2">
            {dict.doors.items[3].plate}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            {dict.doors.items[3].title}
          </h1>
          <p className="text-base md:text-lg text-muted font-normal leading-relaxed">
            {dict.doors.items[3].subtitle}
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-16">
          {caseStudies.map((cs, idx) => (
            <article
              key={idx}
              className="p-8 md:p-12 rounded-3xl border border-line bg-surface/80 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Media */}
              <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-line bg-primary/5 shadow-inner aspect-video relative">
                <video
                  src={cs.video}
                  poster={cs.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <span className="font-mono text-xs text-secondary font-bold mb-2">
                  UX CASE STUDY // 0{idx + 1}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
                  {cs.title}
                </h2>
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">
                  {cs.subtitle}
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed font-normal mb-6">
                  {cs.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {cs.tags.map((t, ti) => (
                    <span
                      key={ti}
                      className="px-3 py-1 rounded-full border border-line bg-background/60 text-[11px] font-mono text-foreground font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

