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
      class="w-8 text-center p-1 rounded"
      :class="{
        'bg-black text-white': selectedValuesAsString.includes(item),
      }"
    >
      {{ item }}
    </li>
  </ul>
</template>
