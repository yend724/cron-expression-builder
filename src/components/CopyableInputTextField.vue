<script setup lang="ts">
import { ref } from 'vue'
const result = defineModel<string>()
const isCopied = ref(false)

const copyToClipboard = () => {
  try {
    navigator.clipboard.writeText(result.value ?? '')
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 1000)
  } catch (error) {
    console.error('Failed to copy to clipboard', error)
  }
}
</script>

<template>
  <div class="border rounded-md p-4 bg-gray-100">
    <div class="grid grid-cols-[1fr_auto] gap-2 items-center">
      <div>{{ result }}</div>
      <button
        type="button"
        class="flex items-center px-2 rounded-md py-1 text-white bg-black hover:bg-gray-700"
        @click="copyToClipboard"
      >
        <template v-if="isCopied">Copied</template>
        <template v-else>Copy</template>
      </button>
    </div>
  </div>
</template>
