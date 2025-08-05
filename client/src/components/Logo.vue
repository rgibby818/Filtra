<template>
  <svg viewBox="0 0 150 50" xmlns="http://www.w3.org/2000/svg" class="h-full w-full">
    <g transform="translate(10, 10)">
      <circle cx="15" cy="15" r="12" fill="none" stroke="#6366f1" stroke-width="2.5" />
      <circle cx="15" cy="15" r="6" fill="#6366f1" />
    </g>
    <text
      x="50"
      :y="fontYPosition"
      font-family="Arial, sans-serif"
      :font-size="fontSize"
      font-weight="600"
      fill="#6366f1"
    >
      Filtra
    </text>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  fontSize: {
    type: String,
    default: '24',
  },
})

// Aligns the svg text to the circle logo
const fontYPosition = computed(() => {
  const fontSize = parseInt(props.fontSize)
  return fontSize * 0.35 + 25
})
</script>
