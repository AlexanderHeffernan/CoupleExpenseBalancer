<script setup>
import { ref } from 'vue';
import { partnerAccounts } from '../utils/partneringAccounts.js';
import { logout } from '../utils/userAuth.js';
import { isAccountPageOpen, toggleAccountPage } from '../utils/navigation.js';

// Handle partner account settings
const partnerAccountEmail = ref('');

function handleSetPartnerAccount() {
    partnerAccounts(partnerAccountEmail.value);
}

</script>

<template>
    <div class="fixed top-0 right-0 z-50 rounded-b-[40px] overflow-hidden transition-all duration-500" :class="isAccountPageOpen ? 'w-screen h-screen' : 'w-0 h-0'">
        <div class="absolute top-0 right-0 w-screen h-screen pt-14 bg-accent">
            <p>Account Page</p>
            <button @click="toggleAccountPage()" class="pt-14 absolute right-0 top-0 transition-transform ease rounded-t-3xl w-20 flex justify-center items-center">
                <svg class="w-9 h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path class="fill-text" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            </button>

            <form class="flex flex-col items-start h-28"  @submit.prevent="handleSetPartnerAccount">
                <h2>Set Partner Account</h2>
                <input type="email" v-model="partnerAccountEmail" placeholder="Email" required>
                <button type="submit">Set</button>
            </form>

            <button @click="logout">Sign out</button>
        </div>
    </div>
</template>