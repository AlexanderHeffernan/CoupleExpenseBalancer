<script setup>
import { ref } from 'vue' //onMounted, watch
import HomePage from './pages/HomePage.vue';
import AddPage from './pages/AddPage.vue';
import BalancePage from './pages/BalancePage.vue';

let currentPage = ref('home');

function changePage(page) {
    currentPage.value = page;
}

</script>

<template>
    <!-- App container -->
    <div class="w-screen, h-screen bg-red-500">
        <!-- Current page view-->
        <div class="w-full, h-[calc(100%-64px)] bg-green-500">
            <HomePage v-if="currentPage == 'home'" />
            <AddPage v-if="currentPage == 'add'" />
            <BalancePage v-if="currentPage == 'balance'" />
        </div>
        <!-- Navbar -->
        <div class="fixed bottom-0 left-0 w-full h-16 bg-white">
            <button @click="changePage('home')">Home</button>
            <button @click="changePage('add')">Add</button>
            <button @click="changePage('balance')">Balance</button>
        </div>
  </div>
</template>