<script setup>

import HomePage from './pages/HomePage.vue';
import AddPage from './pages/AddPage.vue';
import BalancePage from './pages/BalancePage.vue';
import SignInUp from './pages/SignInUp.vue';
import AccountPage from './pages/AccountPage.vue';
import LoadingScreen from './pages/LoadingScreen.vue';
import NavBar from './components/NavBar.vue';
//import { addTransaction, balanceConfirmed } from './utils/transactions.js';
import { isLoggedIn } from './utils/userAccount.js';
import { isLoading, currentPage } from './utils/navigation.js';

/*function handleBalanceConfirmed() {
    changePage('home');
    balanceConfirmed();
}*/

</script>

<template>
    <!-- Loading screen -->
    <LoadingScreen :isLoading="isLoading" />
    <!-- Sign in/up form -->
    <div v-if="!isLoggedIn">
        <SignInUp />
    </div>
    <!-- App container -->
    <div v-else class="app w-screen h-screen bg-background overflow-y-hidden">
        <!-- Current page view-->
        <div class="w-full h-[calc(100%-64px)] overflow-y-auto">
            <HomePage v-if="currentPage == 'home'" />
            <AddPage v-if="currentPage == 'add'" />
            <BalancePage v-if="currentPage == 'balance'" />
            <AccountPage />
        </div>
        <!-- Navbar -->
        <NavBar />
  </div>
</template>