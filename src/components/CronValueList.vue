<script setup lang="ts">
import { computed } from 'vue'

interface Props<T extends string | number> {
  values: T[]
  selectedValues: T[]
}

const props = defineProps<Props<string | number>>()

const valuesAsString = computed(() => props.values.map(v => v.toString()))
const selectedValuesAsString = computed(() =>
  props.selectedValues.map(v => v.toString()),
)
</script>

<template>
  <ul class="flex gap-1 flex-wrap">
    <li
      v-for="item in valuesAsString"
      :key="item"
      class="size-6 grid place-items-center rounded"
      :class="{
        'bg-gray-900 text-gray-100': selectedValuesAsString.includes(item),
      }"
    >
      {{ item }}
    </li>
  </ul>
</template>
