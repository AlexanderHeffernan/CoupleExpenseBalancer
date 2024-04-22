<script setup>
import { ref, defineEmits } from 'vue';
import PageHeader from '../components/PageHeader.vue';

const emit = defineEmits(['addTransaction'])

const description = ref('');
const user_id = ref();
const amount = ref();

const addTransaction = () => {
  if (!description.value || !user_id.value || !amount.value) {
    alert('Please fill in all fields');
    return;
  }
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
    <div class="w-full h-full flex flex-col items-center">
      <PageHeader pageHeading="Add Expense" />
      <div class="flex flex-col items-center shadow-xl p-5 rounded-2xl w-[80%] bg-widget h-[300px]">
        <!-- Description input -->
        <label class="text-left w-full font-bold mb-2">Description</label>
        <input class="w-full rounded-lg p-2 mb-2" type="text" placeholder="Lunch at McDonalds" v-model="description" />
        <div class="flex gap-5 mb-10">
          <div>
            <!-- User ID input -->
            <label class="text-left w-full font-bold">User_ID</label>
            <input class="w-full rounded-lg mt-2 p-2" type="number" placeholder="1" v-model="user_id" />
          </div>
          <div>
            <!-- Amount input -->
            <label class="text-left w-full font-bold">Amount</label>
            <input class="w-full rounded-lg mt-2 p-2" type="number" placeholder="100" v-model="amount" />
          </div>
        </div>
        <button class="text-lg bg-primary pl-10 pr-10 pt-2 pb-2 rounded-xl text-white font-semibold" @click="addTransaction">Add</button>  
      </div>
    </div>
</template>

