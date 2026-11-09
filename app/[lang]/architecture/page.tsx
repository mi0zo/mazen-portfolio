import React from "react";
import Link from "next/link";
import { dictionaries, Locale } from "@/lib/dictionary";

export default async function ArchitecturePage({
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
      title: l === "ar" ? "معمارية الخدمات المصغرة الموجهة بالأحداث" : "Event-Driven Microservices Architecture",
      subtitle: l === "ar" ? "معالجة تدفق البيانات اللحظي بموثوقية 99.99%" : "Real-time stream processing with 99.99% fault tolerance",
      tags: ["Kafka", "Docker", "Kubernetes", "gRPC", "PostgreSQL Sharding", "Prometheus"],
      desc: l === "ar"
        ? "تصميم بنية تحتية موزعة تعتمد على نمط نشر واشتراك موجه بالأحداث باستخدام Apache Kafka، مما يضمن تدفق ومعالجة ملايين المعاملات دون أي نقطة فشل مفردة."
        : "Designed a resilient distributed event bus topology utilizing Apache Kafka and gRPC inter-service communication, maintaining zero-data-loss durability under extreme spikes.",
      metrics: [
        { label: l === "ar" ? "زمن الاستجابة" : "Latency", val: "<12ms" },
        { label: l === "ar" ? "معدل التوافر" : "Uptime SLA", val: "99.99%" },
        { label: l === "ar" ? "العمليات بالثانية" : "Throughput", val: "45K TPS" },
      ],
    },
    {
      title: l === "ar" ? "استراتيجية التخزين المؤقت الموزع والحافة" : "Global Edge Caching & Multi-Region Topology",
      subtitle: l === "ar" ? "تسريع الوصول للمستخدمين عالمياً مع إدارة ذكية للإلغاء" : "Ultra-low latency worldwide content delivery with smart cache invalidation",
      tags: ["Redis Cluster", "Cloudflare Workers", "Edge KV", "Fastly VCL", "Cache Invalidation"],
      desc: l === "ar"
        ? "بناء طبقة تخزين مؤقت هجينة متعددة المناطق تجمع بين التخزين على حافة الشبكة ومجموعات Redis الموزعة، مما خفض الحمل على قواعد البيانات بنسبة 85%."
        : "Engineered a tiered edge caching matrix with programmatic tag invalidation across 280+ global PoPs, slashing database load by 85% and cutting TTFB to under 25ms globally.",
      metrics: [
        { label: l === "ar" ? "زمن أول بايت" : "Global TTFB", val: "22ms" },
        { label: l === "ar" ? "نسبة نجاح الكاش" : "Hit Rate", val: "94.2%" },
        { label: l === "ar" ? "انخفاض الحمل" : "DB Load Cut", val: "-85%" },
      ],
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
          {dict.doors.items[2].title}
        </span>
        <div className="w-16" />
      </header>

      {/* Main Content */}
      <main className="max-w-[80rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Intro */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-2">
            {dict.doors.items[2].plate}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            {dict.doors.items[2].title}
          </h1>
          <p className="text-base md:text-lg text-muted font-normal leading-relaxed">
            {dict.doors.items[2].subtitle}
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-16">
          {caseStudies.map((cs, idx) => (
            <article
              key={idx}
              className="p-8 md:p-12 rounded-3xl border border-line bg-surface/80 backdrop-blur-xl shadow-2xl flex flex-col justify-between"
            >
              <div className="max-w-3xl mb-8">
                <span className="font-mono text-xs text-secondary font-bold mb-2 block">
                  SYSTEM DESIGN // 0{idx + 1}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
                  {cs.title}
                </h2>
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">
                  {cs.subtitle}
                </p>
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-normal mb-6">
                  {cs.desc}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 my-8 p-6 rounded-2xl bg-primary/5 border border-line">
                  {cs.metrics.map((m, mi) => (
                    <div key={mi} className="text-center">
                      <span className="font-mono text-2xl md:text-3xl font-extrabold text-foreground block">
                        {m.val}
                      </span>
                      <span className="text-xs text-muted uppercase font-semibold">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
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

