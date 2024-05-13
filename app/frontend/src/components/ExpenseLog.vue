<script setup>
import { ref } from 'vue';
// Import relevant utilities
import { transactions } from '../utils/transactions.js';
import { getUserData } from '../utils/userData.js';

/**
 * Function to convert date to a readable format (dd/mm/yyyy)
 * 
 * @param {Date} date - The date to be converted
 * @returns {String} - The date in the format dd/mm/yyyy
 */
function convertDate(date) {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
}

const originalUserId = ref('');
const secondaryUserId = ref('');


if (getUserData('original')) {
    originalUserId.value = getUserData('uid');
    secondaryUserId.value = getUserData('partnerUid');
} else {
    originalUserId.value = getUserData('partnerUid');
    secondaryUserId.value = getUserData('uid');
}
</script>

<template>
    <div class="shadow-xl bg-widget w-[80%] h-64 mt-5 p-5 rounded-2xl">
        <h2 class="text-text text-2xl font-bold mb-3">Expenses log:</h2>
        <div class="overflow-y-auto h-[192px] pr-4">
            <div v-for="transaction in transactions" :key="transaction.id">
                <div class="rounded-xl p-2 mb-2 flex items-center" :class="{ 'bg-primary': transaction.user_id === originalUserId, 'bg-secondary': transaction.user_id === secondaryUserId }">
                    <div class="mr-auto">
                        <p class="font-bold text-md">{{ transaction.description }}</p>
                        <p class="text-sm font-light">{{ convertDate(transaction.date) }}</p>
                    </div>
                    <p class="font-bold">${{ transaction.amount.toFixed(2) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
div::-webkit-scrollbar {
    width: 0.6em;
}
 
div::-webkit-scrollbar-track {
    background-color: rgba(0,0,0,0);
    border-radius: 20px;
}
 
div::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 20px;
}
</style>