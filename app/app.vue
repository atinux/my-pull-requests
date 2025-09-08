<script setup>
useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <NuxtPage />
  <p class="text-center py-6 pb-10 text-sm">
    <UButton
      to="https://github.com/atinux/my-pull-requests"
      target="_blank"
      color="neutral"
      variant="subtle"
      size="sm"
      icon="i-simple-icons-github"
    >
      Create my own contributions page
    </UButton>
  </p>
  <ScrollToTop />
</template>

<style lang="postcss">
body {
  @apply min-h-screen bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 font-sans;
}
</style>
