<template>
  <div v-if="loading" class="flex flex-col items-center justify-center h-dvh w-dvw">
    <div class="relative w-40 h-40 flex items-center justify-center">
      <div
        class="w-full h-full rounded-full absolute border-8 border-transparent border-t-slate-500 border-r-pink-500 border-b-blue-500 border-l-purple-500 animate-spin"
      ></div>
    </div>
  </div>
  <div class="dark:text-white flex flex-col xl:flex-row items-center justify-center h-dvh w-dvw gap-4" v-else-if="errorMessage">
    <h1 class="text-lg sm:text-2xl w-1/2">{{ errorMessage }}</h1>
    <ErrorImage />
  </div>
  <div v-else="images" class="flex flex-col items-center mt-3">
    <div
      v-for="(item, index) in images.originals"
      :key="index"
      class="grid grid-cols-1 lg:grid-cols-2 gap-1 w-4/6"
    >
      <time class="lg:col-span-2 text-center">{{
        convertEpochTime(item.fileName.split('-')[0])
      }}</time>
      <ImagePreview
        class="lg:mr-2"
        :image-url="`data:${item.mimetype};base64,${item.blob}`"
        alt-text="item.fileName"
      />
      <ImagePreview
        class="lg:ml-2"
        :image-url="`data:${images.filtered[index].mimetype};base64,${images.filtered[index].blob}`"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import ImagePreview from './ImagePreview.vue'
import ErrorImage from './ErrorImage.vue'

const start = ref(0)
const end = ref(10)

const images = ref({})
const originalImages = ref({})
const filteredImages = ref({})
const hasMore = ref(null)
const loading = ref(true)
const errorMessage = ref(null)

async function getImages(start, end) {
  try {
    const response = await fetch('http://localhost:3000/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        start: start,
        end: end,
      },
    })
    if (!response.ok) {
      const message = await response.json()
      errorMessage.value = message.error
      return
    }
    const data = await response.json()
    console.log(data)

    images.value = data
  } catch (error) {
    errorMessage.value = 'Network error'
    console.log('Fetch error:', error)
  } finally {
    loading.value = false
  }
}

function convertEpochTime(epoch) {
  let date = new Date(parseInt(epoch))
  console.log(date.toLocaleDateString())
  return date.toLocaleString()
}

onMounted(() => {
  getImages(start.value, end.value)
})
</script>
