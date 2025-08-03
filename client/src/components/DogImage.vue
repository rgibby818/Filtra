<template>
  <div v-if="dogs">
    <img :src="dogs.message" alt="An Image of a dog" class="w-full h-64 p-2 sm:p-0 rounded-xl" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const dogs = ref(null)

async function getErrorImage() {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    if (response.ok) {
      const data = await response.json()
      dogs.value = data
    }
  } catch (error) {
    console.log('Error:', error)
  }
}

onMounted(() => {
  getErrorImage()
})
</script>
