<script setup>
useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <UApp>
    <NuxtPage />
    <p class="py-6 pb-10 text-sm flex items-center justify-center gap-2 flex-wrap px-4">
      <UButton
        to="https://github.com/atinux/my-pull-requests"
        rel="noopener"
        target="_blank"
        color="neutral"
        variant="subtle"
        size="sm"
        icon="i-simple-icons-github"
      >
        Source code
      </UButton>
      <UButton
        to="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fatinux%2Fmy-pull-requests&env=NUXT_GITHUB_TOKEN&envDescription=Create%20a%20GitHub%20token%20with%20no%20special%20scope.&envLink=https%3A%2F%2Fgithub.com%2Fsettings%2Fpersonal-access-tokens%2Fnew&project-name=my-pull-requests&demo-title=My%20Pull%20Requests&demo-description=Create%20a%20website%20with%20an%20RSS%20feed%20of%20your%20recent%20GitHub%20pull%20requests%20across%20the%20Open%20Source%20projects%20you%20contribute%20to.&demo-url=https%3A%2F%2Fprs.atinux.com&demo-image=https%3A%2F%2Fprs.atinux.com%2Fog.png"
        target="_blank"
        rel="noopener"
        color="neutral"
        variant="solid"
        size="sm"
        icon="i-simple-icons-vercel"
      >
        Deploy with Vercel
      </UButton>
    </p>
    <ScrollToTop />
  </UApp>
</template>

<style lang="postcss">
body {
  @apply min-h-screen bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 font-sans;
}
</style>
