// ============== 类型定义（无需改动）==============
export interface SiteConfig {
  title: string
  author: string
  authorBio: string
  avatar: string
  logo: string
  favicon: string
  fontFamily: string
  description: string
  keywords: string
  /** Git 仓库配置 */
  gitee: {
    url: string
    icon: string
  }
  /** 搜索配置 */
  search: {
    enabled: boolean
    defaultEngine: 'bing' | 'baidu'
  }
}

/** 背景图设置 */
/** 背景图模式：'single' 单张 | 'carousel' 轮播 | 'random' 随机 */
export type BackgroundMode = 'single' | 'carousel' | 'random'
export interface BackgroundConfig {

  mode: BackgroundMode
  images: string[]
  carouselInterval?: number
}

export interface ThemeConfig {
  /** 默认主题：'dark' 深色 | 'light' 浅色 | 'auto' 跟随系统 */
  default: 'dark' | 'light' | 'auto'
  primaryColor: string
  /** 背景图配置（新版，支持多图） */
  background: BackgroundConfig
  /** @deprecated 请使用 background 配置 */
  backgroundOld?: {
    dark: string
    light: string
  }
}

export interface Config {
  site: SiteConfig
  theme: ThemeConfig
}

// ============== 站点配置（可修改）==============
const config: Config = {
  site: {
    /** 网站标题，显示在浏览器标签页和页面头部 */
    title: "Breeze Nav | 清风导航站（演示站）",
    /** 站长名称，显示在头像旁 */
    author: "明月清风",
    /** 个人简介，显示在名称下方 */
    authorBio: "Breeze Nav —— 简洁美观的现代化静态导航站模板",
    /** 头像图片路径（public 目录下的文件直接用 /文件名 引用） */
    avatar: "/logo.png",
    /** Logo 图片路径 */
    logo: "/favicon.png",
    /** 网站图标（favicon）路径 */
    favicon: "/favicon.png",
    /** 字体设置，多个字体用逗号分隔，按优先级排列 */
    fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
    /** 网站描述，用于 SEO meta description */
    description: "清风导航站 - 收录个人网站、开源项目和常用工具",
    /** 网站关键词，用于 SEO meta keywords，多个关键词用逗号分隔 */
    keywords: "导航站,个人主页,链接导航,明月清风",
    /** Gitee 仓库配置 */
    gitee: {
      /** Gitee 仓库地址，留空则不显示图标 */
      url: "https://gitee.com/viagrahuang/myqf-home",
      /** 图标类型：'gitee' 使用内置 Gitee 图标，或使用自定义图标 URL */
      icon: "gitee",
    },
    /** 搜索配置 */
    search: {
      /** 是否启用搜索框 */
      enabled: true,
      /** 默认搜索引擎：'bing' | 'baidu' */
      defaultEngine: "bing",
    },
  },

  theme: {
    /** 默认主题：'dark' 深色模式 | 'light' 浅色模式 | 'auto' 跟随系统 */
    default: "auto",
    /** 主题色（十六进制颜色值），影响链接高亮、时钟等元素颜色 */
    primaryColor: "#66ccff",
    background: {
      /** 背景图模式：'single' 单张 | 'carousel' 轮播 | 'random' 随机 */
      mode: "carousel",
      /** 背景图片数组，支持多张图片，设置为单张时只显示第一张 */
      images: [
        "/bkground/background.png",
        "/bkground/pexels-eberhardgross-534164.jpg",
        "/bkground/pexels-jplenio-1423580.jpg",
        "/bkground/pexels-quang-nguyen-vinh-222549-14036070.jpg",
      ],
      /** 轮播模式切换间隔（秒）*/
      carouselInterval: 5,
    },
  },
};

export const { site, theme } = config
export default config