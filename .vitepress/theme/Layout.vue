<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import SponsorModalMount from './components/SponsorModalMount.vue'
// 使用默认主题的 Layout 并在底部插槽挂载 SponsorModal，实现当前页弹窗
</script>

<template>
  <DefaultTheme.Layout>
    <!-- 底部插槽：在所有页面统一渲染 SponsorModalMount -->
    <template #layout-bottom>
      <SponsorModalMount />
    </template>
  </DefaultTheme.Layout>
</template>
