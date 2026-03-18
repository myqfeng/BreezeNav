<template>
  <footer class="footer" v-html="footerContent"></footer>
</template>

<script setup>
import footerHtml from '../config/footer.html?raw'

const footerContent = footerHtml
</script>

<style>
.footer {
  margin-top: auto;
  padding: 2rem;
  background: var(--footer-bg);
  border-top: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  text-align: center;
}

.footer p,
.footer div,
.footer section,
.footer article,
.footer span {
  display: block;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0.5rem 0;
}

.footer a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer a:hover {
  color: var(--primary-color);
}

.footer img {
  vertical-align: middle;
}
</style>
