export const content = {
  site: {
    title: {
      en: "Your Name — Academic Homepage",
      zh: "你的名字 — 学术主页",
    },
    description: {
      en: "Research, education, and selected publications by Your Name.",
      zh: "你的名字的研究方向、教育经历与代表论文。",
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
  links: [
    { label: "Email", href: "" },
    { label: "Google Scholar", href: "" },
    { label: "ORCID", href: "" },
    { label: "GitHub", href: "" },
  ],
  education: [
    {
      period: "20XX — 20XX",
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
      logo: "./education-logo-1.svg",
      logoAlt: {
        en: "Placeholder logo for University or Institute",
        zh: "大学或研究机构的校徽占位图",
      },
      institutionUrl: "",
    },
    {
      period: "20XX — 20XX",
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
  labels: {
    skip: { en: "Skip to content", zh: "跳到主要内容" },
    personalLinks: { en: "Personal links", zh: "个人链接" },
    publicationLinks: { en: "Publication links", zh: "论文链接" },
    language: { en: "Language", zh: "语言" },
    theme: { en: "Theme", zh: "主题" },
    mode: { en: "Appearance", zh: "明暗模式" },
    settings: { en: "Display settings", zh: "显示设置" },
    closeSettings: { en: "Close settings", zh: "关闭设置" },
    white: { en: "White", zh: "纯白" },
    claude: { en: "Claude", zh: "Claude" },
    linkedin: { en: "LinkedIn blue", zh: "LinkedIn 蓝" },
    spotify: { en: "Spotify green", zh: "Spotify 绿" },
    youtube: { en: "YouTube red", zh: "YouTube 红" },
    twitch: { en: "Twitch purple", zh: "Twitch 紫" },
    auto: { en: "Auto", zh: "自动" },
    light: { en: "Light", zh: "浅色" },
    dark: { en: "Dark", zh: "深色" },
    educationTitle: { en: "Education", zh: "教育经历" },
    publicationsTitle: { en: "Publications", zh: "论文列表" },
    replaceLink: { en: "Add URL", zh: "添加链接" },
    showAlternatePortrait: {
      en: "Show alternate portrait",
      zh: "显示第二张肖像",
    },
    showMotion: {
      en: "Play publication preview",
      zh: "播放论文动态预览",
    },
    backToTop: { en: "Back to top", zh: "回到顶部" },
    lastUpdated: { en: "Last updated", zh: "最后更新" },
  },
};
