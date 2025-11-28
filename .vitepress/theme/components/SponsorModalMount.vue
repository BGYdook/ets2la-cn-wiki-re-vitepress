<script setup lang="ts">
// 挂载到默认主题的底部插槽，用于拦截社交图标点击并在当前页显示赞助模态
import { onMounted, onUnmounted, ref } from 'vue'

// 可见状态
const visible = ref(false)
// 记录点击点到屏幕中心的位移，用于入场/离场动画
const fromX = ref(0)
const fromY = ref(0)

// 打开模态
function open() {
  visible.value = true
}
// 关闭模态
function close() {
  visible.value = false
}

// 键盘快捷关闭（Esc）
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

let el: HTMLAnchorElement | null = null

onMounted(() => {
  // 通过 aria-label 精确匹配要拦截的社交链接
  el = document.querySelector('a[aria-label="alipay link"]') as HTMLAnchorElement | null
  if (el) {
    // 拦截图标点击，记录点击位置用于动画，并阻止默认跳转
    el.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault()
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      fromX.value = e.clientX - cx
      fromY.value = e.clientY - cy
      open()
    })
  }
  window.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  if (el) {
    // 移除事件监听（通过克隆替换方式确保干净）
    el.replaceWith(el.cloneNode(true))
  }
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <!-- 外层遮罩淡入淡出 -->
  <Transition name="vp-fade" appear>
    <div v-if="visible" class="vp-sponsor-modal" @click.self="close">
      <!-- 内容层从点击位置弹出到居中，并在关闭时回到点击位置 -->
      <Transition name="vp-pop" appear>
        <div class="vp-sponsor-modal__content" :style="{ '--from-x': fromX + 'px', '--from-y': fromY + 'px' }">
          <img src="/sponsor.png" alt="sponsor" />
          <button class="vp-sponsor-modal__close" @click="close" aria-label="close">×</button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
 /* 全屏遮罩层 */
 .vp-sponsor-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
 /* 内容容器（居中卡片） */
 .vp-sponsor-modal__content {
  position: relative;
  max-width: min(90vw, 560px);
  max-height: 90vh;
  background: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.35);
  padding: 16px;
}
 .vp-sponsor-modal__content img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
}
 /* 右上角关闭按钮 */
 .vp-sponsor-modal__close {
  position: absolute;
  top: 8px;
  right: 12px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

 /* 遮罩淡入淡出过渡 */
.vp-fade-enter-active,
.vp-fade-leave-active {
  transition: opacity .18s ease;
}
.vp-fade-enter-from,
.vp-fade-leave-to {
  opacity: 0;
}

 /* 内容层从点击点弹出到居中的过渡（入场/离场） */
.vp-pop-enter-active,
.vp-pop-leave-active {
  transition: transform .24s cubic-bezier(.2, .8, .2, 1), opacity .24s ease;
}
.vp-pop-enter-from {
  opacity: 0;
  transform: translate(var(--from-x), var(--from-y)) scale(.2);
}
.vp-pop-leave-to {
  opacity: 0;
  /* 关闭时回到点击位置并缩小淡出 */
  transform: translate(var(--from-x), var(--from-y)) scale(.2);
}
</style>
