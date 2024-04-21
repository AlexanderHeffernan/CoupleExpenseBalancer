<script setup>
import { ref, onMounted, watch } from 'vue'
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

function getBalance() {
    const u1expenses = getUserExpenses(1), u2expenses = getUserExpenses(2);
    const difference = Math.abs(u1expenses - u2expenses);
    if (u1expenses === u2expenses) { return { user: 0, amount: 0 }; }
    return { user: u1expenses > u2expenses ? 1 : 2, amount: difference/2 };
}

function handleAddExpense(expenseData) {
    expenses.value.push({ id: expenses.value.length + 1, description: expenseData.description, user: expenseData.user, amount: expenseData.amount, balance: false});
    localStorage.setItem('expenses', JSON.stringify(expenses.value));
}

function handleBalanceConfirmed() {
    const user = getBalance().user;
    const amount = getBalance().amount;
    handleAddExpense({ description: 'Balance', user: user, amount: amount });
    handleAddExpense({ description: 'Balance', user: user == 1 ? 2 : 1, amount: -amount });
}


onMounted(() => {
    expenses.value = JSON.parse(localStorage.getItem('expenses')) || [];
});

watch(expenses, newVal => {
    localStorage.setItem('expenses', JSON.stringify(newVal));
}, { deep: true });

</script>

<template>
    <!-- App container -->
    <div class="w-screen h-screen bg-red-500">
        <!-- Current page view-->
        <div class="w-full h-[calc(100%-64px)] bg-green-500">
            <HomePage v-if="currentPage == 'home'" :u1expense="getUserExpenses(1)" :u2expense="getUserExpenses(2)" />
            <AddPage v-if="currentPage == 'add'" @addExpense="handleAddExpense" />
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