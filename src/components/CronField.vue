<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import CronValueList from '@/components/CronValueList.vue'

interface Props {
  label: string
  values: (string | number)[]
  selectedValues: (string | number)[]
  isValid: boolean
}
const props = defineProps<Props>()
const model = defineModel<string>()
</script>

<template>
  <div class="grid gap-y-2">
    <BaseInput
      type="text"
      :label="props.label"
      :isValid="props.isValid"
      v-model="model"
    />
    <CronValueList
      :values="props.values"
      :selectedValues="props.selectedValues"
    />
  </div>
</template>
