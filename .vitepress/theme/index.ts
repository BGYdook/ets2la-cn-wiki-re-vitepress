import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

// 扩展默认主题，替换布局以插入赞助模态挂载点

export default {
  extends: DefaultTheme,
  Layout
}
