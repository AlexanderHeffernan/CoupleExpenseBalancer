<script setup>
import { defineProps } from 'vue';

defineProps(['isLoading']);

</script>

<template>
    <div class="loadingScreen flex items-center justify-center bg-white"
         :class="{ 'fade-in': isLoading, 'fade-out': !isLoading }"
         :style="{ 'pointer-events': isLoading ? 'auto' : 'none' }">
        <div class="loader animate-spin rounded-full border-t-4 border-b-4 border-primary h-16 w-16"></div>
    </div>
</template>

<style>
    .loadingScreen {
        position: absolute;
        z-index: 1000;
        width: 100vw;
        height: 100vh;
        transition: opacity 0.5s ease 0.3s; /* Add transition for opacity */
        opacity: 0; /* Initially hide loading screen */
    }

    /* Define fade-in and fade-out animations */
    .fade-in {
        opacity: 1;
    }
    
    .fade-out {
        opacity: 0;
    }
</style>