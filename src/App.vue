<script setup>
  import { RouterView } from 'vue-router';
import Container from './components/container.vue';
import Header from './components/header.vue';
import RecipeModal from './components/recipe-modal.vue';
</script>

<template>
  <Header />

  <Container>
    <main>
      <RouterView />
    </main>
  </Container>
  <RecipeModal />
</template>

