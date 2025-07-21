<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  buttonText: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <button class="w-3/4 h-9 sm:w-1/3 bg-indigo-500 rounded-full font-semibold text-white
                 hover:bg-indigo-600 hover:scale-105
                  active:bg-indigo-700 active:scale-95
                  cursor-pointer
                  ">{{ buttonText }}</button>
</template>
