export type Locale = 'en' | 'ar';

export interface Dictionary {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  name: string;
  role: string;
  tagline: string;
  status: string;
  nav: {
    works: string;
    story: string;
    contact: string;
    menu: string;
    close: string;
    switchLang: string;
    langName: string;
    fullscreen: string;
  };
  hero: {
    greeting: string;
    headlineStart: string;
    headlineEnd: string;
    cardBadge: string;
    flipSkills: string[];
  };
  doors: {
    title: string;
    graffiti: string;
    swipeHint: string;
    enterPrompt: string;
    backPrompt: string;
    items: Array<{
      id: string;
      plate: string;
      title: string;
      subtitle: string;
      points: string[];
      color: string;
      colorDark: string;
      route: string;
    }>;
  };
  story: {
    eyebrow: string;
    title: string;
    introTitle: string;
    introText: string;
    chapters: Array<{
      year: string;
      when: string;
      title: string;
      org: string;
      bullets: string[];
      text?: string;
    }>;
  };
  abilityCard: {
    title: string;
    loading: string;
    flipHint: string;
    close: string;
    disciplinesTitle: string;
    disciplines: string[];
  };
  contact: {
    email: string;
    emailDisplay: string;
    socialLinks: { github: string; linkedin: string; x: string };
    ctaTitle: string;
    ctaSubtitle: string;
    openBtn: string;
    modalTitle: string;
    stepOf: string;
    nextBtn: string;
    backBtn: string;
    sendBtn: string;
    disqualifiedTitle: string;
    disqualifiedBtn: string;
    successTitle: string;
    successMessage: string;
    steps: {
      step1: {
        title: string;
        options: Array<{ value: string; label: string; desc?: string }>;
      };
      step2: {
        title: string;
        minNotice: string;
        options: Array<{ value: string; label: string }>;
      };
      step3: {
        title: string;
        options: Array<{ value: string; label: string }>;
      };
      step4: {
        title: string;
        options: Array<{ value: string; label: string }>;
      };
      step5: {
        title: string;
        namePlaceholder: string;
        emailPlaceholder: string;
        phonePlaceholder: string;
        projectPlaceholder: string;
      };
    };
  };
  footer: {
    rights: string;
    localTime: string;
    backToTop: string;
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    locale: 'en',
    dir: 'ltr',
    name: 'Mazen',
    role: 'Software Developer',
    tagline: 'Crafting high-performance web applications, resilient systems & tactile digital experiences.',
    status: 'Available for select engineering contracts & consulting',
    nav: {
      works: 'Works',
      story: 'My Story',
      contact: 'Hire Me',
      menu: 'Menu',
      close: 'Close',
      switchLang: 'عربي',
      langName: 'Arabic',
      fullscreen: 'Press F for Fullscreen',
    },
    hero: {
      greeting: "Hi, I'm Mazen.",
      headlineStart: 'A passionate',
      headlineEnd: '',
      cardBadge: "My Ability Card",
      flipSkills: [
        'Full-Stack Developer',
        'Mobile App Engineer',
        'Software Architect',
        'UI/UX Engineer',
        'Creative Technologist',
      ],
    },
    doors: {
      title: 'My work, one door per skill',
      graffiti: 'Magic happens\nbehind the doors',
      swipeHint: 'Swipe along the wall',
      enterPrompt: 'Click to enter',
      backPrompt: 'Back to doors',
      items: [
        {
          id: 'web-dev',
          plate: 'Web Developer',
          title: 'Full-Stack Web Development',
          subtitle: 'End to end, from database architecture to live scalable applications',
          points: [
            'Scalable Next.js & TypeScript architectures',
            'Relational & distributed database design',
            'High-throughput edge caching & optimization',
            'Resilient API design & microservices',
            'Automated testing & CI/CD deployment pipelines',
          ],
          color: '#183556',
          colorDark: '#102238',
          route: '/web-developer/',
        },
        {
          id: 'app-dev',
          plate: 'App Developer',
          title: 'Mobile App Engineering',
          subtitle: 'Cross-platform and native mobile apps with fluid gesture motion',
          points: [
            'Cross-platform development (React Native & Flutter)',
            'Native device capabilities & biometrics',
            'Offline-first synchronization engines',
            'Intuitive gesture-driven micro-interactions',
            'App Store & Google Play production releases',
          ],
          color: '#4c223c',
          colorDark: '#35152a',
          route: '/app-developer/',
        },
        {
          id: 'architecture',
          plate: 'Software Architect',
          title: 'Software Architecture & Cloud',
          subtitle: 'Designing resilient distributed systems and clean modular codebases',
          points: [
            'Event-driven architectures & messaging queues',
            'Containerization & Cloud Infrastructure (AWS / GCP / Docker)',
            'System resilience, observability & telemetry',
            'High-availability database clustering',
            'Zero-trust security & authentication design',
          ],
          color: '#2c5240',
          colorDark: '#1c382b',
          route: '/architecture/',
        },
        {
          id: 'ui-ux',
          plate: 'UI/UX Engineer',
          title: 'UI/UX Engineering & Design Systems',
          subtitle: 'Bridging engineering rigor with refined editorial design craft',
          points: [
            'Design systems & design token pipelines',
            'Tactile micro-physics & canvas animations',
            'Full WCAG 2.1 AA accessibility compliance',
            'Seamless bilingual LTR & RTL spatial parity',
            'High-fidelity interactive product prototyping',
          ],
          color: '#9e4e24',
          colorDark: '#6e3415',
          route: '/ui-ux-engineer/',
        },
        {
          id: 'creative',
          plate: 'Creative Tech',
          title: 'Photography & Creative Tech',
          subtitle: 'The visual eye, spatial perspective and creative code behind the systems',
          points: [
            'Architectural & minimalist composition',
            'Interactive 3D WebGL & custom GLSL shaders',
            'Lighting, balance & visual geometry',
          ],
          color: '#2a2030',
          colorDark: '#201825',
          route: '/photographer/',
        },
      ],
    },
    story: {
      eyebrow: 'My story',
      title: 'My Story',
      introTitle: "Let's go back in time.",
      introText: 'A retrospective of craft, engineering, and digital products built over time.',
      chapters: [
        {
          year: '2026',
          when: 'Oct 2026 — Now',
          title: 'Independent freelancer',
          org: 'Working for myself, remote-first',
          bullets: [
            'Websites, iOS apps, interfaces and brand creatives, carried from the first sketch to launch.',
            'Working directly with clients, wherever they are.',
          ],
        },
        {
          year: '2026',
          when: 'Jul 2026 — Sep 2026',
          title: 'Graphic designer',
          org: 'Himspring LLC',
          bullets: [
            'Managed visual content across social media handles for real estate, luxury water bottle and clothing brands.',
            'Designed social media creatives, stories and carousels in Adobe Illustrator, keeping every brand consistent across platforms.',
          ],
        },
        {
          year: '2026',
          when: 'Jan 2026 — Jun 2026',
          title: 'UI/UX designer',
          org: 'Quicko Pvt Ltd, Ahmedabad',
          bullets: [
            'Designed website interfaces and user experiences in Figma, focused on usability, visual clarity and function.',
            'Built no-code web pages and interactive financial tools in Framer, turning designs into working products.',
          ],
        },
        {
          year: '2025',
          when: 'Jan 2025 — May 2025',
          title: 'Graphic designer intern',
          org: 'WBT, Delhi · Remote',
          bullets: [
            'Designed pitch decks and presentations that communicate ideas and business concepts clearly.',
            'Created social media creatives and visual assets for branding, marketing and digital communication.',
          ],
        },
        {
          year: '2022',
          when: 'Jul 2022 — May 2026',
          title: 'B.Tech, Computer Science',
          org: 'Pandit Deendayal Energy University (PDEU)',
          bullets: [
            'Four years of computer science: where it all started, with code in the classroom and design on the side.',
            'Graduated in May 2026, with internships and real projects already under way.',
          ],
        },
      ],
    },
    abilityCard: {
      title: 'Ability Card',
      loading: 'Loading the card...',
      flipHint: 'Drag to rotate, click to flip',
      close: 'Close',
      disciplinesTitle: 'Engineering Disciplines',
      disciplines: [
        'Full-Stack Web Development',
        'Software Architecture & Cloud',
        'Cross-Platform Mobile Apps',
        'UI/UX Design Systems',
        'Distributed Microservices',
      ],
    },
    contact: {
      email: "",
      emailDisplay: "",
      socialLinks: {
        github: "https://github.com/#placeholder",
        linkedin: "https://linkedin.com/#placeholder",
        x: "https://x.com/#placeholder",
      },
      ctaTitle: 'Need something built?',
      ctaSubtitle: "Let's make it happen with clean code and thoughtful design.",
      openBtn: 'Start a Project',
      modalTitle: 'Project Inquiry',
      stepOf: 'of',
      nextBtn: 'Next',
      backBtn: 'Back',
      sendBtn: 'Send Inquiry',
      disqualifiedTitle: 'This form is for client projects',
      disqualifiedBtn: 'Change Selection',
      successTitle: 'Inquiry Sent!',
      successMessage: "Thank you for reaching out. I'll review your project details and get back to you within 24-48 hours.",
      steps: {
        step1: {
          title: 'What type of engineering service do you need?',
          options: [
            { value: 'web', label: 'Full-Stack Web Application', desc: 'Scalable web platforms, Next.js, APIs' },
            { value: 'mobile', label: 'Mobile Application', desc: 'React Native, Flutter, native iOS/Android' },
            { value: 'architecture', label: 'Software Architecture & Cloud', desc: 'System design, cloud infrastructure, scaling' },
            { value: 'uiux', label: 'UI/UX Engineering & Design System', desc: 'Component libraries, micro-interactions' },
            { value: 'question', label: 'General Inquiry / Consultation', desc: 'Advice or technical discussion' },
          ],
        },
        step2: {
          title: 'What is your estimated project budget?',
          minNotice: 'My client engagements typically start at $1,000.',
          options: [
            { value: 'under', label: 'Under $1,000' },
            { value: 'tier1', label: '$1,000 – $3,000' },
            { value: 'tier2', label: '$3,000 – $8,000' },
            { value: 'tier3', label: '$8,000 or more' },
          ],
        },
        step3: {
          title: 'When would you like to kick off the project?',
          options: [
            { value: 'immediate', label: 'Immediately (within 2 weeks)' },
            { value: 'month', label: 'Within 1 to 2 months' },
            { value: 'flexible', label: 'Flexible / Planning phase' },
          ],
        },
        step4: {
          title: 'Who is this project for?',
          options: [
            { value: 'startup', label: 'Funded Startup' },
            { value: 'enterprise', label: 'Established Business / Enterprise' },
            { value: 'founder', label: 'Individual Founder' },
            { value: 'agency', label: 'Agency / Technical Partner' },
          ],
        },
        step5: {
          title: 'Tell me a little about yourself and the project',
          namePlaceholder: 'Your Name',
          emailPlaceholder: 'Email Address',
          phonePlaceholder: 'Phone Number (with country code)',
          projectPlaceholder: 'Tell me a little more about the project goals, tech stack preferences, and scope...',
        },
      },
    },
    footer: {
      rights: 'All rights reserved.',
      localTime: 'Local Time',
      backToTop: 'Back to top',
    },
  },
  ar: {
    locale: 'ar',
    dir: 'rtl',
    name: 'مازن',
    role: 'مطور برمجيات',
    tagline: 'هندسة تطبيقات ويب فائقة الأداء، أنظمة برمجية مرنة، وتجارب رقمية ملموسة.',
    status: 'متاح للمشاريع البرمجية والاستشارات التقنية المختارة',
    nav: {
      works: 'أعمالي',
      story: 'مسيرتي',
      contact: 'تواصل معي',
      menu: 'القائمة',
      close: 'إغلاق',
      switchLang: 'English',
      langName: 'الإنجليزية',
      fullscreen: 'اضغط F للشاشة الكاملة',
    },
    hero: {
      greeting: 'مرحباً، أنا مازن.',
      headlineStart: 'مطور برمجيات',
      headlineEnd: '',
      cardBadge: 'بطاقة القدرات البرمجية',
      flipSkills: [
        'مطور ويب متكامل',
        'مهندس تطبيقات جوال',
        'مهندس معمارية برمجيات',
        'مهندس واجهات مستخدم',
        'تقني إبداعي',
      ],
    },
    doors: {
      title: 'أعمالي، باب لكل تخصص',
      graffiti: 'الإبداع يكمن\nخلف الأبواب',
      swipeHint: 'اسحب على طول الجدار',
      enterPrompt: 'انقر للدخول',
      backPrompt: 'العودة للأبواب',
      items: [
        {
          id: 'web-dev',
          plate: 'تطوير الويب',
          title: 'تطوير الويب المتكامل',
          subtitle: 'هندسة شاملة للويب، من تصميم قواعد البيانات إلى واجهات فائقة الأداء',
          points: [
            'معماريات حديثة بـ Next.js و TypeScript',
            'تصميم قواعد البيانات العلائقية والموزعة',
            'تخزين مؤقت عالي الكفاءة وتحسين الأداء',
            'بناء واجهات برمجية مرنة وخدمات مصغرة',
            'أنظمة نشر مؤتمتة واختبارات جودة شاملة',
          ],
          color: '#183556',
          colorDark: '#102238',
          route: '/web-developer/',
        },
        {
          id: 'app-dev',
          plate: 'تطبيقات الجوال',
          title: 'تطوير تطبيقات الجوال',
          subtitle: 'تطبيقات هواتف هجينة وأصلية بحركات سلسة وتفاعل لمسي طبيعي',
          points: [
            'تطوير متقدم بـ React Native و Flutter',
            'تكامل عميق مع ميزات الهاتف الحيوية والعتاد',
            'بنية تعمل دون اتصال مع تزامن لحظي فائق',
            'تفاعلات لمسية طبيعية وحركات انسيابية',
            'نشر رسمي على متجري App Store و Google Play',
          ],
          color: '#4c223c',
          colorDark: '#35152a',
          route: '/app-developer/',
        },
        {
          id: 'architecture',
          plate: 'معمارية البرمجيات',
          title: 'معمارية البرمجيات والسحاب',
          subtitle: 'تصميم أنظمة موزعة عالية الاعتمادية وبنية سحابية نظيفة ومحكمة',
          points: [
            'معماريات موجهة بالأحداث وطوابير الرسائل',
            'بنية تحتية سحابية (AWS / GCP / Docker)',
            'موثوقية النظم، التتبع والمراقبة اللحظية',
            'توسيع قواعد البيانات والتخزين المؤقت المتقدم',
            'تأمين النظم وسياسات الوصول المنعدم للثقة',
          ],
          color: '#2c5240',
          colorDark: '#1c382b',
          route: '/architecture/',
        },
        {
          id: 'ui-ux',
          plate: 'مهندس الواجهات',
          title: 'هندسة واجهات وتجربة المستخدم',
          subtitle: 'الربط المتقن بين صرامة الهندسة البرمجية والجماليات البصرية الرفيعة',
          points: [
            'بناء وتطوير أنظمة التصميم الشاملة',
            'مؤثرات حركية دقيقة وبرمجة لوحية تفاعلية',
            'توافق كامل مع معايير الوصول WCAG 2.1 AA',
            'تناسق هندسي ومكاني ثنائي الاتجاه (LTR و RTL)',
            'نماذج أولية تفاعلية عالية الدقة',
          ],
          color: '#9e4e24',
          colorDark: '#6e3415',
          route: '/ui-ux-engineer/',
        },
        {
          id: 'creative',
          plate: 'التقنية الإبداعية',
          title: 'التصوير والتقنية الإبداعية',
          subtitle: 'العين البصرية، المنظور المكاني، والبرمجة الإبداعية الداعمة للأنظمة',
          points: [
            'تكوين بصري معماري وتجريدي متزن',
            'برمجة تفاعلية ثلاثية الأبعاد بـ WebGL و Shaders',
            'الإضاءة، التوازن الهندسي، والرؤية البصرية',
          ],
          color: '#2a2030',
          colorDark: '#201825',
          route: '/photographer/',
        },
      ],
    },
    story: {
      eyebrow: 'مسيرتي',
      title: 'مسيرتي',
      introTitle: 'دعنا نعد بالزمن إلى الوراء.',
      introText: 'رحلة استعادية عبر المحطات المهنية، والهندسة البرمجية، والمنتجات الرقمية التي تم بناؤها.',
      chapters: [
        {
          year: '2026',
          when: 'أكتوبر 2026 — الآن',
          title: 'مطور ومصمم مستقل',
          org: 'العمل المستقل عن بُعد',
          bullets: [
            'مواقع الويب، وتطبيقات iOS، وهندسة واجهات الاستخدام من الفكرة الأولى حتى الإطلاق الحي.',
            'التعاون المباشر مع العملاء والشركات في مختلف أنحاء العالم.',
          ],
        },
        {
          year: '2026',
          when: 'يوليو 2026 — سبتمبر 2026',
          title: 'مصمم جرافيك وهوية رقمية',
          org: 'شركة همسبرينغ المحدودة',
          bullets: [
            'إدارة المحتوى البصري لعدد من العلامات التجارية في مجالات العقارات والأزياء والمنتجات الفاخرة.',
            'تصميم منشورات وقصص وشاشات تفاعلية عبر Adobe Illustrator مع الحفاظ التام على اتساق الهوية.',
          ],
        },
        {
          year: '2026',
          when: 'يناير 2026 — يونيو 2026',
          title: 'مصمم واجهات وتجربة المستخدم',
          org: 'كويكو المحدودة، أحمد آباد',
          bullets: [
            'تصميم واجهات وتجارب استخدام تفاعلية في Figma تركز على سلاسة الأداء والوضوح البصري والوظيفة.',
            'بناء صفحات ويب تفاعلية وأدوات تقنية مالية في Framer، وتحويل التصاميم إلى منتجات حية.',
          ],
        },
        {
          year: '2025',
          when: 'يناير 2025 — مايو 2025',
          title: 'متدرب تصميم وتطوير واجهات',
          org: 'دبليو بي تي، دلهي · عن بُعد',
          bullets: [
            'تصميم عروض تقديمية ونماذج أعمال تنقل المفاهيم البرمجية والاستثمارية بوضوح وإيجاز.',
            'ابتكار تصاميم وأصول بصرية للهوية والتسويق والتواصل الرقمي الحديث.',
          ],
        },
        {
          year: '2022',
          when: 'يوليو 2022 — مايو 2026',
          title: 'بكالوريوس علوم الحاسوب',
          org: 'جامعة بانديت ديندايال للطاقة (PDEU)',
          bullets: [
            'أربع سنوات في علوم الحاسوب: حيث بدأت الرحلة بالبرمجة في القاعات الأكاديمية والتصميم العملي في الميدان.',
            'التخرج بنجاح في مايو 2026، مع إنجاز مشاريع واقعية وتدريبات عملية احترافية.',
          ],
        },
      ],
    },
    abilityCard: {
      title: 'بطاقة القدرات',
      loading: 'جاري تحميل البطاقة...',
      flipHint: 'اسحب للتدوير، انقر للقلب',
      close: 'إغلاق',
      disciplinesTitle: 'التخصصات الهندسية',
      disciplines: [
        'تطوير تطبيقات الويب المتكاملة',
        'معمارية البرمجيات والأنظمة السحابية',
        'تطوير تطبيقات الهواتف الذكية',
        'هندسة نظم التصميم وواجهات المستخدم',
        'الخدمات الموزعة عالية الأداء',
      ],
    },
    contact: {
      email: "",
      emailDisplay: "",
      socialLinks: {
        github: "https://github.com/#placeholder",
        linkedin: "https://linkedin.com/#placeholder",
        x: "https://x.com/#placeholder",
      },
      ctaTitle: 'هل لديك مشروع ترغب في بنائه؟',
      ctaSubtitle: 'دعنا نحول فكرتك إلى واقع برمجي متميز بكود نظيف وتصميم رفيع.',
      openBtn: 'ابدأ مشروعاً معي',
      modalTitle: 'طلب مشروع جديد',
      stepOf: 'من',
      nextBtn: 'التالي',
      backBtn: 'السابق',
      sendBtn: 'إرسال الطلب',
      disqualifiedTitle: 'هذا النموذج مخصص لمشاريع العملاء المدفوعة',
      disqualifiedBtn: 'تعديل الاختيار',
      successTitle: 'تم إرسال طلبك بنجاح!',
      successMessage: 'شكراً لتواصلك. سأقوم بمراجعة تفاصيل مشروعك والرد عليك خلال 24 إلى 48 ساعة.',
      steps: {
        step1: {
          title: 'ما هو نوع الخدمة الهندسية التي تحتاجها؟',
          options: [
            { value: 'web', label: 'تطبيق ويب متكامل', desc: 'منصات ويب قابلة للتوسع، Next.js، واجهات برمجية' },
            { value: 'mobile', label: 'تطبيق هاتف ذكي', desc: 'React Native أو Flutter مع أداء فائق' },
            { value: 'architecture', label: 'معمارية برمجيات واستشارات سحابية', desc: 'تصميم أنظمة، بنية سحابية، وتوسع' },
            { value: 'uiux', label: 'هندسة واجهات ونظام تصميم', desc: 'مكتبات مكونات وتفاعلات حركية متقنة' },
            { value: 'question', label: 'استفسار عام / مناقشة تقنية', desc: 'استشارة أو حوار عام' },
          ],
        },
        step2: {
          title: 'ما هي الميزانية التقديرية للمشروع؟',
          minNotice: 'تبدأ مشاريعي عادة من 1,000 دولار أمريكي (أو ما يعادلها).',
          options: [
            { value: 'under', label: 'أقل من 1,000 دولار' },
            { value: 'tier1', label: '1,000 – 3,000 دولار' },
            { value: 'tier2', label: '3,000 – 8,000 دولار' },
            { value: 'tier3', label: '8,000 دولار أو أكثر' },
          ],
        },
        step3: {
          title: 'متى ترغب في بدء المشروع؟',
          options: [
            { value: 'immediate', label: 'فوري (خلال أسبوعين)' },
            { value: 'month', label: 'خلال شهر إلى شهرين' },
            { value: 'flexible', label: 'مرن / مرحلة التخطيط' },
          ],
        },
        step4: {
          title: 'لمن يتم تنفيذ هذا المشروع؟',
          options: [
            { value: 'startup', label: 'شركة ناشئة ممولة' },
            { value: 'enterprise', label: 'شركة قائمة / مؤسسة أعمال' },
            { value: 'founder', label: 'مؤسس فردي / ريادي' },
            { value: 'agency', label: 'وكالة تقنية / شريك هندسي' },
          ],
        },
        step5: {
          title: 'أخبرني بنبذة عنك وعن تفاصيل المشروع',
          namePlaceholder: 'الاسم الكامل',
          emailPlaceholder: 'البريد الإلكتروني',
          phonePlaceholder: 'رقم الهاتف (مع رمز الدولة)',
          projectPlaceholder: 'اكتب نبذة عن أهداف المشروع، التقنيات المفضلة، ونطاق العمل المطلوب...',
        },
      },
    },
    footer: {
      rights: 'جميع الحقوق محفوظة.',
      localTime: 'التوقيت المحلي',
      backToTop: 'العودة للأعلى',
    },
  },
};

