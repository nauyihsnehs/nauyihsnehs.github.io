export const content = {
  site: {
    defaultLanguage: "en",
    title: {
      en: "Your Name — Academic Homepage",
      zh: "你的名字 — 学术主页",
    },
    description: {
      en: "Research, education, selected publications, and personal projects by Your Name.",
      zh: "你的名字的研究方向、教育经历、代表论文与个人项目。",
    },
  },
  display: {
    languages: [
      { id: "en", label: "EN", htmlLang: "en", locale: "en-GB" },
      { id: "zh", label: "中", htmlLang: "zh-CN", locale: "zh-CN" },
    ],
    defaultTheme: "white",
    defaultMode: "auto",
    themes: [
      "white",
      "claude",
      "linkedin",
      "spotify",
      "youtube",
      "twitch",
      "bilibili",
    ],
    modes: ["auto", "light", "dark"],
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
      primary: "content/profile/portrait-placeholder.svg",
      alternate: "content/profile/portrait-alternate.svg",
      alt: {
        en: "Geometric placeholder portrait for Your Name",
        zh: "你的名字的几何肖像占位图",
      },
    },
  },
  sections: [
    {
      id: "contact",
      enabled: true,
      title: { en: "Contact", zh: "联系方式" },
      emails: [
        {
          id: "education-email",
          enabled: true,
          type: "education",
          address: "your.name@university.edu",
          icon: "icons/maildotru.svg",
        },
        {
          id: "personal-email",
          enabled: true,
          type: "personal",
          address: "your.name@example.com",
          icon: "icons/gmail.svg",
        },
      ],
      academicLinks: [
        {
          id: "scholar",
          enabled: true,
          platform: "scholar",
          label: "Google Scholar",
          href: "",
          icon: "icons/googlescholar.svg",
        },
        {
          id: "orcid",
          enabled: true,
          platform: "orcid",
          label: "ORCID",
          href: "",
          icon: "icons/orcid.svg",
        },
        {
          id: "github",
          enabled: true,
          platform: "github",
          label: "GitHub",
          href: "",
          icon: "icons/github.svg",
        },
        {
          id: "researchgate",
          enabled: true,
          platform: "researchgate",
          label: "ResearchGate",
          href: "",
          icon: "icons/researchgate.svg",
        },
      ],
      socialLinks: [
        {
          id: "qq",
          enabled: true,
          platform: "qq",
          label: "QQ",
          href: "",
          icon: "icons/qq.svg",
          qr: "content/contact/qr-qq-placeholder.svg",
          account: "000000000",
          qrAlt: {
            en: "Non-scannable placeholder for a QQ QR code",
            zh: "不可扫描的 QQ 二维码占位图",
          },
        },
        {
          id: "wechat",
          enabled: true,
          platform: "wechat",
          label: "WeChat",
          href: "",
          icon: "icons/wechat.svg",
          qr: "content/contact/qr-wechat-placeholder.svg",
          account: "your-wechat-id",
          qrAlt: {
            en: "Non-scannable placeholder for a WeChat QR code",
            zh: "不可扫描的微信二维码占位图",
          },
        },
        {
          id: "x",
          enabled: true,
          platform: "x",
          label: "X",
          href: "",
          icon: "icons/x.svg",
          qr: "",
          account: "",
        },
        {
          id: "telegram",
          enabled: true,
          platform: "telegram",
          label: "Telegram",
          href: "",
          icon: "icons/telegram.svg",
          qr: "content/contact/qr-telegram-placeholder.svg",
          account: "@your-telegram-account",
          qrAlt: {
            en: "Non-scannable placeholder for a Telegram QR code",
            zh: "不可扫描的 Telegram 二维码占位图",
          },
        },
      ],
    },
    {
      id: "research",
      enabled: true,
      title: { en: "Research Areas", zh: "研究领域" },
      items: [
        {
          id: "human-centered-ml",
          enabled: true,
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
            src: "content/shared/teaser-placeholder.svg",
            alt: {
              en: "Placeholder illustration for human-centered machine learning",
              zh: "以人为中心的机器学习示意图占位图",
            },
          },
        },
        {
          id: "multimodal-interaction",
          enabled: true,
          title: { en: "Multimodal Interaction", zh: "多模态交互" },
          keywords: {
            en: ["Vision", "Language", "Interfaces"],
            zh: ["视觉", "语言", "界面"],
          },
          description: {
            en: "I explore interfaces that combine visual, linguistic, and behavioral signals into coherent interactions.",
            zh: "我探索如何将视觉、语言与行为信号组织成连贯、自然的交互方式。",
          },
          image: {
            src: "content/shared/teaser-placeholder.svg",
            alt: {
              en: "Placeholder illustration for multimodal interaction",
              zh: "多模态交互示意图占位图",
            },
          },
        },
        {
          id: "reliable-ai",
          enabled: true,
          title: { en: "Reliable AI Systems", zh: "可靠人工智能系统" },
          keywords: {
            en: ["Robustness", "Uncertainty", "Deployment"],
            zh: ["鲁棒性", "不确定性", "部署"],
          },
          description: {
            en: "I investigate how intelligent systems behave under uncertainty and how their limitations can be measured before deployment.",
            zh: "我研究智能系统在不确定环境中的行为，以及如何在部署前衡量其能力边界。",
          },
          image: {
            src: "content/shared/teaser-placeholder.svg",
            alt: {
              en: "Placeholder illustration for reliable AI systems",
              zh: "可靠人工智能系统示意图占位图",
            },
          },
        },
      ],
    },
    {
      id: "publications",
      enabled: true,
      title: { en: "Publications", zh: "论文列表" },
      items: [
        {
          id: "representative-paper",
          enabled: true,
          year: "20XX",
          title: {
            en: "A representative paper title goes here",
            zh: "代表论文标题放在这里",
          },
          titleUrl: "",
          authors: [
            { id: "your-name", name: "Your Name", href: "" },
            { id: "coauthor-one", name: "Coauthor One", href: "" },
            { id: "coauthor-two", name: "Coauthor Two", href: "" },
          ],
          venue: { en: "Conference or Journal Name", zh: "会议或期刊名称" },
          note: { en: "Selected paper", zh: "代表论文" },
          links: [
            { id: "paper", label: "Paper", href: "" },
            { id: "code", label: "Code", href: "" },
          ],
          teaser: {
            poster: "content/shared/teaser-placeholder.svg",
            alt: {
              en: "Placeholder figure for the representative paper",
              zh: "代表论文的示意图占位图",
            },
            motion: {
              type: "image",
              src: "content/shared/teaser-motion.svg",
            },
          },
        },
        {
          id: "oral-paper",
          enabled: true,
          year: "20XX",
          title: {
            en: "Another publication with a clear, descriptive title",
            zh: "另一篇标题清晰、表意准确的论文",
          },
          titleUrl: "",
          authors: [
            { id: "coauthor-one", name: "Coauthor One", href: "" },
            { id: "your-name", name: "Your Name", href: "" },
            { id: "coauthor-two", name: "Coauthor Two", href: "" },
          ],
          venue: { en: "Conference or Journal Name", zh: "会议或期刊名称" },
          note: { en: "Oral presentation", zh: "口头报告" },
          links: [{ id: "doi", label: "DOI", href: "" }],
          teaser: {
            poster: "content/shared/teaser-placeholder.svg",
            alt: {
              en: "Placeholder figure for another publication",
              zh: "另一篇论文的示意图占位图",
            },
            motion: {
              type: "image",
              src: "content/shared/teaser-motion.svg",
            },
          },
        },
        {
          id: "earlier-work",
          enabled: true,
          year: "20XY",
          title: {
            en: "Earlier work that establishes the research trajectory",
            zh: "奠定研究脉络的早期工作",
          },
          titleUrl: "",
          authors: [
            { id: "your-name", name: "Your Name", href: "" },
            { id: "coauthor-one", name: "Coauthor One", href: "" },
          ],
          venue: { en: "Workshop, Preprint, or Journal", zh: "研讨会、预印本或期刊" },
          note: { en: "Preprint", zh: "预印本" },
          links: [{ id: "project", label: "Project", href: "" }],
          teaser: {
            poster: "content/shared/teaser-placeholder.svg",
            alt: {
              en: "Placeholder figure for earlier work",
              zh: "早期工作的示意图占位图",
            },
            motion: {
              type: "image",
              src: "content/shared/teaser-motion.svg",
            },
          },
        },
      ],
    },
    {
      id: "education",
      enabled: true,
      title: { en: "Education", zh: "教育经历" },
      items: [
        {
          id: "graduate-education",
          enabled: true,
          startDate: "20XX-09",
          endDate: "20XY-06",
          institution: { en: "University or Institute", zh: "大学或研究机构" },
          degree: { en: "Ph.D. in Your Discipline", zh: "你的专业 · 博士" },
          detail: {
            en: "Advisor: Name · City, Country",
            zh: "导师：姓名 · 城市，国家",
          },
          highlights: [
            {
              id: "honor",
              text: {
                en: "Recipient of an academic honor or fellowship",
                zh: "曾获学术荣誉或奖学金",
              },
              href: "",
            },
            {
              id: "thesis",
              text: {
                en: "Thesis: A concise placeholder thesis title",
                zh: "毕设：简洁准确的论文题目占位文字",
              },
              href: "",
            },
          ],
          logo: "content/education/education-logo-1.svg",
          logoAlt: {
            en: "Placeholder logo for University or Institute",
            zh: "大学或研究机构的校徽占位图",
          },
          institutionUrl: "",
        },
        {
          id: "previous-education",
          enabled: true,
          startDate: "20XX-09",
          endDate: "20XY-06",
          institution: { en: "Previous University", zh: "此前就读大学" },
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
              id: "distinction",
              text: {
                en: "Graduated with an academic distinction",
                zh: "以优异成绩毕业",
              },
              href: "",
            },
            {
              id: "thesis",
              text: {
                en: "Thesis: An earlier project or dissertation title",
                zh: "毕设：早期项目或学位论文题目",
              },
              href: "",
            },
          ],
          logo: "content/education/education-logo-2.svg",
          logoAlt: {
            en: "Placeholder logo for Previous University",
            zh: "此前就读大学的校徽占位图",
          },
          institutionUrl: "",
        },
      ],
    },
    {
      id: "projects",
      enabled: true,
      title: { en: "Personal Projects", zh: "个人项目" },
      items: [
        {
          id: "recurring-task-tool",
          enabled: true,
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
            { id: "code", label: "Code", href: "" },
            { id: "demo", label: "Demo", href: "" },
          ],
          teaser: {
            poster: "content/shared/teaser-placeholder.svg",
            alt: {
              en: "Placeholder preview for a self-directed personal tool",
              zh: "自主个人工具的预览图占位图",
            },
            motion: {
              type: "image",
              src: "content/shared/teaser-motion.svg",
            },
          },
        },
        {
          id: "independent-experiment",
          enabled: true,
          title: {
            en: "An experiment in a subject worth exploring",
            zh: "围绕感兴趣主题开展的实验",
          },
          titleUrl: "",
          description: {
            en: "Use this entry for a self-initiated experiment or small system developed outside formal employment, described by its purpose rather than a list of technologies.",
            zh: "这里可介绍一项在正式受雇工作之外自主开展的实验或小型系统，重点说明其目的，而不是罗列技术栈。",
          },
          links: [{ id: "homepage", label: "Homepage", href: "" }],
          teaser: {
            poster: "content/shared/teaser-placeholder.svg",
            alt: {
              en: "Placeholder preview for a self-initiated experiment",
              zh: "自主实验的预览图占位图",
            },
            motion: {
              type: "image",
              src: "content/shared/teaser-motion.svg",
            },
          },
        },
      ],
    },
    {
      id: "resources",
      enabled: true,
      title: { en: "Related Resources", zh: "相关资源" },
      items: [
        {
          id: "datasets",
          enabled: true,
          title: { en: "Datasets", zh: "数据集" },
          href: "",
        },
        {
          id: "academic-tools",
          enabled: true,
          title: { en: "Academic Tools", zh: "学术工具" },
          href: "",
        },
        {
          id: "reading",
          enabled: true,
          title: { en: "Reading & Blogs", zh: "阅读与博客" },
          href: "",
        },
        {
          id: "learning",
          enabled: true,
          title: { en: "Learning Materials", zh: "学习资料" },
          href: "",
        },
      ],
    },
  ],
  ui: {
    loading: { en: "Preparing the page…", zh: "正在准备页面……" },
    noscript: {
      en: "This page needs JavaScript for bilingual content and theme switching.",
      zh: "此页面需要 JavaScript 才能切换双语内容和主题。",
    },
    skip: { en: "Skip to content", zh: "跳到主要内容" },
    personalLinks: { en: "Personal links", zh: "个人链接" },
    emails: { en: "Email addresses", zh: "邮箱" },
    educationEmail: { en: "Education email", zh: "教育邮箱" },
    personalEmail: { en: "Personal email", zh: "个人邮箱" },
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
