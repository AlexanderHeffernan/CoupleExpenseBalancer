<script setup>
// Import utilities
import { isLoading } from '../utils/navigation.js';
</script>

<template>
    <!-- Loading screen -->
    <div class="flex items-center justify-center bg-white absolute z-[1000] w-[100vw] h-[100vh] opacity-0 transition-opacity ease duration-[0.5s] delay-[0.3s]"
         :class="{ 'opacity-100': isLoading, 'opacity-0': !isLoading }"
         :style="{ 'pointer-events': isLoading ? 'auto' : 'none' }">
        <div class="loader animate-spin rounded-full border-t-4 border-b-4 border-primary h-16 w-16"></div>
    </div>
</template>