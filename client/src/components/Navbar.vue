<script setup>
import Logo from '@/components/Logo.vue'
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const props = defineProps({
  to: {
    type: [String, Object],
  },
})
</script>

<template>
  <nav class="flex items-center gap-4 bg-gray-100 dark:bg-gray-700">
    <Logo class="w-10 h-10 hover:scale-105" />
    <RouterLink class="hover:cursor-pointer hover:scale-105" to="/">
      <h3 class="text-2xl text-indigo-500 font-bold">FILTRA</h3>
    </RouterLink>
    <div class="flex w-full items-center justify-end">
      <RouterLink class="hover:cursor-pointer hover:scale-105" to="/history">
        <h3 class="mr-4 text-1xl text-indigo-500 font-bold flex-end">History</h3>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped></style>
