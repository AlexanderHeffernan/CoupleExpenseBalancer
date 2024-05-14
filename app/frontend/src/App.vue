<script setup>
// Import pages
import HomePage from './pages/HomePage.vue';
import AddPage from './pages/AddPage.vue';
import BalancePage from './pages/BalancePage.vue';
import LogIn from './pages/LogIn.vue';
import SignUp from './pages/SignUp.vue';
import AccountPage from './pages/AccountPage.vue';
// Import components
import NavBar from './components/NavBar.vue';
import LoadingScreen from './components/LoadingScreen.vue';
// Import utilities
import { isLoggedIn } from './utils/userAuth.js';
import { currentPage } from './utils/navigation.js';
</script>

<template>
    <div class="app w-screen h-screen bg-background overflow-y-hidden touch-none">
        <LoadingScreen />
        <div v-if="!isLoggedIn">
            <LogIn v-if="currentPage == 'login'"/>
            <SignUp v-if="currentPage == 'signup'"/>
        </div>
        <div v-else class="w-full h-[calc(100%-136px)] standalone:mt-[72px] touch-none overflow-hidden">
            <HomePage v-if="currentPage == 'home'" />
            <AddPage v-if="currentPage == 'add'" />
            <BalancePage v-if="currentPage == 'balance'" />
            <AccountPage />
        </div>
        <NavBar v-if="isLoggedIn" />
    </div>
</template>