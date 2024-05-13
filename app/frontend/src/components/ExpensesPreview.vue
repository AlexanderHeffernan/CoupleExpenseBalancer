<script setup>
import { ref, watchEffect } from 'vue';
// Import relevant utilities
import { transactions } from '../utils/transactions.js';
import { getUserData } from '../utils/userData.js';
import { changePage } from '../utils/navigation.js';

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

const timeFilter = ref('Today');
const timeFilters = ref(['Today', '1W', '1M', 'All']);

const filteredTransactions = ref([]);

watchEffect(() => {
    if (timeFilter.value === 'Today') {
        filteredTransactions.value = transactions.value.filter(transaction => {
            return transaction.date.toDateString() === new Date().toDateString();
        });
    } else if (timeFilter.value === '1W') {
        filteredTransactions.value = transactions.value.filter(transaction => {
            return transaction.date >= new Date(new Date().setDate(new Date().getDate() - 7));
        });
    } else if (timeFilter.value === '1M') {
        filteredTransactions.value = transactions.value.filter(transaction => {
            return transaction.date >= new Date(new Date().setMonth(new Date().getMonth() - 1));
        });
    } else {
        filteredTransactions.value = transactions.value;
    }
});
</script>

<template>
    <div class="shadow-2xl bg-widget w-[100%] max-h-[400px] min-h-[200px] flex-grow p-5 rounded-2xl flex flex-col self-end mt-auto">
        <div class="flex items-center">
            <h2 class="text-text text-xl font-bold mb-3 flex-grow">Expenses</h2>
            <button @click="changePage('add')" class="bg-primary flex justify-center p-3 rounded-3xl"><svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path class="fill-text" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></button>
        </div>
        <div class="flex items-center mb-5">
            <div v-for="(filter, index) in timeFilters" :key="index" @click="timeFilter = filter" class="cursor-pointer mr-4 rounded-xl px-5 py-1 transition-colors duration-300" :class="{ 'bg-primary': timeFilter === filter }">
                <p class="font-bold">{{ filter }}</p>
            </div>
        </div>
        <div class="overflow-y-auto flex-grow h-[192px] pr-4">
            <div v-for="transaction in filteredTransactions" :key="transaction.id">
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