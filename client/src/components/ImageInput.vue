<template>
  <form @submit.prevent="submitForm" ref="uploadForm" class="w-full max-w-3xl mx-auto space-y-4">
    <div class="relative">
      <FileInput @change="handleFileSelect" />

      <div v-if="selectedImage" class="relative">
        <img
          :src="selectedImage"
          alt="Image you have picked for editing"
          class="w-full h-64 object-contain rounded-xl bg-gray-50 dark:bg-slate-900"
        />
        <div
          class="w-full my-1.5 sm:my-3 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MyButton button-text="Delete Image" @click="removeImage" />
          <DropDown v-model="filter" />
          <MyButton v-if="filter" type="submit" button-text="Apply Filter" @click="applyFilter" />
          <MyButton v-else type="submit" button-text="Apply Filter" :is-disabled="true" />
        </div>
      </div>

      <div
        v-else
        class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-400 hover:bg-gray-50 transition-all cursor-pointer"
      >
        <UploadArea />
      </div>
    </div>
  </form>
  <div 
  v-if="filteredImageURL"
  class="w-full max-w-3xl mx-auto space-y-4">
    <img 
    :src="filteredImageURL" 
    alt="Filtered Image"
    class="w-full h-64 object-contain rounded-xl bg-gray-50 dark:bg-slate-900" />
  </div>
</template>

<script setup>
import MyButton from '@/components/MyButton.vue'
import DropDown from './DropDown.vue'
import UploadArea from './UploadArea.vue'
import FileInput from './FileInput.vue'
import { ref, reactive } from 'vue'
import axios from 'axios'

const selectedImage = ref(null) // Will be a blobURL
const filter = ref(null)
const submitButton = ref(null)
const uploadForm = ref(null)
const filteredImageURL = ref(null);

function handleFileSelect(func) {
  if (func.error) {
    alert(func.error)
  }
  selectedImage.value = func.url
}

async function blobURLToFile(blobURL, filename) {
  try {
    const response = await fetch(blobURL)
    const blob = await response.blob()
    const file = new File([blob], filename, { type: blob.type })
    return file
  } catch (error) {
    console.log('Error Fetching BlobURL', error)
  }
}

function removeImage(event) {
  selectedImage.value = null
  uploadForm.value.reset()
}

const applyFilter = async () => {
  if (!selectedImage.value || !filter.value) {
    alert(
      'Error: No image or filter selected. Please upload an image and select a filter before submitting',
    )
  }
  const formData = new FormData()
  formData.append('image', await blobURLToFile(selectedImage.value, 'img.png'))
  formData.append('option', filter.value)

  try {
    const response = await axios.post('http://localhost:3000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
    })

    const imageBlob = response.data
    const imageURL = URL.createObjectURL(imageBlob);
    filteredImageURL.value = imageURL;
  } catch (error) {
    console.log('Error uploading Image:', error.message)
  }
}
</script>
