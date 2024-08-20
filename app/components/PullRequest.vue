<script setup lang="ts">
import { formatTimeAgo } from '@vueuse/core'
import type { PullRequest } from '~~/types/prs'

defineProps<{
  data: PullRequest
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <a
      :href="`https://github.com/${data.repo}`"
      target="_blank"
      relative
    >
      <img
        :src="`https://github.com/${data.repo.split('/')[0]}.png`"
        :alt="data.repo"
        class="size-12 rounded border"
      >
    </a>
    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-1">
        <a
          :href="data.url"
          target="_blank"
          class="text-lg flex items-center gap-1"
        >
          {{ data.title }}
        </a>
        <div class="flex items-center gap-1">
          <a
            :href="`https://github.com/${data.repo}`"
            target="_blank"
            class="flex gap-1 flex-wrap items-center"
          >
            <div class="opacity-75">{{ data.repo.split('/')[0] }}</div>
            <div class="opacity-50">/</div>
            <div>{{ data.repo.split('/')[1] }}</div>
          </a>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-end">
      <UButton
        variant="link"
        :to="data.url"
        target="_blank"
        color="gray"
      >
        <UIcon name="i-ph-git-pull-request-duotone" :class="{ 'text-green-500': data.state === 'open', 'text-purple-500': data.state === 'merged', 'text-red-500': data.state === 'closed' }" />
        #{{ data.number }}
      </UButton>
    </div>
    <time op50 :datatime="data.created_at">{{ formatTimeAgo(new Date(data.created_at)) }}</time>
  </div>
</template>
