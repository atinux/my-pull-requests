<script setup lang="ts">
function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const { y: scroll } = useWindowScroll()
</script>

<template>
  <UButton
    title="Scroll to top"
    aria-label="Scroll to top"
    color="gray"
    variant="ghost"
    class="z-100 fixed bottom-3 right-3 h-10 w-10 flex justify-center items-center rounded-full transition duration-300 text-gray-600 hover:bg-[#8882] hover:opacity-100 dark:text-white dark:hover:bg-[#8883] print:hidden"
    icon="i-ph-arrow-up"
    :class="scroll > 200 ? 'opacity-40' : '!opacity-0 pointer-events-none'"
    @click="toTop()"
  />
</template>
