<script setup>
import Logo from '@/components/Logo.vue';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    to: {
        type: [String, Object],
    }
})

</script>

<template>
  <div class="flex items-center gap-4 bg-gray-100 dark:bg-gray-700">
    <Logo class="w-10 h-10 hover:scale-105" />
    <a class="hover:cursor-pointer hover:scale-105">
    <h3 class="text-2xl text-indigo-500 font-bold ">FILTRA</h3>
    </a>
    <div class="flex  w-full items-center justify-end">
    <h3 class="mr-4 text-1xl text-indigo-500 font-bold flex-end hover:scale-110">About</h3>
    </div>

  </div>
</template>

<style scoped></style>
