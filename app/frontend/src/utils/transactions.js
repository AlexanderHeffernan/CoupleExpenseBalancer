import { ref } from 'vue';

export const transactions = ref([]);

export function getUserDeficit(user_id) {
    return transactions.value.reduce((total, transaction) => {
        return transaction.user_id === user_id ? transaction.expense ? total + transaction.amount : total - transaction.amount : total;
    }, 0);
}

export function getBalance() {
    const u1deficit = getUserDeficit(1), u2deficit = getUserDeficit(2);
    const difference = Math.abs(u1deficit - u2deficit);
    if (u1deficit === u2deficit) { return { user_id: 0, amount: 0 }; }
    return { user_id: u1deficit < u2deficit ? 1 : 2, amount: difference/2 };
}

export function handleAddTransaction(transactionData) {
    transactions.value.push({ id: transactions.value.length + 1, ...transactionData});
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
    console.log(transactions.value);
}

export function handleBalanceConfirmed() {
    const user_id = getBalance().user_id;
    const amount = getBalance().amount;
    handleAddTransaction({ description: 'Balance', user_id: user_id, expense: true, amount: amount, balance: true });
    handleAddTransaction({ description: 'Balance', user_id: user_id == 1 ? 2 : 1, expense: false, amount: amount, balance: true });
}