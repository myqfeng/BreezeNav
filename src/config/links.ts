// ============== 类型定义（无需改动）==============
export interface LinkItem {
  title: string
  url: string
  icon: string
  description: string
}

export interface Category {
  id: string
  title: string
  icon: string
  links: LinkItem[]
}

export interface LinksConfig {
  categories: Category[]
}

// ============== 链接配置（可修改）==============
const config: LinksConfig = {
  categories: [
    // ==================== 个人网站 ====================
    {
      id: 'personal',
      /** 分类标题 */
      title: '个人网站',
      /** 分类图标，使用 lucide:图标名 格式，可用图标见 https://lucide.dev/icons */
      icon: 'lucide:globe',
      links: [
        {
          /** 链接标题 */
          title: 'QtEasyTier',
          /** 链接地址 */
          url: 'https://qtet.070219.xyz',
          /** 图标：可以是图片URL，或 lucide:图标名 格式 */
          icon: 'https://qtet.070219.xyz/favicon.ico',
          /** 鼠标悬停时显示的描述 */
          description: 'QtEasyTier 异地组网工具官网',
        },
        {
          title: 'CBCraft',
          url: 'https://cbcraft.070219.xyz',
          icon: 'https://cbcraft.070219.xyz/_astro/favicon.BcCBMdy4.png',
          description: 'Minecraft 指令大全',
        },
        {
          title: '明月清风的博客',
          url: 'https://blog.070219.xyz',
          icon: 'https://blog.070219.xyz/assets/images/icon.png',
          description: '技术博客与生活分享',
        },
        {
          title: '明月清风的小屋',
          url: 'https://www.070219.xyz',
          icon: 'lucide:activity',
          description: '明月清风的个人导航站',
        },
      ],
    },

    // ==================== 使用教程 ====================

    {
      id: 'tutorials',
      title: '使用教程',
      icon: 'lucide:book',
      links: [
        {
          title: '编写中',
          url: 'https://www.070219.xyz',
          icon: 'lucide:book',
          description: '敬请期待',
        },
      ],
    },

    // ==================== 开源仓库 ====================
    {
      id: 'repos',
      title: '开源仓库',
      icon: 'lucide:github',
      links: [
        {
          title: 'Gitee',
          url: 'https://gitee.com/viagrahuang',
          icon: 'lucide:git-branch',
          description: '明月清风的 Gitee 开源仓库',
        },
        {
          title: 'GitHub',
          url: 'https://github.com/myqfeng',
          icon: 'lucide:github',
          description: '明月清风的 GitHub 开源仓库',
        },
      ],
    },
  ],
}

export default config