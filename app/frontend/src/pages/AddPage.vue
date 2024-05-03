<script setup>
import { ref, defineEmits, onMounted } from 'vue';
import { db, auth } from '../firebase/init.js';
import { getDoc, doc } from 'firebase/firestore';
import PageHeader from '../components/PageHeader.vue';

const emit = defineEmits(['addTransaction', 'openAccountPage'])

const users = ref([]);

async function getUserNickNames() {
  const userDoc = await getDoc(doc(db, `users/${auth.currentUser.uid}`));
  const userData = userDoc.data();

  if (userData.partnerUid) {
    const partnerDoc = await getDoc(doc(db, `users/${userData.partnerUid}`));
    const partnerData = partnerDoc.data();
    return [userData.nickname, partnerData.nickname];
  }
  return [userData.nickname];
}

function getIDFromNickName(nickname) {
  if (nickname == 'Alex') { return 2; }
  return 1;
}

const description = ref('');
const user_name = ref();
const amount = ref();

const addTransaction = () => {
  if (!description.value || !amount.value) {
    alert('Please fill in all fields');
    return;
  }
  const transactionData = {
    description: description.value,
    user_id: getIDFromNickName("Alex"),
    expense: true,
    amount: parseFloat(amount.value),
    balance: false
  };

  emit('addTransaction', transactionData);
};

onMounted(async () => {
  users.value = await getUserNickNames();
  user_name.value = users.value[0];
});

</script>

<template>
    <PageHeader pageHeading="Add Expense" @openAccountPage="emit('openAccountPage')" />
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
        <button class="text-lg bg-primary pl-10 pr-10 pt-2 pb-2 rounded-xl text-white font-semibold" @click="addTransaction">Add</button>  
      </div>
    </div>
</template>

