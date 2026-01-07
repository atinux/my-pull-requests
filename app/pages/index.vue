<script setup lang="ts">
const colorMode = useColorMode()
const [{ data: contributions }, { data: issuesData }] = await Promise.all([
  useFetch<Contributions>('/api/contributions'),
  useFetch<Issues>('/api/issues'),
])

if (!contributions.value) {
  throw createError('Could not load User activity')
}

const { user, prs } = contributions.value
const issues = issuesData.value?.issues ?? []
const activeTab = ref('prs')
const userUrl = `https://github.com/${user.username}`

useHead({
  link: [
    { rel: 'icon', href: '/favicon.png' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'alternate', type: 'application/rss+xml', title: `${user.name}'s recent pull requests`, href: '/feed.xml' },
  ],
})
const url = useRequestURL()
useSeoMeta({
  title: `${user.name} is Contributing`,
  description: `Discover ${user.name} recent pull requests and issues on GitHub.`,
  ogTitle: `${user.name} is Contributing`,
  ogDescription: `Discover ${user.name} recent pull requests and issues on GitHub.`,
  twitterCard: 'summary_large_image',
  ogImage: `${url.origin}/og.png`,
  twitterImage: `${url.origin}/og.png`,
})

const order = ref<'asc' | 'desc'>('desc')
const orderKey = ref<'date' | 'star'>('date')

const items = computed(() => [
  [{
    label: 'Star',
    icon: 'i-lucide-star',
    checked: orderKey.value === 'star',
    type: 'checkbox' as const,
    onUpdateChecked(checked: boolean) {
      orderKey.value = checked ? 'star' : 'date'
    },
    onSelect(e: Event) {
      e.preventDefault()
    },
  }],
  [{
    label: orderKey.value === 'date' ? 'Oldset' : 'Ascending',
    icon: 'i-lucide-arrow-up-narrow-wide',
    checked: order.value === 'asc',
    type: 'checkbox' as const,
    onUpdateChecked(checked: boolean) {
      if (!checked) return
      order.value = 'asc'
    },
    onSelect(e: Event) {
      e.preventDefault()
    },
  }, {
    label: orderKey.value === 'date' ? 'Newest' : 'Descending',
    icon: 'i-lucide-arrow-down-narrow-wide',
    checked: order.value === 'desc',
    type: 'checkbox' as const,
    onUpdateChecked(checked: boolean) {
      if (!checked) return
      order.value = 'desc'
    },
    onSelect(e: Event) {
      e.preventDefault()
    },
  }],
])

const orderedItems = computed(() => {
  const items = activeTab.value === 'prs' ? [...prs] : [...issues]
  items.sort((a, b) => {
    if (orderKey.value === 'star') {
      return order.value === 'asc' ? a.stars - b.stars : b.stars - a.stars
    }
    else {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return order.value === 'asc' ? dateA - dateB : dateB - dateA
    }
  })
  return items
})
</script>

<template>
  <UContainer class="p-4 sm:p-6 lg:p-8 lg:pt-10 max-w-3xl">
    <div class="flex flex-col items-center gap-2">
      <a :href="userUrl" target="_blank"><UAvatar
        :src="user.avatar"
        :alt="user.name"
        size="xl"
      />
      </a>
      <h1 class="text-2xl sm:text-3xl text-center">
        <a :href="userUrl" target="_blank">
          {{ user.name }}
        </a>
        is <span class="animate-pulse">Contributing...</span>
      </h1>
      <p class="text-center text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300">
        <NuxtLink :to="userUrl" target="_blank">
          @{{ user.username }}'s recent contributions on GitHub.
        </NuxtLink>
      </p>
      <div class="flex items-center justify-center gap-1 text-neutral-700 dark:text-neutral-300">
        <ClientOnly>
          <UButton
            :aria-label="`${user.name}'s GitHub profile`"
            :icon="colorMode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
            color="neutral"
            variant="link"
            @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
          />
          <template #fallback>
            <div class="w-8 h-8" />
          </template>
        </ClientOnly>
        <UButton
          :to="userUrl"
          external
          target="_blank"
          :aria-label="`${user.name}'s GitHub profile`"
          icon="i-lucide-github"
          color="neutral"
          variant="link"
        />
        <UButton
          to="/feed.xml"
          external
          target="_blank"
          aria-label="RSS Feed"
          icon="i-lucide-rss"
          color="neutral"
          variant="link"
        />
      </div>
      <USeparator class="mt-2 sm:mt-6 mb-6 sm:mb-10 w-1/2 mx-auto animate-pulse" />
    </div>

    <UTabs
      v-model="activeTab"
      :items="[
        { label: 'Pull Requests', value: 'prs', icon: 'i-lucide-git-pull-request' },
        { label: 'Issues', value: 'issues', icon: 'i-lucide-circle-dot' },
      ]"
      class="mb-6"
    />

    <div class="relative">
      <div class="flex justify-end absolute -top-10 lg:-top-12 right-0">
        <UDropdownMenu
          :items="items"
          :content="{
            align: 'start',
            side: 'bottom',
            sideOffset: 8,
          }"
          :ui="{
            content: 'w-48',
          }"
          size="xs"
        >
          <UButton
            :label="orderKey === 'star' ? 'Stars': order === 'asc' ? 'Oldset': 'Newset'"
            :icon="order === 'asc' ? 'i-lucide-arrow-up-narrow-wide': 'i-lucide-arrow-down-narrow-wide' "
            color="neutral"
            variant="soft"
            size="xs"
          />
        </UDropdownMenu>
      </div>
      <div class="flex flex-col gap-6 mt-5 sm:gap-10">
        <template v-if="activeTab === 'prs'">
          <PullRequest v-for="pr of orderedItems" :key="pr.url" :data="pr as PullRequest" />
        </template>
        <template v-else>
          <IssueItem v-for="issue of orderedItems" :key="issue.url" :data="issue as Issue" />
        </template>
      </div>
    </div>
  </UContainer>
</template>
