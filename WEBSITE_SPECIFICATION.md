# WEBSITE_SPECIFICATION.md
# Website Specification & Personal Identity Adaptation: Mazen

This specification defines the complete information architecture, content structure, and bilingual localization requirements for transforming the reference experience into **Mazen's personal software developer portfolio**.

---

## 1. Identity & Brand Foundation

### 1.1 Personal Profile
- **Name**: Mazen (مازن)
- **Title / Profession**: Software Developer (مطور برمجيات)
- **Tagline**: Crafting high-performance web applications, resilient software architectures, and tactile digital experiences.
- **Brand Essence**: Editorial craftsmanship meets engineering precision. Confident, modern, thoughtful, and technically rigorous.

### 1.2 Core Disciplines & Doors Mapping
The 5 physical doors on the interactive wall are mapped directly to Mazen's software engineering domains:

| Door Index | Discipline (English) | Discipline (Arabic) | Color Signature | Slug / Route |
| :---: | :--- | :--- | :--- | :--- |
| **0** | **Full-Stack Web Development** | **تطوير الويب المتكامل** | Deep Slate Navy (`#22304a`) | `/web-developer/` |
| **1** | **Mobile App Development** | **تطوير تطبيقات الجوال** | Forest Emerald (`#24362a`) | `/app-developer/` |
| **2** | **Software Architecture & Cloud** | **معمارية البرمجيات والسحاب** | Rich Terracotta (`#3d261e`) | `/architecture/` |
| **3** | **UI/UX Engineering & Design Systems** | **هندسة واجهات وتجربة المستخدم** | Royal Plum (`#342038`) | `/ui-ux-engineer/` |
| **4** *(Secret)* | **Photography & Creative Tech** | **التصوير الفوتوغرافي والتقنية الإبداعية** | Obsidian Charcoal (`#1a1a1a`) | `/photographer/` |

---

## 2. Information Architecture & Route Hierarchy

```
/
├── /en (English Default LTR)
│   ├── /                          # Main Home Page (Hero, Doors, Story, Contact)
│   ├── /web-developer/            # Full-Stack Web Projects Room
│   ├── /app-developer/            # Mobile Applications Room
│   ├── /architecture/             # Systems & Cloud Architecture Room
│   ├── /ui-ux-engineer/           # UI Engineering & Design Systems Room
│   ├── /photographer/             # Photography & Visual Gallery Room
│   ├── /ability-card/             # 3D WebGL Holographic Ability Card Scene
│   └── /legal/                    # Privacy & Attribution Notice
└── /ar (Arabic RTL)
    ├── /ar/                       # Main Home Page (Mirrored RTL)
    ├── /ar/web-developer/         # Web Development Room (Arabic)
    ├── /ar/app-developer/         # Mobile Apps Room (Arabic)
    ├── /ar/architecture/          # Systems Architecture Room (Arabic)
    ├── /ar/ui-ux-engineer/        # UI Engineering Room (Arabic)
    ├── /ar/photographer/          # Photography Room (Arabic)
    ├── /ar/ability-card/          # 3D Ability Card Scene (Arabic)
    └── /ar/legal/                 # Legal & Privacy (Arabic)
```

---

## 3. Section Content Specifications (Bilingual)

### 3.1 Hero Section

#### English (LTR)
- **Status Badge**: `Available for select engineering contracts & consulting`
- **Greeting**: `Hi, I'm Mazen.`
- **Headline Display with Flip Calendar**:
  - `A passionate Software Developer specialized in building robust software solutions.`
  - **Flip Calendar Skills**:
    1. Full-Stack Developer
    2. Mobile App Engineer
    3. Software Architect
    4. UI/UX Engineer
    5. Creative Technologist
- **Portrait Action Badge**: `Mazen's Ability Card` (Opens 3D Holographic Card)

#### Arabic (RTL)
- **Status Badge**: `متاح للمشاريع البرمجية والاستشارات التقنية المختارة`
- **Greeting**: `مرحباً، أنا مازن.`
- **Headline Display with Flip Calendar**:
  - `مطور برمجيات متخصص في بناء وتطوير حلول برمجية متقدمة ومرنة.`
  - **Flip Calendar Skills (Arabic)**:
    1. مطور ويب متكامل
    2. مهندس تطبيقات جوال
    3. مهندس معمارية برمجيات
    4. مهندس واجهات مستخدم
    5. تقني إبداعي
- **Portrait Action Badge**: `بطاقة قدرات مازن` (تفتح البطاقة التفاعلية ثلاثية الأبعاد)

---

### 3.2 The Interactive Doors Wall

#### Door 0: Full-Stack Web Development (تطوير الويب المتكامل)
- **Subtitle**: *End-to-end web engineering, from database architecture to smooth frontend interfaces.*
- **Arabic Subtitle**: *هندسة شاملة للويب، من تصميم قواعد البيانات إلى واجهات مستخدم استثنائية.*
- **Core Competencies (List)**:
  - Scalable Web Applications & API Design
  - Next.js, React, TypeScript & Node.js
  - Database Modeling (PostgreSQL, Redis, Prisma)
  - Edge Caching & Web Performance Optimization
  - CI/CD, Containerization & Automated Testing

#### Door 1: Mobile App Development (تطوير تطبيقات الجوال)
- **Subtitle**: *Native and cross-platform mobile apps built with fluid motion and offline resilience.*
- **Arabic Subtitle**: *تطبيقات هواتف هجينة وأصلية بحركات سلسة ودعم كامل للعمل دون اتصال.*
- **Core Competencies (List)**:
  - Cross-Platform Engineering (React Native / Flutter)
  - Native Device Integrations & Biometrics
  - Offline-First Architecture & State Synchronization
  - Gesture-Driven Animations & Haptics
  - App Store & Play Store Production Delivery

#### Door 2: Software Architecture & Systems (معمارية البرمجيات والسحاب)
- **Subtitle**: *Designing resilient distributed systems, cloud microservices, and clean codebases.*
- **Arabic Subtitle**: *تصميم أنظمة موزعة عالية الاعتمادية، خدمات سحابية، وبنية برمجية نظيفة.*
- **Core Competencies (List)**:
  - Distributed Systems & Microservices
  - Event-Driven Architecture (Kafka / RabbitMQ)
  - Cloud Infrastructure (AWS / GCP / Docker)
  - High-Availability & Disaster Recovery
  - Security, Auth & RBAC Systems

#### Door 3: UI/UX Engineering & Design Systems (هندسة واجهات وتجربة المستخدم)
- **Subtitle**: *Bridging the gap between engineering rigor and refined editorial design.*
- **Arabic Subtitle**: *الربط المتقن بين صرامة الهندسة البرمجية والجماليات البصرية الرفيعة.*
- **Core Competencies (List)**:
  - Design Systems & Component Libraries
  - WCAG 2.1 AA Accessibility & Keyboard Navigation
  - Micro-Interactions & Complex Canvas Animation
  - Modern Responsive Layouts (LTR & RTL)
  - Design Token Pipelines (Figma to Code)

#### Door 4 (Secret): Photography & Creative Tech (التصوير والتقنية الإبداعية)
- **Subtitle**: *The visual eye, spatial perspective, and creative coding behind the code.*
- **Arabic Subtitle**: *العين البصرية، والمنظور المكاني، والبرمجة الإبداعية الداعمة للكود.*
- **Core Competencies (List)**:
  - Architectural & Minimalist Photography
  - Creative Canvas & WebGL Shaders
  - Lighting, Balance & Visual Geometry

---

### 3.3 "My Story" (Experience Timeline)

5 chronological chapters chronicling Mazen's evolution:

#### Chapter 1 (Current Era — 2026/2025): Scaling Resilient Systems
- **When**: Present Day
- **Narrative (EN)**: Architecting enterprise applications and building high-performance web products that handle heavy production traffic. Focusing on clean modular architecture, edge deployment, and delightful user micro-interactions.
- **Narrative (AR)**: هندسة التطبيقات المتقدمة وبناء منتجات ويب فائقة الأداء تستوعب حركة المستخدمين العالية، مع التركيز على المعمارية النظيفة، النشر السحابي، والتفاعل السلس.

#### Chapter 2 (2024): The Full-Stack Mastery
- **When**: 2024
- **Narrative (EN)**: Deepening full-stack capabilities across cloud infrastructure, distributed microservices, and modern frontend frameworks. Delivering complete products from conception to production monitoring.
- **Narrative (AR)**: ترسيخ الخبرة في التطوير المتكامل عبر البنية السحابية، الخدمات الموزعة، وأحدث أطر الواجهات، مع تسليم حلول رقمية شاملة من التخطيط حتى الإطلاق.

#### Chapter 3 (2022): Mobile & Real-Time Engineering
- **When**: 2022
- **Narrative (EN)**: Expanding into mobile engineering and real-time state synchronization. Building offline-first applications with intuitive touch gestures and robust API integrations.
- **Narrative (AR)**: التوسع في تطوير تطبيقات الهواتف الذكية والتزامن اللحظي للبيانات، وبناء تطبيقات تعمل دون اتصال مع تجارب لمس طبيعية وربط دقيق للواجهات البرمجية.

#### Chapter 4 (2020): Deep Dive into Architecture & Systems
- **When**: 2020
- **Narrative (EN)**: Transitioning from building websites to engineering robust software systems. Exploring algorithmic optimization, database indexing, design patterns, and automated testing pipelines.
- **Narrative (AR)**: الانتقال من تصميم المواقع إلى هندسة الأنظمة البرمجية المتكاملة، مع التركيز على تحسين الخوارزميات، فهارس البيانات، الأنماط البرمجية، واختبارات الجودة المؤتمتة.

#### Chapter 5 (Foundations — 2018): The Spark of Code
- **When**: 2018
- **Narrative (EN)**: Writing the first lines of code, driven by an insatiable curiosity for how digital ideas transform into interactive reality. Laying the foundations in algorithms, data structures, and computer science fundamentals.
- **Narrative (AR)**: كتابة السطور الأولى من الكود بدافع شغف اكتشاف كيفية تحول الأفكار الرقمية إلى واقع ملموس، وبناء الأساس المتين في علوم الحاسوب وهياكل البيانات.

---

### 3.4 Contact / Hire Me Questionnaire (`#modal`)

#### Step 1: Discipline / Scope
- Options:
  1. Full-Stack Web Application (تطبيق ويب متكامل)
  2. Mobile App Development (تطبيق هاتف ذكي)
  3. Software Architecture & Consulting (استشارة أو معمارية برمجية)
  4. UI Engineering & Design System (هندسة واجهات ونظام تصميم)
  5. General Inquiry (استفسار عام) *(Triggers courteous informational gate)*

#### Step 2: Budget Range
- Currency Auto-Detection:
  - International / GCC / Europe: Supports USD (`$1,000`, `$3,000 - $8,000`, `$8,000+`) and AED/SAR equivalents.
- Polite Gate threshold: Projects under minimum receive an appreciative explanation of minimum project scope.

#### Step 3: Project Timeline
- Options: Immediate (خلال أسبوعين), 1–2 Months (خلال شهرين), Flexible / Future (مرن / لاحقاً).

#### Step 4: Organization / Client Profile
- Options: Funded Startup (شركة ناشئة), Enterprise / Established Business (شركة قائمة), Agency / Technical Partner (شريك تقني), Individual / Founder (مؤسس فردي).

#### Step 5: Contact Details & Brief
- Fields: Full Name, Email Address, Phone (with international dial code), Project Overview (minimum 2 sentences).

