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
  name: "نام شما",
  fullName: "نام و نام خانوادگی شما",
  initials: "شما",
  role: "توسعه‌دهنده وب",
  /** عبارت‌هایی که در صفحه اصلی به‌صورت چرخشی نمایش داده می‌شوند */
  roles: [
    "توسعه‌دهنده وب",
    "برنامه‌نویس",
    "علاقه‌مند به تکنولوژی",
    "یادگیرنده همیشگی",
  ],
  tagline:
    "به سایت شخصی من خوش آمدید! اینجا فضایی برای معرفی من، مهارت‌ها و پروژه‌هایی است که روی آن‌ها کار می‌کنم. به‌زودی رزومه و نمونه‌کارهای بیشتری اضافه می‌شود.",

  /* ─── تصاویر ─── */
  /** عکس پروفایل؛ فایل عکس خودتان را در پوشه public/images بگذارید و مسیرش را اینجا بنویسید */
  avatar: "/images/avatar.png",

  /* ─── تماس و وضعیت ─── */
  email: "you@example.com",
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
    "سلام! من یک توسعه‌دهنده وب هستم که عاشق ساختن چیزهای جدید و حل مسئله با کد هستم. این متن را می‌توانید در فایل کانفیگ سایت با بیوگرافی واقعی خودتان جایگزین کنید.",
    "در این قسمت می‌توانید درباره مسیر حرفه‌ای، علاقه‌مندی‌ها و اهدافتان بنویسید. چند پاراگراف کوتاه درباره خودتان و کارهایی که انجام می‌دهید، به بازدیدکننده کمک می‌کند شما را بهتر بشناسد.",
    "وقت آزادم را صرف یادگیری تکنولوژی‌های جدید، مطالعه و کار روی پروژه‌های شخصی می‌کنم.",
  ],
  interests: [
    "برنامه‌نویسی",
    "طراحی رابط کاربری",
    "یادگیری زبان‌های جدید",
    "مطالعه کتاب",
    "موسیقی",
    "ورزش",
  ],

  /* ─── شبکه‌های اجتماعی ─── */
  socials: [
    { name: "گیت‌هاب", icon: "github", href: "https://github.com/username" },
    { name: "لینکدین", icon: "linkedin", href: "https://linkedin.com/in/username" },
    { name: "تلگرام", icon: "telegram", href: "https://t.me/username" },
    { name: "اینستاگرام", icon: "instagram", href: "https://instagram.com/username" },
  ] as SocialLink[],

  /* ─── مهارت‌ها ─── */
  skills: [
    { name: "HTML و CSS", level: 85 },
    { name: "جاوااسکریپت / تایپ‌اسکریپت", level: 75 },
    { name: "React / Next.js", level: 70 },
    { name: "Node.js", level: 60 },
    { name: "طراحی رابط کاربری", level: 65 },
  ] as Skill[],

  tools: [
    "Git",
    "VS Code",
    "Figma",
    "Docker",
    "Tailwind CSS",
    "REST API",
    "SQL",
    "Linux",
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
      title: "عنوان شغلی شما",
      company: "نام شرکت یا سازمان",
      period: "۱۴۰۲ - اکنون",
      description:
        "شرح کوتاهی از مسئولیت‌ها و دستاوردهای شما در این شغل. این مورد را در فایل کانفیگ با سابقه واقعی خودتان جایگزین کنید.",
      current: true,
    },
    {
      title: "کارآموز توسعه وب",
      company: "نام شرکت قبلی",
      period: "۱۴۰۱ - ۱۴۰۲",
      description:
        "در این قسمت می‌توانید درباره تجربه‌های قبلی، کارآموزی‌ها یا همکاری‌های آزادتان بنویسید.",
    },
  ] as ExperienceItem[],

  /* ─── تحصیلات ─── */
  education: [
    {
      degree: "مدرک تحصیلی شما",
      school: "نام دانشگاه یا آموزشگاه",
      period: "۱۳۹۸ - ۱۴۰۲",
      description:
        "رشته، گرایش و هر نکته‌ای که دوست دارید درباره دوره تحصیل‌تان بنویسید.",
      current: false,
    },
    {
      degree: "دوره آموزشی برنامه‌نویسی",
      school: "نام آموزشگاه یا پلتفرم آنلاین",
      period: "۱۴۰۱",
      description: "دوره‌ها و گواهینامه‌هایی که گرفته‌اید را اینجا اضافه کنید.",
    },
  ] as EducationItem[],

  /* ─── سئو ─── */
  seoDescription:
    "سایت شخصی و رزومه آنلاین من — معرفی مهارت‌ها، پروژه‌ها و راه‌های ارتباطی.",
};

export type Profile = typeof profile;
