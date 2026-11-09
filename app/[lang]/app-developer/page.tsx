import React from "react";
import Link from "next/link";
import { dictionaries, Locale } from "@/lib/dictionary";

export default async function AppDeveloperPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Locale = lang === "ar" ? "ar" : "en";
  const dict = dictionaries[l];
  const isRTL = dict.dir === "rtl";

  const apps = [
    {
      title: l === "ar" ? "تطبيق إدارة النفقات والمالية الذكي" : "Zenith Expense Tracker",
      tagline: l === "ar" ? "تفاعل إيمائي طبيعي مع تزامن بيانات مشفر محلياً" : "Gesture-driven financial journaling with biometric security",
      tags: ["React Native", "TypeScript", "CoreData / SQLite", "Biometrics", "Offline-first"],
      video: "/projects/app-expense.mp4",
      poster: "/projects/app-expense.webp",
      icon: "/projects/icon-expense.webp",
      desc: l === "ar"
        ? "تطبيق مالي فائق السرعة يعتمد على السحب والإيماءات المباشرة لتسجيل المعاملات المالية، مع تشفير محلي على الجهاز والعمل الكامل دون اتصال."
        : "A gesture-driven personal expense assistant built for immediate offline entry, haptic tactile response, and local AES-256 encrypted storage.",
    },
    {
      title: l === "ar" ? "الخزنة الرقمية الآمنة للملفات" : "Cipher Vault: Secure Document Sandbox",
      tagline: l === "ar" ? "أعلى معايير الحماية مع مصادقة بيومترية متقدمة" : "Zero-knowledge cryptographic document storage",
      tags: ["Flutter", "Dart", "Secure Enclave", "FaceID / TouchID", "Crypto"],
      video: "/projects/app-vault.mp4",
      poster: "/projects/app-vault.webp",
      icon: "/projects/icon-vault.webp",
      desc: l === "ar"
        ? "خزنة مشفرة لحفظ المستندات الحساسة والصور مع حماية متكاملة عبر Secure Enclave والمصادقة الحيوية، ودعم إخفاء التطبيق عند الحاجة."
        : "An ultra-secure digital vault utilizing hardware-backed biometric authentication, zero-knowledge encryption, and automated decoy vaults.",
    },
    {
      title: l === "ar" ? "لعبة كسر القوالب التفاعلية" : "Kinetic Brick Breaker Engine",
      tagline: l === "ar" ? "فيزياء حركة تصادمية سلسة بمعدل 120 إطار في الثانية" : "120 FPS high-refresh physics simulation and arcade engine",
      tags: ["Mobile Physics", "SpriteKit / Canvas", "Haptic Feedback", "Audio Synthesis"],
      video: "/projects/app-brick.mp4",
      poster: "/projects/app-brick.webp",
      icon: "/projects/icon-brick.webp",
      desc: l === "ar"
        ? "محرك ألعاب فيزيائي خفيف ومحسن للهواتف الذكية يوفر استجابة لمسية لحظية مع مؤثرات ارتدادية دقيقة وتباين رسومي ممتع."
        : "Engineered an arcade physics simulation executing seamless 120Hz collision detection, dynamic particle trails, and synchronized haptic pulses.",
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
          {dict.doors.items[1].title}
        </span>
        <div className="w-16" />
      </header>

      {/* Main Content */}
      <main className="max-w-[80rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Intro */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-2">
            {dict.doors.items[1].plate}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            {dict.doors.items[1].title}
          </h1>
          <p className="text-base md:text-lg text-muted font-normal leading-relaxed">
            {dict.doors.items[1].subtitle}
          </p>
        </div>

        {/* Apps Grid / Showcase */}
        <div className="space-y-16">
          {apps.map((app, idx) => (
            <article
              key={idx}
              className="p-8 md:p-12 rounded-3xl border border-line bg-surface/80 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Device Video Player */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-64 md:w-72 rounded-[40px] border-4 border-foreground/20 p-2 bg-foreground/10 shadow-2xl">
                  <div className="w-full rounded-[32px] overflow-hidden aspect-[9/19] bg-black relative">
                    <video
                      src={app.video}
                      poster={app.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={app.icon}
                    alt=""
                    className="w-12 h-12 rounded-2xl shadow-md border border-line"
                  />
                  <div>
                    <span className="font-mono text-xs text-secondary font-bold block mb-1">
                      MOBILE SUITE // 0{idx + 1}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                      {app.title}
                    </h2>
                  </div>
                </div>

                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">
                  {app.tagline}
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed font-normal mb-6">
                  {app.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {app.tags.map((t, ti) => (
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

