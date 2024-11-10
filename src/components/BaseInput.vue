<script setup lang="ts">
import { useId } from 'vue'

const {
  label,
  placeholder,
  readonly,
  isValid = true,
} = defineProps<{
  label?: string
  pattern?: string
  placeholder?: string
  readonly?: boolean
  isValid?: boolean
}>()

const model = defineModel<string>()
const id = useId()
</script>

<template>
  <div class="grid items-center gap-y-1">
    <label :for="id">{{ label }}</label>
    <div class="flex flex-wrap gap-4">
      <input
        :id="id"
        :class="[
          'border rounded-md px-2 py-1 ring-blue-300 flex-grow',
          { 'bg-gray-100': readonly },
          { 'border-red-300 bg-red-100': !isValid },
        ]"
        v-model="model"
        :placeholder="placeholder"
        :readonly="readonly"
        :pattern="pattern"
        required
      />
    </div>
  </div>
</template>
