<script setup>
import { transactions } from '../utils/transactions.js';

function convertDate(date) {
    if (!(date instanceof Date)) { date = new Date(date); }
    if (!date) { return ' '; }
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
}

function convertAmount(amount) {
    if (!amount) { return ' '; }
    return "$" + amount.toFixed(2);
}

</script>

<template>
    <div class="shadow-xl bg-widget w-[80%] h-64 mt-5 p-5 rounded-2xl">
        <h2 class="text-text text-2xl font-bold mb-3">Expenses log:</h2>
        <div class="overflow-y-auto h-[192px] pr-4">
            <div v-for="transaction in transactions" :key="transaction.id">
                <div class="rounded-xl p-2 mb-2 flex items-center" :class="{ 'bg-primary': transaction.user_id === 1, 'bg-secondary': transaction.user_id === 2 }">
                    <div class="mr-auto">
                        <p class="font-bold text-md">{{ transaction.description }}</p>
                        <p class="text-sm font-light">{{ convertDate(transaction.date) }}</p>
                    </div>
                    <p class="font-bold">{{ convertAmount(transaction.amount) }}</p>
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