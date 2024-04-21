<script setup>
import { ref, defineEmits } from 'vue';
const emit = defineEmits(['addExpense'])

const description = ref('');
const user = ref();
const amount = ref();

const addExpense = () => {
  const expenseData = {
    description: description.value,
    user: user.value,
    amount: parseFloat(amount.value)
  };

  emit('addExpense', expenseData);
};

</script>

<template>
    <div class="w-full h-full">
      <p>Add page</p>
      <input type="text" placeholder="Description" v-model="description" />
      <input type="number" placeholder="User" v-model="user" />
      <input type="number" placeholder="Amount" v-model="amount" />
      <button @click="addExpense">Add</button>
    </div>
</template>

