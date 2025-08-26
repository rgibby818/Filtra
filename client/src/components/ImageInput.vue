<template>
  <form
    @submit.prevent="submitForm"
    ref="uploadForm"
    class="w-full max-w-3xl mx-auto my-7 sm:my-10 space-y-4"
    :id="uploadForm"
  >
    <div class="relative">
      <FileInput @change="handleFileSelect" />
      <ImagePreview :image-url="selectedImage" :upload-area="true">
        <MyButton button-text="Delete Image" @click="removeImage" />
        <DropDown v-model="filter" />
        <MyButton
          v-if="filter"
          type="submit"
          button-text="Apply Filter"
          @click="applyFilter"
          :is-disabled="isDisabled"
        />
        <MyButton v-else type="submit" button-text="Apply Filter" :is-disabled="true" />
      </ImagePreview>
    </div>
  </form>
  <div v-if="loading" class="flex w-full max-w-3xl mx-auto space-y-4 items-center justify-center">
    <Loading />
  </div>
  <div
    v-else-if="filteredImage.url"
    :class="isLoaded ? 'opacity-100' : 'opacity-0'"
    class="w-full max-w-3xl mx-auto space-y-4 ease-in-out transition-opacity duration-500"
  >
    <ImagePreview v-if="filteredImage.url" :imageUrl="filteredImage.url" alt-text="Filtered Image">
      <MyButton button-text="Download" @click="downloadImage" custom-classes="sm:w-full" />
    </ImagePreview>
  </div>
  <div v-if="errorMessage" class="flex dark:text-white text-xl font-semibold justify-center">
    {{ errorMessage }}
  </div>
</template>

<script setup>
import MyButton from './MyButton.vue'
import DropDown from './DropDown.vue'
import FileInput from './FileInput.vue'
import Loading from './Loading.vue'
import ImagePreview from './ImagePreview.vue'
import { ref, reactive } from 'vue'
import axios from 'axios'

const loading = ref(false)
const isLoaded = ref(false)
const isDisabled = ref(false)
const selectedImage = ref(null) // Will be a blobURL
const selectedImageName = ref(null)
const filter = ref(null)
const uploadForm = ref(null)
const filteredImage = reactive({
  url: null,
  name: null,
})
const errorMessage = ref(null)

async function handleFileSelect(emit) {
  if (emit.error) {
    alert(emit.error)
    selectedImage.value = null
    selectedImageName.value = null
    return
  }
  selectedImage.value = emit.url
  selectedImageName.value = emit.file.name
  return
}

const removeImage = () => {
  localStorage.clear()
  selectedImage.value = null
  if (filteredImage) {
    filteredImage.url = ''
    filteredImage.name = ''
  }
  uploadForm.value.reset()
  filter.value = null
}

const applyFilter = async () => {
  isDisabled.value = true
  errorMessage.value = null
  if (!selectedImage.value || !filter.value) {
    alert(
      'Error: No image or filter selected. Please upload an image and select a filter before submitting',
    )
  }
  loading.value = true
  isLoaded.value = false
  const formData = new FormData()
  const file = await blobURLToFile(selectedImage.value, selectedImageName.value)
  if (!file) {
    alert('Invalid image. Please re-upload')
    return
  }

  formData.append('image', file)
  formData.append('option', filter.value)

  try {
    const response = await axios.post('http://localhost:3000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    const base64 = response.data.image
    filteredImage.url = `data:${response.data.mimetype};base64,${base64}`
    filteredImage.name = response.data.name
  } catch (error) {
    if(error.message === "Network Error") {
      errorMessage.value = "No internet. Please reconnect and try again"
    } else {
      console.error("Error Processing Image")
      console.log(error)
      errorMessage.value = error.response.data.message
      console.log('Error uploading Image:', error.message)
    }
  } finally {
    loading.value = false
    setTimeout(() => {
      isLoaded.value = true
      isDisabled.value = false
    }, 100)
  }
}

const downloadImage = () => {
  const link = document.createElement('a')
  link.href = filteredImage.url
  link.download = filteredImage.name
  link.click()
}

const blobURLToFile = async (blobURL, filename) => {
  if (!blobURL.startsWith('blob:')) {
    console.warn('Not a valid blobURL:', blobURL)
    return null
  }
  try {
    const response = await fetch(blobURL)
    const blob = await response.blob()
    const file = new File([blob], filename, { type: blob.type })
    return file
  } catch (error) {
    console.warn('Error Fetching BlobURL', error)
    return null
  }
}
</script>
