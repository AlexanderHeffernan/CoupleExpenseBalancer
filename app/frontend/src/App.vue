<script setup>
import { ref, onMounted, watch } from 'vue'
import HomePage from './pages/HomePage.vue';
import AddPage from './pages/AddPage.vue';
import BalancePage from './pages/BalancePage.vue';
import { transactions, getUserDeficit, getBalance, handleAddTransaction, handleBalanceConfirmed } from './utils/transactions.js';

// Handle page navigation
let currentPage = ref('home');
function changePage(page) { currentPage.value = page; }

// Load transactions from local storage
onMounted(() => {
    transactions.value = JSON.parse(localStorage.getItem('transactions')) || [];
});

// Save transactions to local storage
watch(transactions, newVal => {
    localStorage.setItem('transactions', JSON.stringify(newVal));
}, { deep: true });

</script>

<template>
    <!-- App container -->
    <div class="w-screen h-screen bg-red-500">
        <!-- Current page view-->
        <div class="w-full h-[calc(100%-64px)] bg-green-500">
            <HomePage v-if="currentPage == 'home'" :u1deficit="getUserDeficit(1)" :u2deficit="getUserDeficit(2)" />
            <AddPage v-if="currentPage == 'add'" @addTransaction="handleAddTransaction" />
            <BalancePage v-if="currentPage == 'balance'" :balanceData="getBalance()" @balanceConfirmed="handleBalanceConfirmed" />
        </div>
        <!-- Navbar -->
        <div class="fixed bottom-0 left-0 w-full h-16 bg-white">
            <button @click="changePage('home')">Home</button>
            <button @click="changePage('add')">Add</button>
            <button @click="changePage('balance')">Balance</button>
        </div>
  </div>
</template>