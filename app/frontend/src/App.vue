<script setup>
import { ref, onMounted } from 'vue' //onMounted, watch
import HomePage from './pages/HomePage.vue';
import AddPage from './pages/AddPage.vue';
import BalancePage from './pages/BalancePage.vue';

let currentPage = ref('home');

function changePage(page) {
    currentPage.value = page;
}

const expenses = ref([]);

function getUserExpenses(user) {
    return expenses.value.reduce((total, expense) => {
        return expense.user === user ? total + expense.amount : total;
    }, 0);
}


onMounted(() => {
    expenses.value = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.value.push({ id: expenses.value.length + 1, description: 'Test', user: 1, amount: 100, balance: false });
});
</script>

<template>
    <!-- App container -->
    <div class="w-screen h-screen bg-red-500">
        <!-- Current page view-->
        <div class="w-full h-[calc(100%-64px)] bg-green-500">
            <HomePage v-if="currentPage == 'home'" :u1expense="getUserExpenses(1)" :u2expense="getUserExpenses(2)" />
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