<template>
  <!-- 背景图片层（双层实现交叉淡入淡出） -->
  <div class="bg-image bg-prev" :style="prevBgStyle"></div>
  <div class="bg-image bg-current" :style="currentBgStyle"></div>
  <!-- 渐变遮罩层 -->
  <div class="bg-overlay" :class="{ 'hidden': minimalMode }"></div>
  
  <div class="app" :class="{ 'minimal-mode': minimalMode }">
    <!-- 极简模式右上角按钮 -->
    <div class="minimal-actions" :class="{ 'visible': minimalMode }">
      <a v-if="siteConfig.site.gitee?.url" :href="siteConfig.site.gitee.url" target="_blank" rel="noopener noreferrer" class="minimal-btn repo-link" title="Gitee 仓库">
        <svg v-if="siteConfig.site.gitee.icon === 'gitee'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.327 0 .593-.265.593-.593v-1.481a.593.593 0 0 0-.593-.593h-3.556a.593.593 0 0 1-.593-.593V9.778c0-.327.266-.593.593-.593h5.63c.327 0 .593.266.593.593v6.815a2.37 2.37 0 0 1-2.37 2.37H6.518a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.444-4.445h7.705z"/>
        </svg>
        <img v-else :src="siteConfig.site.gitee.icon" alt="Repo" class="custom-icon" />
      </a>
      <button class="minimal-btn theme-toggle" @click="cycleTheme" :title="themeTitle">
        <svg v-if="currentMode === 'dark'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <svg v-else-if="currentMode === 'light'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
          <path d="M12 12V2a10 10 0 0 1 10 10"></path>
        </svg>
      </button>
    </div>
    <Header :siteConfig="siteConfig" :currentMode="currentMode" @cycle-theme="cycleTheme" :class="{ 'fade-slide-up': minimalMode }" />
    <main class="main-content">
      <div class="container">
        <div class="author-section" v-if="siteConfig.site.avatar" :class="{ 'minimal-mode-center': minimalMode }" @click="!minimalMode && enterMinimalMode()">
          <img :src="siteConfig.site.avatar" :alt="siteConfig.site.author" class="author-avatar" />
          <div class="author-info">
            <h2 class="author-name">{{ siteConfig.site.author }}</h2>
            <p class="author-bio">{{ siteConfig.site.authorBio || '探索技术的无限可能' }}</p>
          </div>
          <div class="clock-section" @click.stop="handleClockClick" :class="{ 'clickable': minimalMode }">
            <div class="clock">{{ currentTime }}</div>
            <div class="date">{{ currentDate }}</div>
          </div>
        </div>
        
        <!-- 搜索框 -->
        <div v-if="siteConfig.site.search?.enabled" class="search-section" :class="{ 'minimal-mode-center': minimalMode }">
          <form class="search-form" @submit.prevent="handleSearch" @click="focusSearchInput">
            <button type="button" class="engine-toggle" @click.stop="toggleSearchEngine" :title="currentEngine === 'bing' ? '当前：Bing（点击切换百度）' : '当前：百度（点击切换Bing）'">
              <!-- Bing 官方图标 -->
              <img v-if="currentEngine === 'bing'" src="https://www.bing.com/favicon.ico" alt="Bing" class="engine-icon" />
              <!-- 百度官方图标 -->
              <img v-else src="https://www.baidu.com/favicon.ico" alt="百度" class="engine-icon" />
            </button>
            <input 
              ref="searchInputRef"
              v-model="searchQuery" 
              type="text" 
              class="search-input" 
              :placeholder="currentEngine === 'bing' ? '使用 Bing 搜索...' : '使用百度搜索...'"
              autocomplete="off"
            />
            <button type="submit" class="search-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>
        
        <div class="categories-wrapper" :class="{ 'fade-out': minimalMode }">
          <CategorySection 
            v-for="category in linksConfig.categories" 
            :key="category.id" 
            :category="category"
          />
        </div>
      </div>
    </main>
    <Footer :class="{ 'fade-out': minimalMode }" />
    
    <!-- 极简模式提示框 -->
    <Transition name="toast">
      <div v-if="showToast" class="toast-message">
        已进入极简模式，点击时间卡片退出
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import Header from './components/Header.vue'
import CategorySection from './components/CategorySection.vue'
import Footer from './components/Footer.vue'
import siteConfigData from './config/site'
import linksConfigData from './config/links'

const siteConfig = ref(siteConfigData)
const linksConfig = ref(linksConfigData)
const isDark = ref(true)
const currentTime = ref('')
const currentDate = ref('')
const searchQuery = ref('')
const searchInputRef = ref(null)
const currentEngine = ref('bing')

// 主题模式: 'dark' | 'light' | 'auto'
const currentMode = ref('auto')

// 背景图相关状态
const bgLayerAIndex = ref(0)  // A层图片索引
const bgLayerBIndex = ref(-1) // B层图片索引（-1表示未初始化）
const activeLayer = ref('A')  // 当前显示的层
const transitioningLayer = ref('')  // 正在淡出的层
let carouselTimer = null

// 获取当前显示的图片索引
const currentBgIndex = computed(() => {
  return activeLayer.value === 'A' ? bgLayerAIndex.value : bgLayerBIndex.value
})

// 当前背景图样式（A层）
const currentBgStyle = computed(() => {
  if (bgImages.value.length === 0) return { display: 'none' }
  const url = getCacheBustedUrl(bgImages.value[bgLayerAIndex.value])
  const isActive = activeLayer.value === 'A'
  const isTransitioning = transitioningLayer.value === 'A'
  return {
    backgroundImage: `url('${url}')`,
    opacity: isActive ? 1 : 0,
    transform: isTransitioning ? 'scale(1.08)' : 'scale(1)'
  }
})

// 前一张背景图样式（B层）
const prevBgStyle = computed(() => {
  if (bgImages.value.length === 0 || bgLayerBIndex.value < 0) return { display: 'none' }
  const url = getCacheBustedUrl(bgImages.value[bgLayerBIndex.value])
  const isActive = activeLayer.value === 'B'
  const isTransitioning = transitioningLayer.value === 'B'
  return {
    backgroundImage: `url('${url}')`,
    opacity: isActive ? 1 : 0,
    transform: isTransitioning ? 'scale(1.08)' : 'scale(1)'
  }
})

// 获取背景图列表
const bgImages = computed(() => {
  const bgConfig = siteConfig.value.theme.background
  if (!bgConfig || !bgConfig.images || bgConfig.images.length === 0) {
    return []
  }
  return bgConfig.images
})

// 获取背景图配置
const bgConfig = computed(() => siteConfig.value.theme.background)

// 生成带时间戳的 URL（避免缓存）
const getCacheBustedUrl = (url) => {
  if (!url) return ''
  // 随机模式强制添加时间戳避免缓存
  if (bgConfig.value.mode === 'random') {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}_t=${Date.now()}`
  }
  return url
}

// 切换到下一张背景图
const nextBackground = () => {
  if (bgImages.value.length <= 1) return
  
  // 计算下一张图片索引
  const currentIndex = activeLayer.value === 'A' ? bgLayerAIndex.value : bgLayerBIndex.value
  const nextIndex = (currentIndex + 1) % bgImages.value.length
  
  // 设置当前层为淡出层
  transitioningLayer.value = activeLayer.value
  
  // 更新非当前层的图片索引，然后切换显示
  if (activeLayer.value === 'A') {
    bgLayerBIndex.value = nextIndex
    activeLayer.value = 'B'
  } else {
    bgLayerAIndex.value = nextIndex
    activeLayer.value = 'A'
  }
  
  // 过渡完成后清除淡出状态
  setTimeout(() => {
    transitioningLayer.value = ''
  }, 1500)
}

// 随机选择一张背景图
const randomBackground = () => {
  if (bgImages.value.length === 0) return
  
  // 直接随机选择任意图片
  const newIndex = Math.floor(Math.random() * bgImages.value.length)
  
  // 检查是否已有图片显示（用于判断是否需要淡出动画）
  const hasActiveImage = (activeLayer.value === 'A' && bgLayerAIndex.value >= 0) ||
                         (activeLayer.value === 'B' && bgLayerBIndex.value >= 0)
  
  // 如果已有图片显示，设置当前层为淡出层
  if (hasActiveImage) {
    transitioningLayer.value = activeLayer.value
  }
  
  // 更新非当前层并切换
  if (activeLayer.value === 'A') {
    bgLayerBIndex.value = newIndex
    activeLayer.value = 'B'
  } else {
    bgLayerAIndex.value = newIndex
    activeLayer.value = 'A'
  }
  
  // 过渡完成后清除淡出状态
  if (hasActiveImage) {
    setTimeout(() => {
      transitioningLayer.value = ''
    }, 1500)
  }
}

// 初始化背景图
const initBackground = () => {
  const config = bgConfig.value
  if (!config || !bgImages.value.length) return
  
  // 清除之前的定时器
  if (carouselTimer) {
    clearInterval(carouselTimer)
    carouselTimer = null
  }
  
  // 预加载所有背景图
  bgImages.value.forEach(url => {
    const img = new Image()
    img.src = url
  })
  
  // 重置状态
  bgLayerAIndex.value = -1
  bgLayerBIndex.value = -1
  activeLayer.value = 'A'
  transitioningLayer.value = ''
  
  switch (config.mode) {
    case 'carousel':
      // 轮播模式：从第一张开始
      bgLayerAIndex.value = 0
      const interval = (config.carouselInterval || 15) * 1000
      carouselTimer = setInterval(nextBackground, interval)
      break
    case 'random':
      // 随机模式：随机选择一张
      randomBackground()
      break
    case 'single':
    default:
      // 单张模式：保持第一张
      bgLayerAIndex.value = 0
      break
  }
}

// 模式对应的提示文字
const themeTitle = computed(() => {
  const titles = {
    dark: '当前：深色模式（点击切换）',
    light: '当前：浅色模式（点击切换）',
    auto: '当前：跟随系统（点击切换）'
  }
  return titles[currentMode.value]
})

// 循环切换主题
const cycleTheme = () => {
  const modes = ['dark', 'light', 'auto']
  const currentIndex = modes.indexOf(currentMode.value)
  const nextIndex = (currentIndex + 1) % modes.length
  currentMode.value = modes[nextIndex]
  
  applyTheme()
  saveTheme()
}

// 应用主题
const applyTheme = () => {
  if (currentMode.value === 'auto') {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  } else {
    isDark.value = currentMode.value === 'dark'
  }
  
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}

// 保存主题设置
const saveTheme = () => {
  localStorage.setItem('theme', currentMode.value)
}

// 极简模式状态
const minimalMode = ref(false)
// 提示框状态
const showToast = ref(false)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    const query = encodeURIComponent(searchQuery.value.trim())
    if (currentEngine.value === 'bing') {
      window.open(`https://www.bing.com/search?q=${query}`, '_blank')
    } else {
      window.open(`https://www.baidu.com/s?wd=${query}`, '_blank')
    }
  }
}

const toggleSearchEngine = () => {
  currentEngine.value = currentEngine.value === 'bing' ? 'baidu' : 'bing'
  localStorage.setItem('searchEngine', currentEngine.value)
}

// 点击搜索框任意位置聚焦输入框
const focusSearchInput = () => {
  searchInputRef.value?.focus()
}

// 进入极简模式（点击作者卡片）
const enterMinimalMode = () => {
  minimalMode.value = true
  showToast.value = true
  // 5秒后自动隐藏提示
  setTimeout(() => {
    showToast.value = false
  }, 5000)
}

// 退出极简模式（点击时间卡片）
const exitMinimalMode = () => {
  minimalMode.value = false
}

// 时钟点击处理：普通模式进入极简，极简模式退出
const handleClockClick = () => {
  if (minimalMode.value) {
    exitMinimalMode()
  } else {
    enterMinimalMode()
  }
}

onMounted(() => {
  // 初始化主题
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme && ['dark', 'light', 'auto'].includes(savedTheme)) {
    currentMode.value = savedTheme
  } else {
    currentMode.value = siteConfig.value.theme.default || 'auto'
  }
  applyTheme()
  
  // 设置主题颜色
  if (siteConfig.value.theme.primaryColor) {
    document.documentElement.style.setProperty('--primary-color', siteConfig.value.theme.primaryColor)
    const darkerColor = adjustColor(siteConfig.value.theme.primaryColor, -20)
    document.documentElement.style.setProperty('--primary-color-dark', darkerColor)
  }
  
  // 设置字体
  if (siteConfig.value.site.fontFamily) {
    document.documentElement.style.setProperty('--font-family', siteConfig.value.site.fontFamily)
  }
  
  // 初始化时钟
  updateClock()
  setInterval(updateClock, 1000)
  
  // 初始化搜索引擎
  const savedEngine = localStorage.getItem('searchEngine')
  if (savedEngine === 'bing' || savedEngine === 'baidu') {
    currentEngine.value = savedEngine
  } else {
    currentEngine.value = siteConfig.value.site.search?.defaultEngine || 'bing'
  }
  
  // 初始化背景图
  initBackground()
})

onUnmounted(() => {
  // 清理背景图轮播定时器
  if (carouselTimer) {
    clearInterval(carouselTimer)
    carouselTimer = null
  }
})

const updateClock = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}:${seconds}`
  
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const weekday = days[now.getDay()]
  currentDate.value = `${year}年${month}月${day}日 ${weekday}`
}

const adjustColor = (color, amount) => {
  const clamp = (num) => Math.min(255, Math.max(0, num))
  let hex = color.replace('#', '')
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)
  r = clamp(r + amount)
  g = clamp(g + amount)
  b = clamp(b + amount)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
</script>

<style>
/* 极简模式右上角按钮 */
.minimal-actions {
  position: fixed;
  top: 1rem;
  right: 2.5rem;
  display: flex;
  gap: 0.5rem;
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.minimal-actions.visible {
  opacity: 1;
  pointer-events: auto;
}

.minimal-btn {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
}

.minimal-btn:hover {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.minimal-btn.repo-link:hover {
  border-color: #c71d23;
  color: #c71d23;
}

.minimal-btn.theme-toggle {
  cursor: pointer;
}

.minimal-btn.theme-toggle:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

[data-theme="light"] .minimal-btn {
  border-color: rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.5);
  color: #1e293b;
}

[data-theme="light"] .minimal-btn:hover {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.25);
}

/* Header 渐隐上滑动画 */
:deep(.header) {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-up {
  opacity: 0 !important;
  transform: translateY(-100%);
  pointer-events: none;
}

/* Footer 和分类区域在极简模式下直接隐藏 */
.fade-out {
  display: none;
}

.author-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  margin-bottom: 2.5rem;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  transition: 
    background 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    backdrop-filter 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    flex-direction 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    gap 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    padding 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    margin-bottom 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.author-section:hover {
  border-color: var(--primary-color);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.author-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-color);
  box-shadow: 0 4px 20px var(--shadow-color);
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
              height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.author-info {
  display: flex;
  flex-direction: column;
  transition: align-items 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.author-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
  transition: font-size 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              text-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.author-bio {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0;
  font-weight: 600;
  transition: font-size 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              text-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.clock-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
  transition: margin-left 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              align-items 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.clock {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  text-shadow: 0 0 15px rgba(102, 204, 255, 0.6);
  letter-spacing: 2px;
  transition: font-size 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              text-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.date {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
  font-weight: 600;
  transition: font-size 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              text-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-section {
  margin-bottom: 5rem;
  margin-top: 4rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  width: 600px;
  max-width: calc(100vw - 2rem);
  transition: margin-top 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              margin-bottom 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-form {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  width: 100%;
}

.search-form:hover {
  border-color: var(--primary-color);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.search-form:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 4px 20px var(--shadow-color);
}

.engine-toggle {
  background: transparent;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.engine-toggle:hover {
  background: var(--hover-bg);
  transform: scale(1.1);
}

.engine-icon {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  object-fit: contain;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  color: var(--text-primary);
  font-family: inherit;
  min-width: 0;
  line-height: 1.4;
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.search-btn {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-color-dark));
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.search-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 204, 255, 0.4);
}

/* 极简模式样式 */
.app.minimal-mode {
  justify-content: flex-start;
  align-items: center;
  padding-top: 15vh;
}

.app.minimal-mode .main-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 0;
  padding-top: 0;
}

.app.minimal-mode .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
}

.author-section.minimal-mode-center {
  cursor: default;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
  padding: 2.5rem 3rem;
  background: transparent;
  border-color: transparent;
  backdrop-filter: none;
  box-shadow: none;
  margin-bottom: 0;
}

.author-section.minimal-mode-center:hover {
  border-color: transparent;
  box-shadow: none;
}

.author-section.minimal-mode-center .author-avatar {
  width: 100px;
  height: 100px;
}

.author-section.minimal-mode-center .author-name {
  font-size: 2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 0, 0, 0.3);
}

.author-section.minimal-mode-center .author-bio {
  font-size: 1.1rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3);
}

.author-section.minimal-mode-center .clock {
  font-size: 2.5rem;
  text-shadow: 0 2px 15px rgba(102, 204, 255, 0.8), 0 0 40px rgba(0, 0, 0, 0.5);
}

.author-section.minimal-mode-center .date {
  font-size: 1.1rem;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.85), 0 0 40px rgba(0, 0, 0, 0.65);
}

/* 浅色模式下极简模式文字颜色加深 */
[data-theme="light"] .author-section.minimal-mode-center .author-name,
[data-theme="light"] .author-section.minimal-mode-center .author-bio,
[data-theme="light"] .author-section.minimal-mode-center .date {
  color: #1e293b;
  text-shadow: 0 1px 4px rgba(255, 255, 255, 0.5);
}

.author-section.minimal-mode-center .author-info {
  align-items: center;
}

.author-section.minimal-mode-center .clock-section {
  margin-left: 0;
  align-items: center;
}

.author-section.minimal-mode-center .clock-section.clickable {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.author-section.minimal-mode-center .clock-section.clickable:hover {
  background: var(--hover-bg);
  transform: scale(1.05);
}

.search-section.minimal-mode-center {
  margin-top: 0;
  margin-bottom: 0;
}

/* 提示框样式 */
.toast-message {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--card-bg);
  color: var(--text-primary);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px var(--shadow-color);
  font-size: 0.95rem;
  z-index: 1000;
  white-space: nowrap;
}

/* 提示框动画 */
.toast-enter-active {
  animation: toastIn 0.3s ease;
}

.toast-leave-active {
  animation: toastOut 0.3s ease;
}

@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes toastOut {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
}

@media (max-width: 768px) {
  .author-section {
    flex-direction: column;
    text-align: center;
  }
  
  .author-avatar {
    width: 100px;
    height: 100px;
  }
  
  .author-name {
    font-size: 1.25rem;
  }
  
  .clock-section {
    display: none;
  }
  
  /* 极简模式下移动端显示时钟 */
  .author-section.minimal-mode-center .clock-section {
    display: flex;
  }
  
  .search-form {
    padding: 0.6rem 0.75rem;
    gap: 0.5rem;
  }
  
  .search-section {
    width: calc(100vw - 2rem);
    max-width: 100%;
  }
  
  .search-input {
    font-size: 0.9rem;
  }
  
  .search-btn svg {
    width: 18px;
    height: 18px;
  }
  
  .search-btn {
    width: 32px;
    height: 32px;
  }
  
  .toast-message {
    font-size: 0.85rem;
    padding: 0.75rem 1rem;
    top: 60px;
  }
}
</style>