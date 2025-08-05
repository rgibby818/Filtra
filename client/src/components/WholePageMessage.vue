<template>
  <div
    class="w-dvw h-dvh dark:text-white flex flex-col xl:flex-row items-center justify-center gap-1 sm:gap-4"
  >
    <h1 class="text-lg sm:text-2xl w-full sm:w-1/4 xl:w-1/8 text-center">{{ message }}</h1>
    <DogImage class="p-3 sm:p-0" />
  </div>
</template>

<script setup>
import DogImage from './DogImage.vue'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>
