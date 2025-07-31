<template>
  <input
    ref="inputFile"
    type="file"
    accept="image/*"
    @change="onFileChange"
    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
  />
</template>

<script setup>
const emit = defineEmits(['change'])

function onFileChange(event) {
  const file = event.target.files[0]
  if (!file) {
    emit('change', { error: 'no File selected' })
    return
  }
  if (!file.type.startsWith('image/')) {
    emit('change', { error: 'File is not an Image' })
    return
  }
  const imageURL = URL.createObjectURL(file)
  emit('change', { file, url: imageURL })
}
</script>
