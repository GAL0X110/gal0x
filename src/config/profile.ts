/**
 * ─────────────────────────────────────────────────────────────
 *  ✏️  فایل تنظیمات شخصی سایت
 *
 *  برای به‌روزرسانی سایت، فقط اطلاعات این فایل را ویرایش کنید.
 *  نیازی به تغییر کد هیچ بخش دیگری از سایت نیست.
 * ─────────────────────────────────────────────────────────────
 */

/** لینک‌های شبکه‌های اجتماعی (در صورت نداشتن، آیکون نمایش داده نمی‌شود) */
export type SocialKey =
  | "github"
  | "linkedin"
  | "instagram"
  | "telegram"
  | "email"
  | "twitter"
  | "youtube"
  | "website";

export interface SocialLink {
  name: string;
  icon: SocialKey;
  href: string;
}

export interface Skill {
  name: string;
  /** عددی بین ۰ تا ۱۰۰ */
  level: number;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  current?: boolean;
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  description: string;
  current?: boolean;
}

export const profile = {
  /* ─── اطلاعات اصلی ─── */
  /** نام برند؛ در نوبار، فوتر و عنوان تب مرورگر استفاده می‌شود */
  brand: "GALOX",
  /** نام نمایشی در سایت */
  name: "محمدامین شاکر",
  /** نام کامل لاتین (برای کارت «نام کامل» در بخش درباره‌من و سئو) */
  fullName: "Mohammad Amin Shaker",
  /** حروف اول نام؛ فقط وقتی لوگو تنظیم نشده باشد نمایش داده می‌شود */
  initials: "م‌ش",
  role: "سازنده؛ building from zero",
  /** عبارت‌هایی که در صفحه اصلی به‌صورت چرخشی نمایش داده می‌شوند */
  roles: [
    "سازنده پروژه",
    "برنامه‌نویس",
    "کاوشگر تکنولوژی",
    "یادگیرنده همیشگی",
  ],
  tagline:
    "سلام! من محمدامین شاکر هستم؛ اینجا خانه‌ی برند GALOX و دفترچه‌ی ساختن‌های من از صفر است؛ پروژه‌های پایتون، لینوکس و ابزارها، و مسیر کاوش در دنیای تکنولوژی و امنیت. Building from zero. 🚀",

  /* ─── تصاویر ─── */
  /** عکس پروفایل؛ فایل عکس خودتان را در پوشه public/images بگذارید و مسیرش را اینجا بنویسید */
  avatar: "/images/avatar.png",
  /**
   * لوگوی برند (همان دایره‌ی لوگو) که در نوبار، فوتر و favicon استفاده می‌شود.
   * برای تغییر، فایل لوگوی جدید را از پنل «تنظیمات برند» (آیکون چرخ‌دنده پایین صفحه) آپلود کنید
   * یا فایل را در public/images بگذارید و مسیرش را اینجا بنویسید.
   * اگر خالی بماند، حروف اول نام (initials) نمایش داده می‌شود.
   */
  logo: "/images/avatar.png",

  /* ─── تماس و وضعیت ─── */
  email: "gal0x.dev@gmail.com",
  phone: "+98 912 000 0000",
  location: "تهران، ایران",
  /** اگر آماده همکاری هستید true بگذارید تا نشان «آماده همکاری» نمایش داده شود */
  available: true,
  /** فایل رزومه را در public بگذارید (مثلاً /resume.pdf) و مسیرش را اینجا بنویسید؛ خالی بماند دکمه «به‌زودی» نشان می‌دهد */
  resumeUrl: "",

  /* ─── آمار (بخش هیرو) ─── */
  stats: [
    { value: "۱+", label: "سال تجربه" },
    { value: "۵+", label: "پروژه تکمیل‌شده" },
    { value: "∞", label: "اشتیاق برای یادگیری" },
  ],

  /* ─── درباره من ─── */
  bio: [
    "سلام! من محمدامین شاکر هستم؛ سازنده‌ی برند GALOX با یک شعار ساده: building from zero — ساختن از صفر. مسیرم را با پروژه‌های پایتون، کار با لینوکس و ابزارها پیش می‌برم و عاشق کاوش در دنیای سیستم‌ها و امنیت سایبری‌ام.",
    "این سایت خانه‌ی دیجیتال من است؛ جایی که پروژه‌ها، تجربه‌ها و رزومه‌ام را به‌تدریج جمع می‌کنم. اگر به دنیای کد و تکنولوژی علاقه داری، در این مسیر همراهم باش.",
    "وقت آزادم را صرف یادگیری چیزهای جدید، نوشتن ابزارهای کوچک و کار روی ایده‌هایی می‌کنم که دنیای اطرافم را کمی هوشمندتر می‌کنند.",
  ],
  interests: [
    "پایتون",
    "لینوکس و ابزارها",
    "امنیت سایبری",
    "توسعه سیستم‌ها",
    "متن‌باز",
    "کاوش تکنولوژی",
  ],

  /* ─── شبکه‌های اجتماعی ─── */
  socials: [
    { name: "ایکس (توییتر)", icon: "twitter", href: "https://x.com/GALOX" },
    { name: "یوتیوب", icon: "youtube", href: "https://youtube.com/@GALOX" },
    { name: "گیت‌هاب", icon: "github", href: "https://github.com/GAL0X110" },
    { name: "تلگرام", icon: "telegram", href: "https://t.me/GALOX" },
  ] as SocialLink[],

  /* ─── مهارت‌ها ─── */
  skills: [
    { name: "پایتون", level: 70 },
    { name: "لینوکس و ابزارها", level: 65 },
    { name: "گیت و کنترل نسخه", level: 60 },
    { name: "امنیت سایبری", level: 50 },
    { name: "توسعه وب", level: 55 },
  ] as Skill[],

  tools: [
    "Python",
    "Linux",
    "Git",
    "Bash",
    "Docker",
    "VS Code",
    "SQL",
    "Terminal",
  ],

  languages: [
    { name: "فارسی", level: "زبان مادری" },
    { name: "انگلیسی", level: "متوسط" },
  ],

  /* ─── پروژه‌ها ─── */
  projects: [
    {
      title: "پروژه نمونه اول",
      description:
        "توضیح کوتاهی درباره این پروژه بنویسید: چه کاری انجام می‌دهد، با چه تکنولوژی‌هایی ساخته شده و چه مشکلی را حل می‌کند. این متن نمونه است و بعداً با پروژه‌های واقعی خودتان جایگزین کنید.",
      image: "/images/project-1.png",
      tags: ["React", "Next.js", "Tailwind"],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "پروژه نمونه دوم",
      description:
        "یک اپلیکیشن موبایل برای مدیریت کارهای روزانه با رابط کاربری ساده و کاربردی. توضیحات پروژه را می‌توانید در فایل کانفیگ ویرایش کنید.",
      image: "/images/project-2.png",
      tags: ["React Native", "API", "UI Design"],
      demoUrl: "#",
    },
    {
      title: "پروژه نمونه سوم",
      description:
        "فروشگاه اینترنتی با قابلیت جست‌وجو، سبد خرید و پرداخت آنلاین. هر تعداد پروژه که خواستید می‌توانید به همین شکل اضافه کنید.",
      image: "/images/project-3.png",
      tags: ["E-commerce", "Node.js", "SQL"],
      codeUrl: "#",
    },
  ] as Project[],

  /* ─── سوابق شغلی ─── */
  experience: [
    {
      title: "یادگیرنده و سازنده‌ی مستقل",
      company: "پروژه‌های شخصی — برند GALOX",
      period: "۱۴۰۳ - اکنون",
      description:
        "مسیر یادگیری آزادم را با پایتون، لینوکس و ابزارهای متن‌باز پیش می‌برم و روی پروژه‌ها و ابزارهای کوچک شخصی کار می‌کنم؛ همین وب‌سایت هم یکی از همین ساخته‌هاست.",
      current: true,
    },
  ] as ExperienceItem[],

  /* ─── تحصیلات ─── */
  education: [
    {
      degree: "مهندسی کامپیوتر",
      school: "دانشگاه",
      period: "به‌زودی",
      description:
        "به‌زودی مقطع کارشناسی مهندسی کامپیوتر را شروع می‌کنم؛ کلاس‌ها هنوز آغاز نشده و مشتاق شروع این مسیر هستم.",
      current: false,
    },
    {
      degree: "دیپلم ریاضی و فیزیک",
      school: "دبیرستان",
      period: "۱۴۰۲ - ۱۴۰۵",
      description:
        "دوره‌ی متوسطه را در رشته‌ی ریاضی و فیزیک به پایان رساندم و موفق به اخذ دیپلم شدم.",
      current: false,
    },
    {
      degree: "دوره‌ی درک مقدماتی شبکه",
      school: "مکتب‌خونه",
      period: "۱۴۰۵",
      description:
        "دوره‌ی آموزشی درک مقدماتی شبکه را در مکتب‌خونه با موفقیت به پایان رساندم؛ نخستین قدم رسمی من در دنیای شبکه.",
      current: false,
    },
  ] as EducationItem[],

  /* ─── سئو ─── */
  seoDescription:
    "محمدامین شاکر (GALOX) — building from zero. سایت شخصی و رزومه آنلاین من؛ پروژه‌های پایتون، لینوکس، امنیت سایبری و تکنولوژی.",
};

export type Profile = typeof profile;
