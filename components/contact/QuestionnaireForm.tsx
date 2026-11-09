"use client";

import React, { useState } from "react";
import { Dictionary } from "@/lib/dictionary";

interface QuestionnaireFormProps {
  dict: Dictionary;
  onClose: () => void;
}

export function QuestionnaireForm({ dict, onClose }: QuestionnaireFormProps) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [clientType, setClientType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectText, setProjectText] = useState("");

  const [disqualifiedReason, setDisqualifiedReason] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const totalSteps = 5;
  const isRTL = dict.dir === "rtl";
  const t = dict.contact;

  const handleNext = () => {
    setErrorMsg("");

    if (step === 1) {
      if (!service) {
        setErrorMsg("Please select an option to continue.");
        return;
      }
      if (service === "question") {
        setDisqualifiedReason(
          "This form is reserved for paid client engagements. For general questions or mentoring, please connect via LinkedIn or Twitter/X."
        );
        return;
      }
    }

    if (step === 2) {
      if (!budget) {
        setErrorMsg("Please select an estimated budget range.");
        return;
      }
      if (budget === "under") {
        setDisqualifiedReason(
          "My client projects typically start at $1,000 (or equivalent) to ensure deep engineering quality and dedicated execution."
        );
        return;
      }
    }

    if (step === 3 && !timeline) {
      setErrorMsg("Please choose a kickoff timeline.");
      return;
    }

    if (step === 4 && !clientType) {
      setErrorMsg("Please select your organization profile.");
      return;
    }

    if (step === 5) {
      if (!name.trim() || !email.trim() || !projectText.trim()) {
        setErrorMsg("Please fill in your name, email, and project overview.");
        return;
      }
      // Submit simulation
      setIsSuccess(true);
      return;
    }

    setStep((s) => Math.min(totalSteps, s + 1));
  };

  const handleBack = () => {
    setErrorMsg("");
    setStep((s) => Math.max(1, s - 1));
  };

  if (disqualifiedReason) {
    return (
      <div className="py-8 text-center animate-in fade-in">
        <span className="text-4xl block mb-4">☕</span>
        <h4 className="text-xl font-bold text-foreground mb-3">
          {t.disqualifiedTitle}
        </h4>
        <p className="text-sm text-foreground/80 max-w-md mx-auto mb-8 leading-relaxed">
          {disqualifiedReason}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setDisqualifiedReason(null)}
            className="px-6 py-2.5 rounded-full border border-line text-sm font-medium text-foreground hover:bg-neutral transition-all"
          >
            {t.disqualifiedBtn}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-primary text-neutral text-sm font-medium hover:scale-105 transition-all"
          >
            {dict.abilityCard.close}
          </button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="py-12 text-center animate-in zoom-in-95">
        <span className="text-5xl block mb-4">🚀</span>
        <h4 className="text-2xl font-bold text-foreground mb-3">
          {t.successTitle}
        </h4>
        <p className="text-sm text-foreground/80 max-w-md mx-auto mb-8 leading-relaxed">
          {t.successMessage}
        </p>
        <button
          onClick={onClose}
          className="px-8 py-3 rounded-full bg-primary text-neutral text-sm font-semibold tracking-tight hover:scale-105 transition-all shadow-lg"
        >
          {dict.abilityCard.close}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Step Indicator & Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-muted mb-2">
          <span>
            {dict.locale === "ar" ? `الخطوة ${step} من ${totalSteps}` : `Step ${step} of ${totalSteps}`}
          </span>
          <span>{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-line overflow-hidden">
          <div
            className="h-full bg-secondary transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Discipline */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in">
          <h4 className="text-lg md:text-xl font-bold text-foreground mb-4">
            {t.steps.step1.title}
          </h4>
          <div className="space-y-2.5">
            {t.steps.step1.options.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  service === opt.value
                    ? "border-secondary bg-secondary/10 shadow-sm"
                    : "border-line bg-surface/50 hover:bg-surface"
                }`}
              >
                <input
                  type="radio"
                  name="service"
                  value={opt.value}
                  checked={service === opt.value}
                  onChange={(e) => setService(e.target.value)}
                  className="mt-1 accent-secondary"
                />
                <div>
                  <span className="font-semibold text-sm text-foreground block">
                    {opt.label}
                  </span>
                  {opt.desc && (
                    <span className="text-xs text-muted block mt-0.5">
                      {opt.desc}
                    </span>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Budget */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in">
          <h4 className="text-lg md:text-xl font-bold text-foreground mb-2">
            {t.steps.step2.title}
          </h4>
          <p className="text-xs text-muted mb-4">{t.steps.step2.minNotice}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {t.steps.step2.options.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  budget === opt.value
                    ? "border-secondary bg-secondary/10 shadow-sm"
                    : "border-line bg-surface/50 hover:bg-surface"
                }`}
              >
                <input
                  type="radio"
                  name="budget"
                  value={opt.value}
                  checked={budget === opt.value}
                  onChange={(e) => setBudget(e.target.value)}
                  className="accent-secondary"
                />
                <span className="font-semibold text-sm text-foreground">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Timeline */}
      {step === 3 && (
        <div className="space-y-4 animate-in fade-in">
          <h4 className="text-lg md:text-xl font-bold text-foreground mb-4">
            {t.steps.step3.title}
          </h4>
          <div className="space-y-2.5">
            {t.steps.step3.options.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  timeline === opt.value
                    ? "border-secondary bg-secondary/10 shadow-sm"
                    : "border-line bg-surface/50 hover:bg-surface"
                }`}
              >
                <input
                  type="radio"
                  name="timeline"
                  value={opt.value}
                  checked={timeline === opt.value}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="accent-secondary"
                />
                <span className="font-semibold text-sm text-foreground">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Client Type */}
      {step === 4 && (
        <div className="space-y-4 animate-in fade-in">
          <h4 className="text-lg md:text-xl font-bold text-foreground mb-4">
            {t.steps.step4.title}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {t.steps.step4.options.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  clientType === opt.value
                    ? "border-secondary bg-secondary/10 shadow-sm"
                    : "border-line bg-surface/50 hover:bg-surface"
                }`}
              >
                <input
                  type="radio"
                  name="clientType"
                  value={opt.value}
                  checked={clientType === opt.value}
                  onChange={(e) => setClientType(e.target.value)}
                  className="accent-secondary"
                />
                <span className="font-semibold text-sm text-foreground">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Brief & Contact Details */}
      {step === 5 && (
        <div className="space-y-4 animate-in fade-in">
          <h4 className="text-lg md:text-xl font-bold text-foreground mb-4">
            {t.steps.step5.title}
          </h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder={t.steps.step5.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 h-12 rounded-xl border border-line bg-surface text-foreground placeholder:text-muted focus:outline-none focus:border-secondary text-sm"
            />
            <input
              type="email"
              placeholder={t.steps.step5.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 h-12 rounded-xl border border-line bg-surface text-foreground placeholder:text-muted focus:outline-none focus:border-secondary text-sm"
            />
            <input
              type="tel"
              placeholder={t.steps.step5.phonePlaceholder}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 h-12 rounded-xl border border-line bg-surface text-foreground placeholder:text-muted focus:outline-none focus:border-secondary text-sm"
            />
            <textarea
              rows={4}
              placeholder={t.steps.step5.projectPlaceholder}
              value={projectText}
              onChange={(e) => setProjectText(e.target.value)}
              className="w-full p-4 rounded-xl border border-line bg-surface text-foreground placeholder:text-muted focus:outline-none focus:border-secondary text-sm resize-none"
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <p className="text-xs text-red-500 font-medium mt-3">{errorMsg}</p>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-line">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2 rounded-full border border-line text-xs font-semibold text-foreground hover:bg-neutral transition-all"
          >
            {t.backBtn}
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2.5 rounded-full bg-primary text-neutral text-xs font-semibold tracking-tight hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          {step === totalSteps ? t.sendBtn : t.nextBtn}
        </button>
      </div>
    </div>
  );
}

