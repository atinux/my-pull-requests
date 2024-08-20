<script setup lang="ts">
import type { Contributions } from '~~/types'

defineProps<{
  data: Contributions['prs'][number]
}>()
</script>

<template>
  <div class="flex items-center gap-4">
    <a
      :href="`https://github.com/${data.repo}`"
      target="_blank"
      relative
      class="size-12 shrink-0 rounded-md border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm"
    >
      <img :src="`https://github.com/${data.repo.split('/')[0]}.png`" :alt="data.repo" class="size-full">
    </a>

    <div class="flex-1 flex justify-between gap-2 lg:gap-4 min-w-0">
      <div class="flex flex-col min-w-0 gap-1">
        <a :href="data.url" target="_blank" class="flex items-center gap-1 hover:underline text-gray-900 dark:text-white">
          <UIcon
            name="i-ph-git-pull-request-duotone"
            :class="{
              'text-green-500 dark:text-green-400': data.state === 'open',
              'text-purple-500 dark:text-purple-400': data.state === 'merged'
            }"
            class="size-5 shrink-0"
          />

          <span class="truncate">{{ data.title }}</span>
        </a>

        <a :href="`https://github.com/${data.repo}`" target="_blank" class="flex gap-1 hover:underline">
          <span class="opacity-75">{{ data.repo.split('/')[0] }}</span>
          <span class="opacity-50">/</span>
          <span class="truncate">{{ data.repo.split('/')[1] }}</span>
        </a>
      </div>

      <div class="flex flex-col justify-between shrink-0 text-right">
        <a :href="data.url" target="_blank" class="hover:underline">
          #{{ data.number }}
        </a>

        <time :datatime="data.created_at" class="text-sm text-gray-500 dark:text-gray-400">{{ useTimeAgo(new Date(data.created_at)) }}</time>
      </div>
    </div>
  </div>
</template>
