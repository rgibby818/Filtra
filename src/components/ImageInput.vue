<template>
  <form @submit.prevent="submitForm" class="w-full max-w-3xl mx-auto space-y-4">
    <div class="relative">
      <input
        ref="inputFile"
        type="file"
        accept="image/*"
        @change="handleFileSelect"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div v-if="selectedImage" class="relative ">
        <img
          :src="selectedImage"
          alt="Image you have picked for editing"
          class="w-full h-64 object-contain rounded-xl bg-gray-50"
        />
        <div class="w-full sm:my-3  flex flex-col sm:flex-row items-center justify-center gap-4">
        <MyButton buttonText="Delete Image" @click="removeImage" />
        <DropDown selectName="Select Filter" />
        <MyButton buttonText="Apply Filter" @click="applyFilter" />
        </div>
      </div>

      <div
        v-else
        class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-400 hover:bg-gray-50 transition-all cursor-pointer"
      >
        <div class="text-gray-500">
          <svg class="mx-auto w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <p class="text-lg">Click to upload image</p>
          <p class="text-sm text-gray-400 mt-1">JPG, PNG or GIF</p>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import MyButton from '@/components/MyButton.vue';
import DropDown from './DropDown.vue';

const selectedImage = ref(null)

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

function removeImage(event) {
  selectedImage.value = null
}
</script>
