<template>
  <div v-if="imageUrl" class="relative space-y-2">
    <img
      :src="imageUrl"
      :alt="altText"
      class="w-full h-64 object-contain rounded-xl bg-gray-50 dark:bg-slate-900"
    />
    <div class="w-full my-1.5 sm:my-3 flex flex-col sm:flex-row items-center justify-center gap-4">
      <slot></slot>
    </div>
  </div>

  <div
    v-else-if="uploadArea"
    class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-400 hover:bg-gray-50 transition-all cursor-pointer"
  >
    <UploadArea />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import UploadArea from './UploadArea.vue'

defineProps({
  imageUrl: {
    type: String,
    default: '',
  },
  altText: {
    type: String,
    default: 'Image',
  },
  uploadArea: {
    type: Boolean,
    default: false,
  },
})
</script>
