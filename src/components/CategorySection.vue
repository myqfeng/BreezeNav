<template>
  <section class="category-section">
    <div class="category-header">
      <span class="category-icon" v-html="getCategoryIcon(category.icon)"></span>
      <h2 class="category-title">{{ category.title }}</h2>
    </div>
    <div class="links-grid">
      <LinkCard v-for="(link, index) in category.links" :key="index" :link="link" />
    </div>
  </section>
</template>

<script setup>
import LinkCard from './LinkCard.vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

const getCategoryIcon = (iconString) => {
  if (!iconString || !iconString.startsWith('lucide:')) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`
  }
  
  const iconName = iconString.replace('lucide:', '')
  const lucideIcons = {
    'globe': '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>',
    'github': '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>',
    'wrench': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>',
    'folder': '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>'
  }
  
  const iconPath = lucideIcons[iconName] || lucideIcons['folder']
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconPath}</svg>`
}
</script>

<style scoped>
.category-section {
  margin-bottom: 3rem;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border-color);
}

.category-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-color-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 8px;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
  justify-items: center;
}

.links-grid > * {
  width: 100%;
  max-width: 400px;
}

@media (max-width: 768px) {
  .links-grid {
    grid-template-columns: 1fr;
  }
  
  .category-title {
    font-size: 1.25rem;
  }
}
</style>
