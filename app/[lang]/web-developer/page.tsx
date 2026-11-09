import React from "react";
import Link from "next/link";
import { dictionaries, Locale } from "@/lib/dictionary";

export default async function WebDeveloperPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Locale = lang === "ar" ? "ar" : "en";
  const dict = dictionaries[l];
  const isRTL = dict.dir === "rtl";

  const projects = [
    {
      title: l === "ar" ? "منصة سحابية متقدمة لإدارة الأعمال" : "Enterprise Cloud Analytics Platform",
      tagline: l === "ar" ? "معمارية موزعة عالية الاعتمادية مع تزامن فوري للبيانات" : "Distributed high-throughput SaaS platform with real-time streaming",
      tags: ["Next.js 15", "TypeScript", "PostgreSQL", "Redis", "Kafka", "Docker"],
      image: "/projects/1-zerodha.webp",
      video: "/projects/project-2.mp4",
      desc: l === "ar"
        ? "تصميم وبناء نظام تحليلي سحابي متكامل يعالج آلاف الطلبات في الثانية بكفاءة متناهية، مع واجهات تفاعلية سلسة وتخزين مؤقت ذكي على حافة الشبكة."
        : "Engineered a mission-critical web platform handling heavy concurrency with microsecond latencies, featuring an interactive edge-cached dashboard and modular microservices.",
    },
    {
      title: l === "ar" ? "بوابة الخدمات المالية وحساب الأرباح" : "Tax & Financial Engine Architecture",
      tagline: l === "ar" ? "محرك حسابي دقيق للعمليات الاستثمارية والتقارير المالية" : "Algorithmic computation engine for capital gains and investment reporting",
      tags: ["React", "TypeScript", "Node.js", "Edge Computing", "Tailwind CSS"],
      image: "/projects/2-tax-pnl.webp",
      desc: l === "ar"
        ? "تطوير محرك معقد لمعالجة الحسابات الضريبية والأرباح الرأسمالية بدقة متناهية، مع دعم كامل للتقارير التفاعلية والرسوم البيانية المباشرة."
        : "Built a high-precision computation engine processing massive financial transaction ledgers with zero discrepancy, featuring dynamic interactive visualization.",
    },
    {
      title: l === "ar" ? "نظام المحفظة والمؤشرات الرقمية" : "Interactive Developer Ecosystem & Showcase",
      tagline: l === "ar" ? "تجارب رقمية ملموسة بحركات فيزيائية ومؤثرات لوحية دقيقة" : "Tactile digital experiences with custom physical micro-interactions",
      tags: ["Next.js", "Canvas 2D", "WebGL", "Lenis", "Tailwind CSS"],
      image: "/projects/3-capital-gains.webp",
      video: "/projects/project-4.mp4",
      desc: l === "ar"
        ? "بناء واجهات ويب فائقة الإبداع تعتمد على فيزياء الحركة والمؤثرات المكانية ثلاثية الأبعاد، محققة أعلى معايير الأداء والوصول."
        : "Crafted an immersive personal portfolio featuring Verlet rope simulations, 3D holographic shaders, and custom physics engines.",
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
          {dict.doors.items[0].title}
        </span>
        <div className="w-16" />
      </header>

      {/* Main Room Content */}
      <main className="max-w-[80rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Intro */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-2">
            {dict.doors.items[0].plate}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            {dict.doors.items[0].title}
          </h1>
          <p className="text-base md:text-lg text-muted font-normal leading-relaxed">
            {dict.doors.items[0].subtitle}
          </p>
        </div>

        {/* Stacked Project Cards */}
        <div id="stack" className="space-y-16">
          {projects.map((proj, idx) => (
            <article
              key={idx}
              className="p-8 md:p-12 rounded-3xl border border-line bg-surface/80 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Media Preview (Video or Image) */}
              <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-line bg-primary/5 shadow-inner aspect-video relative">
                {proj.video ? (
                  <video
                    src={proj.video}
                    poster={proj.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Text Information */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <span className="font-mono text-xs text-secondary font-bold mb-2">
                  0{idx + 1} // CASE STUDY
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
                  {proj.title}
                </h2>
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">
                  {proj.tagline}
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed font-normal mb-6">
                  {proj.desc}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tags.map((t, ti) => (
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

