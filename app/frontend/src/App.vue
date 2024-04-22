<script setup>
import { ref, onMounted } from 'vue'
import HomePage from './pages/HomePage.vue';
import AddPage from './pages/AddPage.vue';
import BalancePage from './pages/BalancePage.vue';
import { transactions, getUserDeficit, getBalanceData, addTransaction, balanceConfirmed } from './utils/transactions.js';

// Handle page navigation
let currentPage = ref('home');
function getPage() { return currentPage.value; }
function changePage(page) { currentPage.value = page; }

function handleAddTransaction(transactionData) {
    changePage('home');
    addTransaction(transactionData);
}

function handleBalanceConfirmed() {
    changePage('home');
    balanceConfirmed();
}

// Load transactions from local storage
onMounted(() => {
    transactions.value = JSON.parse(localStorage.getItem('transactions'));
});

</script>

<template>
    <!-- App container -->
    <div class="app w-screen h-screen bg-background overflow-y-hidden">
        <!-- Current page view-->
        <div class="w-full h-[calc(100%-64px)] overflow-y-auto">
            <HomePage v-if="currentPage == 'home'" :u1deficit="getUserDeficit(1)" :u2deficit="getUserDeficit(2)" :transactions="transactions" />
            <AddPage v-if="currentPage == 'add'" @addTransaction="handleAddTransaction" />
            <BalancePage v-if="currentPage == 'balance'" :balanceData="getBalanceData()" @balanceConfirmed="handleBalanceConfirmed" />
        </div>
        <!-- Navbar -->
        <div class="navbar flex fixed bottom-0 left-0 w-full h-20 bg-accent rounded-t-3xl">
            <!-- Home button -->
            <button class="transition-transform ease relative rounded-t-3xl w-20 flex justify-center items-center" :class="getPage() === 'home' ? '-translate-y-5 bg-primary' : ''" @click="changePage('home')">
                <svg class="w-9 h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path :class="getPage() === 'home' ? 'bottom-5 fill-white' : 'fill-primary'" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
            </button>
            <!-- Add button-->
            <button class="transition-transform ease relative rounded-t-3xl w-20 flex justify-center items-center" :class="getPage() === 'add' ? '-translate-y-5 bg-primary' : ''" @click="changePage('add')">
                <svg class="w-9 h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path :class="getPage() === 'add' ? 'bottom-5 fill-white' : 'fill-primary'" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
            </button>
            <!-- Balance button -->
            <button class="balance-nav-button transition-transform ease relative rounded-t-3xl w-20 flex justify-center items-center" :class="getPage() === 'balance' ? '-translate-y-5 bg-primary' : ''" @click="changePage('balance')">
                <svg class="w-9 h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path :class="getPage() === 'balance' ? 'bottom-5 fill-white' : 'fill-primary'" d="M384 32H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H398.4c-5.2 25.8-22.9 47.1-46.4 57.3V448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 128c-17.7 0-32-14.3-32-32s14.3-32 32-32H288V153.3c-23.5-10.3-41.2-31.6-46.4-57.3H128c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zm55.6 288H584.4L512 195.8 439.6 320zM512 416c-62.9 0-115.2-34-126-78.9c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C627.2 382 574.9 416 512 416zM126.8 195.8L54.4 320H199.3L126.8 195.8zM.9 337.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C242 382 189.7 416 126.8 416S11.7 382 .9 337.1z"/></svg>
            </button>
        </div>
  </div>
</template>

<style>

.navbar {
    justify-content: center;
    gap: 50px;
    padding: 0 10vw;
}

@media (max-width: 640px) {
    .navbar {
        justify-content: space-between;
        padding: 0 10vw;
    }
}
</style>