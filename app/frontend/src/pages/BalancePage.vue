<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { balanceData, balanceConfirmed } from '../utils/transactions.js';
import { changePage } from '../utils/navigation.js';
import PageHeader from '../components/PageHeader.vue';

const stage = ref(0);

function updateStage() {
    if (stage.value === 0) {
        stage.value = 1;
    } else {
        stage.value = 0;
        changePage('home');
        balanceConfirmed();
    }
}

function convertAmount(amount) {
    if (!amount) { return "$0.00"; }
    return "$" + amount.toFixed(2);
}

function changeBackground(exiting) {
    if (isBalanced()) {
        document.querySelector('.app').style.backgroundColor = 'white';
        document.querySelector('.balance-nav-button').style.border = 'none';
        return;
    }
    if (!exiting) {
        if ((stage.value === 0 && balanceData.value.user_id === 1)
            || (stage.value === 1 && balanceData.value.user_id === 2)) {
            document.querySelector('.app').style.backgroundColor = '#FF6B6B';
            document.querySelector('.balance-nav-button').style.border = '2px solid #FFCCCC';
        } else {
            document.querySelector('.app').style.backgroundColor = '#A9A9A9';
        }
    } else {
        document.querySelector('.app').style.backgroundColor = 'white';
        document.querySelector('.balance-nav-button').style.border = 'none';
    }
}

// Change background when entering and exiting the page, and when stage is changed
watch(stage, () => { changeBackground(false); });
onMounted(() => { changeBackground(false); });
onUnmounted(() => { changeBackground(true); });

function getWidgetColor() {
    if (stage.value === 0) {
        if (balanceData.value.user_id === 1) {
            return 'bg-accent';
        } else {
            return 'bg-widget';
        }
    } else {
        if (balanceData.value.user_id === 1) {
            return 'bg-widget';
        } else {
            return 'bg-accent';
        }
    }
}

function isBalanced() {
    return balanceData.value.u1deficit === balanceData.value.u2deficit;
}

</script>

<template>
    <PageHeader pageHeading="Balance" />
    <div v-if="!isBalanced()" class="w-full h-[calc(100%-90px)] flex flex-col justify-center items-center">
        <div :class="getWidgetColor() + ` flex flex-col items-center shadow-xl p-5 rounded-2xl w-[80%]`">
            <h2 class="mr-auto text-text text-2xl font-bold mb-3">Summary:</h2>
            <div class="bg-white w-full rounded-xl p-5 mb-5">
                <p class="font-bold">Spending</p>
                <div class="flex">
                    <span>User 1 spent -</span><span class="ml-auto">{{ convertAmount(balanceData.u1deficit) }}</span>
                </div>
                <div class="flex">
                    <span>User 2 spent -</span><span class="ml-auto">{{ convertAmount(balanceData.u2deficit) }}</span>
                </div>
                <div class="flex">
                    <span>Total spent -</span><span class="ml-auto">{{ convertAmount(balanceData.u1deficit + balanceData.u2deficit) }}</span>
                </div>
            </div>
            <div class="bg-white w-full rounded-xl p-5 mb-5">
                <p class="font-bold">To Balance</p>
                <div v-if="stage === 0">
                    <div v-if="balanceData.user_id === 1" class="flex">
                        <span>User 1 to pay -</span><span class="ml-auto">{{ convertAmount(balanceData.amount) }}</span>
                    </div>
                    <div v-else class="flex">
                        <span>User 2 to pay -</span><span class="ml-auto">{{ convertAmount(balanceData.amount) }}</span>
                    </div>
                </div>
                <div v-else>
                    <div v-if="balanceData.user_id === 1" class="flex">
                        <span>User 2 to receive:</span><span class="ml-auto">{{ convertAmount(balanceData.amount) }}</span>
                    </div>
                    <div v-else class="flex">
                        <span>User 1 to receive:</span><span class="ml-auto">{{ convertAmount(balanceData.amount) }}</span>
                    </div>
                </div>
            </div>
        </div>
        <button v-if="stage === 0" :class="getWidgetColor() + ` text-lg pl-10 pr-10 pt-2 pb-2 rounded-xl text-text font-semibold mt-5`" @click="updateStage">Payment Sent</button>
        <button v-else :class="getWidgetColor() + ` text-lg pl-10 pr-10 pt-2 pb-2 rounded-xl text-text font-semibold mt-5`" @click="updateStage">Payment Received</button>
    </div>
    <div v-else class="w-full h-[calc(100%-90px)] flex flex-col justify-center items-center">
        <div class="bg-accent flex flex-col items-center shadow-xl p-5 rounded-2xl w-[80%]">
            <div class="w-1/2 rounded-full bg-widget">
                <svg class="w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="fill-primary" d="M256 64c53 0 96 43 96 96s-43 96-96 96s-96 43-96 96s43 96 96 96C150 448 64 362 64 256S150 64 256 64zm0 448A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm32-352a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
            </div>
            <br />
            <p class="font-bold text-2xl text-text text-center">Expenses are<br/> Balanced</p>
        </div>
    </div>
</template>