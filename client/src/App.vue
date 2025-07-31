<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ImageUpload from './views/ImageUpload.vue'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <RouterView></RouterView>
</template>

<style scoped></style>
