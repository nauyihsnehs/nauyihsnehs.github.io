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
      sources: [
        "content/profile/avatar-pixel.png",
        "content/profile/avatar-cubism.png",
        "content/profile/avatar-Mondrian.png",
      ],
      alt: {
        en: "Stylized portrait of Your Name",
        zh: "你的名字的风格化肖像",
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
        },
        {
          id: "academic-tools",
          enabled: true,
          title: { en: "Academic Tools", zh: "学术工具" },
        },
        {
          id: "reading",
          enabled: true,
          title: { en: "Reading & Blogs", zh: "阅读与博客" },
        },
        {
          id: "learning",
          enabled: true,
          title: { en: "Learning Materials", zh: "学习资料" },
        },
      ],
    },
  ],
  resourcePage: {
    title: { en: "Related Resources", zh: "相关资源" },
    metaTitle: {
      en: "Related Resources — Your Name",
      zh: "相关资源 — 你的名字",
    },
    description: {
      en: "A curated collection of datasets, academic tools, reading, and learning materials from Your Name.",
      zh: "你的名字整理的数据集、学术工具、阅读内容与学习资料。",
    },
    introduction: {
      en: "This page is a structured placeholder for resources that support research, writing, and continued learning. Replace each draft entry with a resource you recommend.",
      zh: "本页是研究、写作与持续学习相关资源的结构化占位页面。请将每个草稿条目替换为你推荐的真实资源。",
    },
    views: [
      {
        id: "datasets",
        enabled: true,
        title: { en: "Datasets", zh: "数据集" },
        description: {
          en: "Public datasets, benchmarks, and reproducibility artifacts relevant to your research.",
          zh: "与你的研究相关的公开数据集、基准与可复现性材料。",
        },
        items: [
          {
            id: "benchmark-dataset",
            enabled: true,
            title: {
              en: "Benchmark Dataset Placeholder",
              zh: "基准数据集占位条目",
            },
            description: {
              en: "Add a widely used benchmark, its intended tasks, and a brief note on appropriate use.",
              zh: "添加一个常用基准，并说明它适用的任务与合理使用方式。",
            },
            href: "",
          },
          {
            id: "annotated-corpus",
            enabled: true,
            title: {
              en: "Annotated Corpus Placeholder",
              zh: "标注语料库占位条目",
            },
            description: {
              en: "Add a curated corpus with a short account of its scope, annotations, and license.",
              zh: "添加一个整理后的语料库，并简述其范围、标注与许可。",
            },
            href: "",
          },
          {
            id: "reproducibility-archive",
            enabled: true,
            title: {
              en: "Reproducibility Archive Placeholder",
              zh: "可复现性档案占位条目",
            },
            description: {
              en: "Add an archive that pairs research data with code, documentation, or evaluation results.",
              zh: "添加一个将研究数据与代码、文档或评估结果配套归档的资源。",
            },
            href: "",
          },
        ],
      },
      {
        id: "academic-tools",
        enabled: true,
        title: { en: "Academic Tools", zh: "学术工具" },
        description: {
          en: "Practical tools and templates for literature review, experimentation, and scholarly communication.",
          zh: "用于文献综述、实验管理与学术交流的实用工具和模板。",
        },
        items: [
          {
            id: "literature-workspace",
            enabled: true,
            title: {
              en: "Literature Review Workspace",
              zh: "文献综述工作区",
            },
            description: {
              en: "Add a tool or template for collecting, comparing, and synthesizing research literature.",
              zh: "添加一个用于收集、比较和综合研究文献的工具或模板。",
            },
            href: "",
          },
          {
            id: "experiment-tracker",
            enabled: true,
            title: {
              en: "Experiment Tracking Template",
              zh: "实验跟踪模板",
            },
            description: {
              en: "Add a lightweight system for recording hypotheses, configurations, and outcomes.",
              zh: "添加一个用于记录假设、配置与结果的轻量系统。",
            },
            href: "",
          },
          {
            id: "citation-utility",
            enabled: true,
            title: {
              en: "Citation Utility Placeholder",
              zh: "引文工具占位条目",
            },
            description: {
              en: "Add a utility that improves citation management, metadata cleanup, or bibliography checks.",
              zh: "添加一个改善引文管理、元数据清理或参考文献检查的工具。",
            },
            href: "",
          },
        ],
      },
      {
        id: "reading",
        enabled: true,
        title: { en: "Reading & Blogs", zh: "阅读与博客" },
        description: {
          en: "Selected essays, research notes, and reading lists that provide useful context and perspective.",
          zh: "提供有价值背景与观点的精选文章、研究笔记和阅读清单。",
        },
        items: [
          {
            id: "research-notes",
            enabled: true,
            title: {
              en: "Research Notes Collection",
              zh: "研究笔记合集",
            },
            description: {
              en: "Add a collection of concise notes that explains important ideas in your field.",
              zh: "添加一组简明解释你所在领域重要概念的研究笔记。",
            },
            href: "",
          },
          {
            id: "field-reading-list",
            enabled: true,
            title: {
              en: "Field Reading List Placeholder",
              zh: "领域阅读清单占位条目",
            },
            description: {
              en: "Add a guided sequence of foundational and recent readings for newcomers.",
              zh: "添加一份面向初学者、涵盖基础与近期成果的引导式阅读顺序。",
            },
            href: "",
          },
          {
            id: "methods-blog-roll",
            enabled: true,
            title: {
              en: "Methods Blog Roll Placeholder",
              zh: "方法博客清单占位条目",
            },
            description: {
              en: "Add trustworthy authors who write clearly about methods, evidence, and research practice.",
              zh: "添加清晰讨论研究方法、证据与实践的可信作者或博客。",
            },
            href: "",
          },
        ],
      },
      {
        id: "learning",
        enabled: true,
        title: { en: "Learning Materials", zh: "学习资料" },
        description: {
          en: "Courses, tutorials, and structured paths for building durable knowledge and practical skills.",
          zh: "用于建立扎实知识与实践能力的课程、教程和结构化学习路径。",
        },
        items: [
          {
            id: "course-notes",
            enabled: true,
            title: {
              en: "Introductory Course Notes",
              zh: "入门课程讲义",
            },
            description: {
              en: "Add approachable course notes that establish the field's core concepts and vocabulary.",
              zh: "添加一套易于理解、介绍领域核心概念与术语的课程讲义。",
            },
            href: "",
          },
          {
            id: "workshop-materials",
            enabled: true,
            title: {
              en: "Workshop Materials Placeholder",
              zh: "研讨课材料占位条目",
            },
            description: {
              en: "Add practical exercises, slides, or demonstrations for a focused research skill.",
              zh: "添加针对某项研究技能的实践练习、幻灯片或演示。",
            },
            href: "",
          },
          {
            id: "self-study-path",
            enabled: true,
            title: {
              en: "Self-Study Path Placeholder",
              zh: "自学路径占位条目",
            },
            description: {
              en: "Add a staged learning path that connects prerequisites, practice, and advanced material.",
              zh: "添加一条连接先修知识、实践与进阶材料的分阶段学习路径。",
            },
            href: "",
          },
        ],
      },
    ],
  },
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
    cyclePortrait: {
      en: "Show next portrait",
      zh: "切换下一张肖像",
    },
    previousResearch: {
      en: "Show previous research area",
      zh: "显示上一个研究领域",
    },
    nextResearch: {
      en: "Show next research area",
      zh: "显示下一个研究领域",
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
    home: { en: "Home", zh: "主页" },
    resourceCategories: {
      en: "Resource categories",
      zh: "资源分类",
    },
    resourceEntries: { en: "Resource entries", zh: "资源条目" },
    resourcePlaceholder: { en: "Link placeholder", zh: "链接占位" },
    openResource: { en: "Open resource", zh: "打开资源" },
  },
};
