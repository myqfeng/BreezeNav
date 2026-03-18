<template>
  <header class="header">
    <div class="header-content">
      <div class="site-info">
        <img v-if="siteConfig.site.logo" :src="siteConfig.site.logo" alt="Logo" class="logo" />
        <h1 class="site-title">{{ siteConfig.site.title }}</h1>
      </div>
      <div class="header-actions">
        <a v-if="siteConfig.site.gitee?.url" :href="siteConfig.site.gitee.url" target="_blank" rel="noopener noreferrer" class="repo-link" title="Gitee 仓库">
          <!-- 内置 Gitee 图标 -->
          <svg v-if="siteConfig.site.gitee.icon === 'gitee'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.327 0 .593-.265.593-.593v-1.481a.593.593 0 0 0-.593-.593h-3.556a.593.593 0 0 1-.593-.593V9.778c0-.327.266-.593.593-.593h5.63c.327 0 .593.266.593.593v6.815a2.37 2.37 0 0 1-2.37 2.37H6.518a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.444-4.445h7.705z"/>
          </svg>
          <!-- 自定义图标 -->
          <img v-else :src="siteConfig.site.gitee.icon" alt="Repo" class="custom-icon" />
        </a>
        <button class="theme-toggle" @click="$emit('cycle-theme')" :title="themeTitle">
        <!-- 深色模式图标 -->
        <svg v-if="currentMode === 'dark'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <!-- 浅色模式图标 -->
        <svg v-else-if="currentMode === 'light'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <!-- 自动模式图标 (半圆，表示自动切换) -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
          <path d="M12 12V2a10 10 0 0 1 10 10"></path>
        </svg>
      </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  siteConfig: {
    type: Object,
    required: true
  },
  currentMode: {
    type: String,
    default: 'auto',
    validator: (value) => ['dark', 'light', 'auto'].includes(value)
  }
})

defineEmits(['cycle-theme'])

// 模式对应的提示文字
const themeTitle = computed(() => {
  const titles = {
    dark: '当前：深色模式（点击切换）',
    light: '当前：浅色模式（点击切换）',
    auto: '当前：跟随系统（点击切换）'
  }
  return titles[props.currentMode]
})
</script>

<style scoped>
.header {
  padding: 0.75rem 1.5rem;
  background: var(--header-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  object-fit: cover;
}

.site-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-color-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.repo-link {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
}

.repo-link:hover {
  background: var(--hover-bg);
  border-color: #c71d23;
  color: #c71d23;
  transform: translateY(-2px);
}

.custom-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: var(--hover-bg);
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
}
</style>