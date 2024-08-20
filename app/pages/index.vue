<script setup lang="ts">
import type { Contributions } from '~~/types/contributions'

const { data: contributions } = await useFetch<Contributions>('/api/contributions')

if (!contributions.value) {
  throw createError('Could not load User activity')
}

const { user, prs } = contributions.value

useHead({
  link: [
    { rel: 'icon', href: '/favicon.png' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'alternate', type: 'application/rss+xml', title: `${user.name}'s recent pull requests`, href: '/feed.xml' },
  ],
})
useSeoMeta({
  title: `${user.name} is Contributing`,
  description: `Discover ${user.name} recent pull requests on GitHub.`,
  ogTitle: `${user.name} is Contributing`,
  ogDescription: `Discover ${user.name} recent pull requests on GitHub.`,
  twitterCard: 'summary_large_image',
})
// TODO: OG Image
</script>

<template>
  <div class="mx-auto p-10 max-w-[700px]">
    <div class="flex flex-col">
      <h1 class="text-3xl flex gap-2 flex-wrap justify-center items-center">
        <a :href="`https://github.com/${user.username}`" target="_blank" class="flex items-center gap-3">
          <UAvatar :src="user.avatar" :alt="user.name" size="lg" />
          {{ user.name }}
        </a>
        is <span class="animate-pulse">Contributing...</span>
      </h1>
      <p class="mt-1 flex items-center justify-center gap-1 op75">
        <NuxtLink :to="`https://github.com/${user.username}`" target="_blank">
          Discover {{ user.name }}'s recent pull requests on GitHub
        </NuxtLink>
        <UButton
          to="/feed.xml"
          target="_blank"
          aria-label="RSS Feed"
          icon="i-ph-rss-simple-duotone"
          size="xs"
          color="gray"
          variant="link"
        />
      </p>
      <UDivider class="my-10 w-1/2 mx-auto animate-pulse" />
    </div>
    <PullRequest v-for="pr of prs" :key="pr.url" :data="pr" />
  </div>
</template>
