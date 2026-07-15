export const content = {
  site: {
    title: {
      en: "Your Name — Academic Homepage",
      zh: "你的名字 — 学术主页",
    },
    description: {
      en: "Research, education, selected publications, and personal projects by Your Name.",
      zh: "你的名字的研究方向、教育经历、代表论文与个人项目。",
    },
  },
  profile: {
    initials: "YN",
    name: { en: "Your Name", zh: "你的名字" },
    role: {
      en: "Researcher in your field",
      zh: "你的研究领域 · 研究者",
    },
    introduction: {
      en: "I study the questions that sit between your primary field and its neighboring disciplines. Replace this sentence with a concise account of what you investigate and why it matters.",
      zh: "我关注你的主要研究领域及其相邻学科之间的问题。请将这段文字替换为你所研究的问题、采用的方法，以及它为什么重要。",
    },
    portrait: {
      primary: "./portrait-placeholder.svg",
      alternate: "./portrait-alternate.svg",
      alt: {
        en: "Geometric placeholder portrait for Your Name",
        zh: "你的名字的几何肖像占位图",
      },
    },
  },
  emails: [
    { type: "education", address: "your.name@university.edu" },
    { type: "personal", address: "your.name@example.com" },
  ],
  academicLinks: [
    { platform: "scholar", label: "Google Scholar", href: "" },
    { platform: "orcid", label: "ORCID", href: "" },
    { platform: "github", label: "GitHub", href: "" },
    { platform: "researchgate", label: "ResearchGate", href: "" },
  ],
  socialLinks: [
    {
      platform: "qq",
      label: "QQ",
      href: "",
      qr: "./qr-qq-placeholder.svg",
      account: "000000000",
      qrAlt: {
        en: "Non-scannable placeholder for a QQ QR code",
        zh: "不可扫描的 QQ 二维码占位图",
      },
    },
    {
      platform: "wechat",
      label: "WeChat",
      href: "",
      qr: "./qr-wechat-placeholder.svg",
      account: "your-wechat-id",
      qrAlt: {
        en: "Non-scannable placeholder for a WeChat QR code",
        zh: "不可扫描的微信二维码占位图",
      },
    },
    { platform: "x", label: "X", href: "", qr: "", account: "" },
    {
      platform: "telegram",
      label: "Telegram",
      href: "",
      qr: "./qr-telegram-placeholder.svg",
      account: "@your-telegram-account",
      qrAlt: {
        en: "Non-scannable placeholder for a Telegram QR code",
        zh: "不可扫描的 Telegram 二维码占位图",
      },
    },
  ],
  researchAreas: [
    {
      title: {
        en: "Human-Centered Machine Learning",
        zh: "以人为中心的机器学习",
      },
      keywords: {
        en: ["Interaction", "Interpretability", "Evaluation"],
        zh: ["交互", "可解释性", "评估"],
      },
      description: {
        en: "I study how machine-learning systems can communicate their behavior and support informed human decisions.",
        zh: "我关注机器学习系统如何解释其行为，并帮助人们做出有依据的判断。",
      },
      image: {
        src: "./teaser-placeholder.svg",
        alt: {
          en: "Placeholder illustration for human-centered machine learning",
          zh: "以人为中心的机器学习示意图占位图",
        },
      },
    },
    {
      title: {
        en: "Multimodal Interaction",
        zh: "多模态交互",
      },
      keywords: {
        en: ["Vision", "Language", "Interfaces"],
        zh: ["视觉", "语言", "界面"],
      },
      description: {
        en: "I explore interfaces that combine visual, linguistic, and behavioral signals into coherent interactions.",
        zh: "我探索如何将视觉、语言与行为信号组织成连贯、自然的交互方式。",
      },
      image: {
        src: "./teaser-placeholder.svg",
        alt: {
          en: "Placeholder illustration for multimodal interaction",
          zh: "多模态交互示意图占位图",
        },
      },
    },
    {
      title: {
        en: "Reliable AI Systems",
        zh: "可靠人工智能系统",
      },
      keywords: {
        en: ["Robustness", "Uncertainty", "Deployment"],
        zh: ["鲁棒性", "不确定性", "部署"],
      },
      description: {
        en: "I investigate how intelligent systems behave under uncertainty and how their limitations can be measured before deployment.",
        zh: "我研究智能系统在不确定环境中的行为，以及如何在部署前衡量其能力边界。",
      },
      image: {
        src: "./teaser-placeholder.svg",
        alt: {
          en: "Placeholder illustration for reliable AI systems",
          zh: "可靠人工智能系统示意图占位图",
        },
      },
    },
  ],
  resourceCategories: [
    { title: { en: "Datasets", zh: "数据集" }, href: "" },
    { title: { en: "Academic Tools", zh: "学术工具" }, href: "" },
    { title: { en: "Reading & Blogs", zh: "阅读与博客" }, href: "" },
    { title: { en: "Learning Materials", zh: "学习资料" }, href: "" },
  ],
  education: [
    {
      startDate: "20XX-09",
      endDate: "20XY-06",
      institution: {
        en: "University or Institute",
        zh: "大学或研究机构",
      },
      degree: {
        en: "Ph.D. in Your Discipline",
        zh: "你的专业 · 博士",
      },
      detail: {
        en: "Advisor: Name · City, Country",
        zh: "导师：姓名 · 城市，国家",
      },
      highlights: [
        {
          text: {
            en: "Recipient of an academic honor or fellowship",
            zh: "曾获学术荣誉或奖学金",
          },
          href: "",
        },
        {
          text: {
            en: "Thesis: A concise placeholder thesis title",
            zh: "毕设：简洁准确的论文题目占位文字",
          },
          href: "",
        },
      ],
      logo: "./education-logo-1.svg",
      logoAlt: {
        en: "Placeholder logo for University or Institute",
        zh: "大学或研究机构的校徽占位图",
      },
      institutionUrl: "",
    },
    {
      startDate: "20XX-09",
      endDate: "20XY-06",
      institution: {
        en: "Previous University",
        zh: "此前就读大学",
      },
      degree: {
        en: "B.Sc. or M.Sc. in Your Discipline",
        zh: "你的专业 · 学士或硕士",
      },
      detail: {
        en: "Honors or relevant concentration · City, Country",
        zh: "荣誉或相关方向 · 城市，国家",
      },
      highlights: [
        {
          text: {
            en: "Graduated with an academic distinction",
            zh: "以优异成绩毕业",
          },
          href: "",
        },
        {
          text: {
            en: "Thesis: An earlier project or dissertation title",
            zh: "毕设：早期项目或学位论文题目",
          },
          href: "",
        },
      ],
      logo: "./education-logo-2.svg",
      logoAlt: {
        en: "Placeholder logo for Previous University",
        zh: "此前就读大学的校徽占位图",
      },
      institutionUrl: "",
    },
  ],
  publications: [
    {
      year: "20XX",
      title: {
        en: "A representative paper title goes here",
        zh: "代表论文标题放在这里",
      },
      titleUrl: "",
      authors: [
        { name: "Your Name", href: "" },
        { name: "Coauthor One", href: "" },
        { name: "Coauthor Two", href: "" },
      ],
      venue: {
        en: "Conference or Journal Name",
        zh: "会议或期刊名称",
      },
      note: { en: "Selected paper", zh: "代表论文" },
      links: [
        { label: "Paper", href: "" },
        { label: "Code", href: "" },
      ],
      teaser: {
        poster: "./teaser-placeholder.svg",
        alt: {
          en: "Placeholder figure for the representative paper",
          zh: "代表论文的示意图占位图",
        },
        motion: { type: "image", src: "./teaser-motion.svg" },
      },
    },
    {
      year: "20XX",
      title: {
        en: "Another publication with a clear, descriptive title",
        zh: "另一篇标题清晰、表意准确的论文",
      },
      titleUrl: "",
      authors: [
        { name: "Coauthor One", href: "" },
        { name: "Your Name", href: "" },
        { name: "Coauthor Two", href: "" },
      ],
      venue: {
        en: "Conference or Journal Name",
        zh: "会议或期刊名称",
      },
      note: { en: "Oral presentation", zh: "口头报告" },
      links: [{ label: "DOI", href: "" }],
      teaser: {
        poster: "./teaser-placeholder.svg",
        alt: {
          en: "Placeholder figure for another publication",
          zh: "另一篇论文的示意图占位图",
        },
        motion: { type: "image", src: "./teaser-motion.svg" },
      },
    },
    {
      year: "20XY",
      title: {
        en: "Earlier work that establishes the research trajectory",
        zh: "奠定研究脉络的早期工作",
      },
      titleUrl: "",
      authors: [
        { name: "Your Name", href: "" },
        { name: "Coauthor One", href: "" },
      ],
      venue: {
        en: "Workshop, Preprint, or Journal",
        zh: "研讨会、预印本或期刊",
      },
      note: { en: "Preprint", zh: "预印本" },
      links: [{ label: "Project", href: "" }],
      teaser: {
        poster: "./teaser-placeholder.svg",
        alt: {
          en: "Placeholder figure for earlier work",
          zh: "早期工作的示意图占位图",
        },
        motion: { type: "image", src: "./teaser-motion.svg" },
      },
    },
  ],
  projects: [
    {
      title: {
        en: "A self-directed tool for a recurring task",
        zh: "用于处理重复任务的自主工具",
      },
      titleUrl: "",
      description: {
        en: "Replace this placeholder with a concise explanation of a personal tool you designed, the problem it addresses, and the people who may find it useful.",
        zh: "请将这段占位文字替换为你自主设计的个人工具、它所解决的问题，以及可能从中受益的使用者。",
      },
      links: [
        { label: "Code", href: "" },
        { label: "Demo", href: "" },
      ],
      teaser: {
        poster: "./teaser-placeholder.svg",
        alt: {
          en: "Placeholder preview for a self-directed personal tool",
          zh: "自主个人工具的预览图占位图",
        },
        motion: { type: "image", src: "./teaser-motion.svg" },
      },
    },
    {
      title: {
        en: "An experiment in a subject worth exploring",
        zh: "围绕感兴趣主题开展的实验",
      },
      titleUrl: "",
      description: {
        en: "Use this entry for a self-initiated experiment or small system developed outside formal employment, described by its purpose rather than a list of technologies.",
        zh: "这里可介绍一项在正式受雇工作之外自主开展的实验或小型系统，重点说明其目的，而不是罗列技术栈。",
      },
      links: [{ label: "Homepage", href: "" }],
      teaser: {
        poster: "./teaser-placeholder.svg",
        alt: {
          en: "Placeholder preview for a self-initiated experiment",
          zh: "自主实验的预览图占位图",
        },
        motion: { type: "image", src: "./teaser-motion.svg" },
      },
    },
  ],
  labels: {
    skip: { en: "Skip to content", zh: "跳到主要内容" },
    personalLinks: { en: "Personal links", zh: "个人链接" },
    emails: { en: "Email addresses", zh: "邮箱" },
    educationEmail: { en: "Education email", zh: "教育邮箱" },
    personalEmail: { en: "Personal email", zh: "个人邮箱" },
    academicLinks: { en: "Academic profiles", zh: "学术主页" },
    socialLinks: { en: "Social media", zh: "社交媒体" },
    closeContact: { en: "Close contact card", zh: "关闭联系方式" },
    publicationLinks: { en: "Publication links", zh: "论文链接" },
    projectLinks: { en: "Project links", zh: "项目链接" },
    language: { en: "Language", zh: "语言" },
    theme: { en: "Theme", zh: "主题" },
    mode: { en: "Appearance", zh: "明暗模式" },
    settings: { en: "Display settings", zh: "显示设置" },
    closeSettings: { en: "Close settings", zh: "关闭设置" },
    white: { en: "OpenAI White", zh: "OpenAI 白" },
    claude: { en: "Claude", zh: "Claude" },
    linkedin: { en: "LinkedIn blue", zh: "LinkedIn 蓝" },
    spotify: { en: "Spotify green", zh: "Spotify 绿" },
    youtube: { en: "YouTube red", zh: "YouTube 红" },
    twitch: { en: "Twitch purple", zh: "Twitch 紫" },
    bilibili: { en: "Bilibili pink", zh: "Bilibili 粉" },
    auto: { en: "Auto", zh: "自动" },
    light: { en: "Light", zh: "浅色" },
    dark: { en: "Dark", zh: "深色" },
    educationTitle: { en: "Education", zh: "教育经历" },
    contactTitle: { en: "Contact", zh: "联系方式" },
    researchAreasTitle: { en: "Research Areas", zh: "研究领域" },
    publicationsTitle: { en: "Publications", zh: "论文列表" },
    projectsTitle: { en: "Personal Projects", zh: "个人项目" },
    resourcesTitle: { en: "Related Resources", zh: "相关资源" },
    resourceLinks: { en: "Resource category links", zh: "资源分类链接" },
    replaceLink: { en: "Add URL", zh: "添加链接" },
    showAlternatePortrait: {
      en: "Show alternate portrait",
      zh: "显示第二张肖像",
    },
    showMotion: {
      en: "Play publication preview",
      zh: "播放论文动态预览",
    },
    showProjectMotion: {
      en: "Play project preview",
      zh: "播放项目动态预览",
    },
    backToTop: { en: "Back to top", zh: "回到顶部" },
    lastUpdated: { en: "Last updated", zh: "最后更新" },
  },
};
