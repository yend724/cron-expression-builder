<script setup lang="ts">
import { computed } from 'vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import LayoutMain from '@/components/LayoutMain.vue'
import LayoutAside from '@/components/LayoutAside.vue'
import CopyableInputTextField from '@/components/CopyableInputTextField.vue'
import CronField from '@/components/CronField.vue'
import { MINUTES, HOURS, DAYS, MONTHS, WEEKS_LABEL } from '@/constants'
import { useCronField } from '@/composables/useCronField'

const minute = useCronField('minute')
const hour = useCronField('hour')
const day = useCronField('day')
const month = useCronField('month')
const week = useCronField('week')

const weeksSelected = computed(() =>
  week.parsedValues.value.map(v => WEEKS_LABEL[v]),
)

const isIncludeInvalid = computed(() =>
  [minute, hour, day, month, week].some(field => !field.isValid.value),
)

const cron = computed(() =>
  [minute, hour, day, month, week].map(field => field.value.value).join(' '),
)
</script>

<template>
  <div class="max-w-4xl mx-auto py-12 font-mono px-4">
    <div class="grid gap-y-8">
      <LayoutHeader />
      <LayoutAside />
      <LayoutMain class="grid gap-y-8">
        <div class="grid gap-y-6">
          <div class="grid gap-y-2">
            <CronField
              label="分(0-59)"
              v-model="minute.value.value"
              :values="MINUTES"
              :selectedValues="minute.parsedValues.value"
              :isValid="minute.isValid.value"
            />
          </div>
          <div class="grid gap-y-2">
            <CronField
              label="時(0-23)"
              v-model="hour.value.value"
              :values="HOURS"
              :selectedValues="hour.parsedValues.value"
              :isValid="hour.isValid.value"
            />
          </div>
          <div class="grid gap-y-2">
            <CronField
              label="日(1-31)"
              v-model="day.value.value"
              :values="DAYS"
              :selectedValues="day.parsedValues.value"
              :isValid="day.isValid.value"
            />
          </div>
          <div class="grid gap-y-2">
            <CronField
              label="月(1-12)"
              v-model="month.value.value"
              :values="MONTHS"
              :selectedValues="month.parsedValues.value"
              :isValid="month.isValid.value"
            />
          </div>
          <div class="grid gap-y-2">
            <CronField
              label="曜日(0-6)"
              v-model="week.value.value"
              :values="WEEKS_LABEL"
              :selectedValues="weeksSelected"
              :isValid="week.isValid.value"
            />
          </div>
        </div>
        <div>
          <CopyableInputTextField
            v-model="cron"
            :class="{ 'bg-red-100 border-red-300': isIncludeInvalid }"
          />
        </div>
      </LayoutMain>
    </div>
  </div>
</template>
