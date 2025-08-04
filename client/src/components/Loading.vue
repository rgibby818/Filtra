<template>
  <div :class="computedClasses">
    <div
      class="w-full h-full rounded-full absolute border-8 border-transparent border-t-slate-500 border-r-pink-500 border-b-blue-500 border-l-purple-500 animate-spin"
    ></div>
    <span :class="textClasses" class="dark:text-white font-semibold animate-pulse">Loading...</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  width: {
    type: String,
    default: "w-40"
  },
  height: {
    type: String,
    default: "h-40"
  },
  textSize: {
    type: String,
    default: "text-xl"
  }

})

const computedClasses = computed(() => {
  return ['relative', 'flex', 'items-center', 'justify-center', props.width, props.height]
});

const textClasses = computed(() => {
  return ['dark:text-white', 'font-semibold', 'animate-pulse', props.textSize]
})

</script>
