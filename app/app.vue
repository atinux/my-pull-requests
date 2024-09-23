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
      color="black"
      size="xs"
      icon="i-simple-icons-github"
    >
      Create my own contributions page
    </UButton>
  </p>
  <ScrollToTop />
</template>

<style lang="postcss">
body {
  @apply min-h-screen bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 font-sans;
}
</style>
