<template>
  <form @submit.prevent="submitForm" ref="uploadForm" class="w-full max-w-3xl mx-auto space-y-4">
    <div class="relative">
      <input
        ref="inputFile"
        type="file"
        accept="image/*"
        @change="handleFileSelect"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div v-if="selectedImage" class="relative">
        <img
          :src="selectedImage"
          alt="Image you have picked for editing"
          class="w-full h-64 object-contain rounded-xl bg-gray-50 dark:bg-gray-700"
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
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';

import MyButton from '@/components/MyButton.vue';
import DropDown from './DropDown.vue';
import UploadArea from './UploadArea.vue';

const selectedImage = ref(null) // Will be a blobURL
const filter = ref(null);
const submitButton = ref(null)
const uploadForm = ref(null);

function handleFileSelect(event) {
    const file = event.target.files[0]
    if(!file) {
        alert("File Error. Please try again.")
    }
    if (file.type.startsWith('image/')) {
        selectedImage.value = URL.createObjectURL(event.target.files[0])

    } else {
        alert("File is not an Image");
    }
}

async function blobURLToFile(blobURL, filename) {
  try {
    const response = await fetch(blobURL);
    const blob = await response.blob();
    const file = new File([blob], filename, {type: blob.type });
    return file
  } catch (error) {
    console.log("Error Fetching BlobURL", error);
  }
}

function removeImage(event) {
  selectedImage.value = null
  uploadForm.value.reset();
}

const applyFilter = async () => {
  if(!selectedImage.value || !filter.value) {
    alert("Error: No image or filter selected. Please upload an image and select a filter before submitting");
  }
  const formData = new FormData();
  formData.append('image', await blobURLToFile(selectedImage.value, "img"));
  formData.append('option', filter.value);

  try {
    const response = await axios.post('http://localhost:3000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if(response.status > 299 || response.status < 200) {
      console.log("POST failed with status: ", response.status);
    }

  } catch (error) {
    console.log("Error uploading Image: ", error);
  }
}
</script>
