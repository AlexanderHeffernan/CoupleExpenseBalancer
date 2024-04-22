<script setup>
import { defineProps } from 'vue';

defineProps(['transactions']);

</script>

<template>
    <div class="shadow-xl bg-widget w-[80%] h-64 mt-5 p-5 rounded-2xl">
        <h2 class="text-text text-2xl font-bold mb-3">Expenses log:</h2>
        <div class="overflow-y-auto h-[190px]">
            <table class="overflow-y-auto w-full h-full">
                <thead>
                    <tr>
                        <th class="text-left">User_ID</th>
                        <th class="text-left">Description</th>
                        <th class="text-left">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaction in transactions" :key="transaction.id">
                        <td>{{ transaction.user_id }}</td>
                        <td>{{ transaction.description }}</td>
                        <td>{{ transaction.amount }}</td>
                    </tr>
                </tbody>
            </table>
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
    background-color: #090A08;
    border-radius: 20px;
}
</style>