<script setup>
import { ref, defineEmits } from 'vue';
const emit = defineEmits(['addTransaction'])

const description = ref('');
const user_id = ref();
const amount = ref();

const addTransaction = () => {
  const transactionData = {
    description: description.value,
    user_id: user_id.value,
    expense: true,
    amount: parseFloat(amount.value),
    balance: false
  };

  emit('addTransaction', transactionData);
};

</script>

<template>
    <div class="w-full h-full">
      <h1 class="pt-5 pb-5  w-full text-center text-text text-2xl font-bold">Add Transaction</h1>
      <input type="text" placeholder="Description" v-model="description" />
      <input type="number" placeholder="User" v-model="user_id" />
      <input type="number" placeholder="Amount" v-model="amount" />
      <button @click="addTransaction">Add</button>
    </div>
</template>

