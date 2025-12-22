<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()
const show = ref(false)
const agreed = ref(false)

function open() {
  show.value = true
  agreed.value = false
}

function handleAgree() {
  if (agreed.value) {
    show.value = false
  }
}

function handleDisagree() {
  router.go('/')
}

onMounted(() => {
  open()
})
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="agreement-overlay">
      <div class="agreement-modal">
        <div class="modal-header">
          <h2>许可协议</h2>
        </div>

        <div class="modal-content">
          <p>
            本教程名为：
            <strong>ETS2LA 中国区安装与使用指南</strong>
          </p>

          <p>
            由
            <a href="https://goodnightan.com" target="_blank" rel="noopener">晚安</a>
            ，
            <a href="https://github.com/Srlily" target="_blank" rel="noopener">Srlily</a>
            ，
            <a href="https://space.bilibili.com/357816575" target="_blank" rel="noopener">MR-UIAW</a>
            ，
            <a href="https://space.bilibili.com/3493113874090879" target="_blank" rel="noopener">BGYdook</a>
            共同创作。
          </p>

          <p>
            本教程采用
            <strong>知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 (CC BY-NC-SA 4.0)</strong>
            进行许可。
          </p>

          <h3>分享</h3>
          <p>只要您遵守以下许可协议条款：</p>
          <ul>
            <li>署名 (BY) — 您必须给出适当的署名，并指出是否对原始内容进行了更改。</li>
            <li>非商业性使用 (NC) — 您不得将本作品用于商业目的。</li>
            <li>相同方式共享 (SA) — 如果您基于本作品进行创作，您必须使用相同的许可协议分发您的贡献。</li>
          </ul>

          <p>您可以自由地：</p>
          <ul>
            <li>分享 — 在任何媒介或格式下复制和分发本作品。</li>
            <li>演绎 — 修改、转换或基于本作品进行二次创作。</li>
          </ul>

          <p>如您接受，请勾选“我已阅读上述许可协议”并选择“同意并继续”按钮</p>
          <p>如您不接受，请选择“不同意”按钮并返回主页</p>
          
          <div class="agreement-checkbox">
            <label class="checkbox-row">
              <input v-model="agreed" type="checkbox" />
              <span class="checkmark" />
              <span class="text">我已阅读上述许可协议</span>
            </label>
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn secondary" @click="handleDisagree" :disabled="agreed">
            <span>不同意</span>
          </button>
          <button class="btn primary" @click="handleAgree" :disabled="!agreed">
            <span>同意并继续</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.agreement-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.agreement-modal {
  background: var(--vp-c-bg);
  border-radius: 12px;
  max-width: 840px;
  width: 100%;
  max-height: 80vh;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 20px 24px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.modal-content {
  padding: 20px 24px;
  overflow-y: auto;
}

.modal-content p {
  margin: 10px 0;
  line-height: 1.7;
}

.modal-content ul {
  margin: 10px 0 10px 22px;
}

.modal-content li {
  margin: 4px 0;
}

.agreement-checkbox {
  margin-top: 18px;
  padding: 12px 14px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.checkbox-row input {
  position: absolute;
  opacity: 0;
}

.checkmark {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #bbb;
  position: relative;
  transition: all 0.25s ease;
}

.checkbox-row input:checked + .checkmark {
  background: var(--vp-c-brand-1);
}

.checkbox-row input:checked + .checkmark::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 3px;
  width: 4px;
  height: 8px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.text {
  font-size: 14px;
}

.modal-actions {
  padding: 16px 24px 20px;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn {
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn.primary {
  border: none;
  color: #fff;
  background: var(--vp-c-brand-1);
}

.btn.primary:disabled {
  background: var(--vp-c-divider);
  cursor: not-allowed;
}

.btn.primary:not(:disabled):hover {
  background: var(--vp-c-brand-2);
}

.btn.secondary {
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  background: transparent;
}

.btn.secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn.secondary:not(:disabled):hover {
  border-color: var(--vp-c-text-1);
  color: var(--vp-c-text-1);
}

@media (max-width: 640px) {
  .agreement-modal {
    max-height: 100vh;
  }
  .modal-content {
    padding: 16px;
  }
  .modal-actions {
    padding: 12px 16px 16px;
  }
}
</style>

