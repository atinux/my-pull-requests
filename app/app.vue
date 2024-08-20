<script setup lang="ts">
const colorMode = useColorMode()
</script>

<template>
  <div>
    <div class="fixed top-0 right-0 p-4">
      <USelect v-model="colorMode.preference" :options="['system', 'light', 'dark']" />
    </div>
    <NuxtPage />
  </div>
</template>

<style lang="postcss">
body {
  @apply min-h-screen bg-white dark:bg-gray-900 dark:text-gray-100 font-sans;
}
</style>
