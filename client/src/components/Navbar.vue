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
  <nav class="flex gap-1 bg-gray-100 dark:bg-gray-700">
    <div class="max-h-10 max-w-30 flex justify-center items-center ml-1">
    <RouterLink class="hover:cursor-pointer active:bg-gray-300 dark:active:bg-gray-800 active:scale-85 rounded-xl" to="/">
    <Logo font-size="38" class="hover:scale-110 p-2"/>
    </RouterLink>
    </div>
    <div class="ml-auto flex justify-center items-center">
      <RouterLink class="hover:cursor-pointer active:bg-gray-300 dark:active:bg-gray-800 active:scale-85 rounded-xl" to="/history">
        <h3 class="p-2 font-bold font-sans text-center mx-1 p-1 text-xl text-indigo-500 hover:scale-110">History</h3>
      </RouterLink>
    </div>
  </nav>
</template>