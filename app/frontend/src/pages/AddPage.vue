<script setup>
import { ref } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import { username, partnerUsername, getUserData } from '../utils/userAccount.js';
import { changePage } from '../utils/navigation.js';
import { addTransaction } from '../utils/transactions.js';

const users = ref([username.value, partnerUsername.value]);

async function getIDFromNickName(nickname) {
  if (users.value[0] === nickname) {
    return await getUserData('uid');
  } else {
    return await getUserData('partnerUid');
  }
}

const description = ref('');
const user_name = ref(username.value);
const amount = ref();

const handleAddTransaction = async () => {
  if (!description.value || !amount.value) {
    alert('Please fill in all fields');
    return;
  }
  const transactionData = {
    description: description.value,
    user_id: await getIDFromNickName(user_name.value),
    expense: true,
    amount: parseFloat(amount.value),
    balance: false
  };
  console.log(transactionData.user_id);
  changePage('home');
  addTransaction(transactionData);
};

</script>

<template>
    <PageHeader pageHeading="Add Expense" />
    <div class="w-full h-[calc(100%-90px)] flex flex-col justify-center items-center">
      <div class="flex flex-col items-center shadow-xl p-5 rounded-2xl w-[80%] bg-widget h-[300px]">
        <!-- Description input -->
        <label class="text-left w-full font-bold mb-2">Description</label>
        <input class="w-full rounded-lg p-2 mb-2" type="text" placeholder="Lunch at McDonalds" v-model="description" />
        <div class="flex gap-5 mb-10">
          <div>
            <!-- User ID input -->
            <label class="text-left w-full font-bold">Name</label>
            <select class="w-full rounded-lg mt-2 p-2" v-model="user_name">
              <option v-for="user in users" :key="user" :value="user">{{ user }}</option>
            </select>
          </div>
          <div>
            <!-- Amount input -->
            <label class="text-left w-full font-bold">Amount</label>
            <input class="w-full rounded-lg mt-2 p-2" type="number" placeholder="100" v-model="amount" />
          </div>
        </div>
        <button class="text-lg bg-primary pl-10 pr-10 pt-2 pb-2 rounded-xl text-white font-semibold" @click="handleAddTransaction">Add</button>  
      </div>
    </div>
</template>

