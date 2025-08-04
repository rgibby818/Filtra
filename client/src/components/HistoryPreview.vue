<template>
  <div v-if="loading" class="flex flex-col items-center justify-center h-dvh w-dvw">
    <Loading />
  </div>
  <div
    v-else-if="errorMessage"
    class="dark:text-white flex flex-col xl:flex-row items-center justify-center h-dvh w-dvw gap-4"
  >
    <h1 class="text-lg sm:text-2xl w-1/2">{{ errorMessage }}</h1>
    <DogImage />
  </div>
  <div v-else-if="Object.keys(images.filtered).length > 0" class="flex flex-col items-center mt-3">
    <div
      v-for="(item, index) in images.originals"
      :key="index"
      class="grid grid-cols-1 gap-1 w-4/6"
    >
      <div class="flex flex-col sm:flex-row justify-between">
        <time class="text-center dark:text-white font-mono text-xs sm:text-base">{{
          convertEpochTime(item.fileName.split('-')[0])
        }}</time>
        <h3 class="text-center dark:text-white font-mono text-xs sm:text-base">
          Filter:
          {{ images.filtered[index].fileName.split('-').at(-1).split('.')[0].toUpperCase() }}
        </h3>
      </div>
      <div class="flex flex-col md:flex-row md:gap-2 justify-around">
      <ImagePreview
        class="lg:mr-2 w-full"
        :image-url="`data:${item.mimetype};base64,${item.blob}`"
        alt-text="item.fileName"
      />
      <ImagePreview
        class="lg:ml-2 w-full"
        :image-url="`data:${images.filtered[index].mimetype};base64,${images.filtered[index].blob}`"
      />
      </div>
    </div>
  </div>
  <div
    v-else
    class="dark:text-white flex flex-col xl:flex-row items-center justify-center h-dvh w-dvw gap-1"
  >
    <h1 class="text-lg sm:text-2xl w-auto m-2 text-center">No images to show</h1>
    <DogImage />
  </div>
  <div class="mb-5">
    <div v-if="hasMore" class="relative flex justify-center w-full">
    <MyButton :is-disabled="disableLoadMoreButton" :button-text="loadMoreButtonText" @click="getMoreImages(start, end)" />
    <Loading v-if="loadingAnimationButton" width="w-7 absolute right-10 top-1" height="h-7" text-size="hidden"/>
    </div>
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
const end = ref(5)

const images = ref({})
const hasMore = ref(null)
const disableLoadMoreButton = ref(false)
const loadingAnimationButton = ref(false)
const loading = ref(true)
const errorMessage = ref(null)
const loadMoreButtonText = ref('Load More')

async function getImages(startIndex, endIndex) {
  try {
    const response = await fetch('http://localhost:3000/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        start: startIndex,
        end: endIndex,
      },
    })
    if (!response.ok) {
      const message = await response.json()
      errorMessage.value = message.error
      return
    }
    const data = await response.json()
    if (Object.keys(images.value).length === 0) {
      images.value = data
      hasMore.value = data.hasMore
    } else {
      images.value.originals.push(...data.originals)
      images.value.filtered.push(...data.filtered)
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
  }
}

async function getMoreImages(start, end) {
  disableLoadMoreButton.value = true
  loadingAnimationButton.value = true
  await getImages(start, end)
  if (images.hasMore) {
  disableLoadMoreButton.value = false
  loadingAnimationButton.value = false
  } else {
    loadMoreButtonText.value = 'No More Images'
    loadingAnimationButton.value = false
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
