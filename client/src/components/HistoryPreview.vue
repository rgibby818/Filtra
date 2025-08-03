<template>
  <div v-if="loading" class="flex flex-col items-center justify-center h-dvh w-dvw">
    <Loading />
  </div>
  <div v-else-if="errorMessage" class="dark:text-white flex flex-col xl:flex-row items-center justify-center h-dvh w-dvw gap-4" >
    <h1 class="text-lg sm:text-2xl w-1/2">{{ errorMessage }}</h1>
    <DogImage />
  </div>
  <div v-else-if="Object.keys(images.filtered).length > 0" class="flex flex-col items-center mt-3">
    <div
      v-for="(item, index) in images.originals"
      :key="index"
      class="grid grid-cols-1 lg:grid-cols-2 gap-1 w-4/6"
    >
      <time class="lg:col-span-2 text-center dark:text-white">{{
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
  <div v-else class="dark:text-white flex flex-col xl:flex-row items-center justify-center h-dvh w-dvw gap-1">
    <h1 class=" text-lg sm:text-2xl w-auto m-2 text-center">No images to show</h1>
    <DogImage />
  </div>
  <div v-if="hasMore" class="flex justify-center mb-5">
    <MyButton button-text="Load More" @click="getImages(start,end)" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import ImagePreview from './ImagePreview.vue'
import DogImage from './DogImage.vue' 
import Loading from './Loading.vue'
import MyButton from './MyButton.vue'

const start = ref(0)
const end = ref(10)

const images = ref({})
const originalImages = ref({})
const filteredImages = ref({})
const hasMore = ref(null)
const loading = ref(true)
const errorMessage = ref(null)

async function getImages(startIndex, endIndex) {
  try {
    const response = await fetch('http://localhost:3000/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'start': startIndex,
        'end': endIndex,
      },
    })
    if (!response.ok) {
      const message = await response.json()
      errorMessage.value = message.error
      return
    }
    const data = await response.json()
    if(Object.keys(images.value).length === 0) {
      images.value = data
      hasMore.value = data.hasMore;
    } else {
      images.value.originals.push(...data.originals);
      images.value.filtered.push(...data.filtered);
      hasMore.value = data.hasMore
    }
  } catch (error) {
    errorMessage.value = 'Network error'
    console.log('Fetch error:', error)
  } finally {
    loading.value = false
    if (hasMore.value) {
      start.value = end.value
      end.value = end.value + 10
    }
    console.log(images.value);
  }
}

function convertEpochTime(epoch) {
  let date = new Date(parseInt(epoch))
  return date.toLocaleString()
}

onMounted(() => {
  getImages(start.value, end.value)
})
</script>
