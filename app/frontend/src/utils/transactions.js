import { ref } from 'vue';

// Define a reactive reference to store the transactions
export const transactions = ref([]);

/**
 * Calculate a given users deficit
 * @param {number} user_id - The ID of the user
 * @returns {number} - The deficit amount of the user
 */
export function getUserDeficit(user_id) {
    // Calculate the deficit by summing up expenses and subtracting incomes
    return transactions.value.reduce((total, transaction) => {
        return transaction.user_id === user_id 
            ? transaction.expense 
                ? total + transaction.amount 
                : total - transaction.amount 
            : total;
    }, 0);
}

/**
 * Calculate the balance situation between two users.
 * @returns {Object} - An object containing:
 *                       the user_id of the user who has to pay; and
 *                       the amount to balance the situation.
 */
export function getBalance() {
    // Calculate both users deficits
    const u1deficit = getUserDeficit(1), u2deficit = getUserDeficit(2);
    const difference = Math.abs(u1deficit - u2deficit);
    // Determine the user with higher deficit and return half of the difference as the amount to balance
    return u1deficit === u2deficit
        ? { user_id: 0, amount: 0 }
        : { user_id: u1deficit < u2deficit ? 1 : 2, amount: difference/2 };
}

/**
 * Add a new transaction to the list of transactions.
 * @param {Object} transactionData - Data of the transaction to be added
 */
export function handleAddTransaction(transactionData) {
    // Push the transaction with a unique id
    transactions.value.push({ id: transactions.value.length + 1, ...transactionData});
    // Store the transactions in the local storage
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
}

/**
 * Handle the balance confirmation by adding two transactions to balance the situation.
 */
export function handleBalanceConfirmed() {
    const user_id = getBalance().user_id;
    const amount = getBalance().amount;
    // Add two transactions to balance the situation
    handleAddTransaction({ description: 'Balance', user_id: user_id, expense: true, amount: amount, balance: true });
    handleAddTransaction({ description: 'Balance', user_id: user_id == 1 ? 2 : 1, expense: false, amount: amount, balance: true });
    transactions.value = [];
}