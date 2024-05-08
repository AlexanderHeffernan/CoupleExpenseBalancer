import { ref } from 'vue';
import { db, auth } from '../firebase/init.js';
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { getDoc, doc } from 'firebase/firestore';
import { getUserData } from './userAccount.js';

// Define a reactive reference to store the transactions
export const transactions = ref([]);
export const balanceData = ref({});

/**
 * Calculate a given users deficit
 * @param {number} user_id - The ID of the user
 * @returns {number} - The deficit amount of the user
 */
export async function getUserDeficit(user_id) {
    let userUid;
    if (user_id == 1) {
        if (await getUserData('original') === true) {
            userUid = await getUserData('uid');
        }
        else {
            userUid = await getUserData('partnerUid');
        }
    } else if (user_id == 2) {
        if (await getUserData('original') === true) {
            userUid = await getUserData('partnerUid');
        }
        else {
            userUid = await getUserData('uid');
        }
    }

    // Calculate the deficit by summing up expenses and subtracting incomes
    const deficit = transactions.value.reduce((total, transaction) => {
        return transaction.user_id === userUid 
            ? transaction.expense 
                ? total + transaction.amount 
                : total - transaction.amount 
            : total;
    }, 0);
    // Return the deficit with 2 decimal places
    return Math.round(deficit * 100) / 100;
}

/**
 * Calculate the balance situation between two users.
 * @returns {Object} - An object containing:
 *                       the user_id of the user who has to pay; and
 *                       the amount to balance the situation.
 */
export async function getBalanceData() {
    // Calculate both users deficits
    const u1deficit = await getUserDeficit(1), u2deficit = await getUserDeficit(2);
    const difference = Math.abs(u1deficit - u2deficit);
    // Determine the user with higher deficit and return half of the difference as the amount to balance
    return u1deficit === u2deficit
        ? { user_id: 0, amount: 0, u1deficit: u1deficit, u2deficit: u2deficit}
        : { user_id: u1deficit < u2deficit ? 1 : 2, amount: difference/2, u1deficit: u1deficit, u2deficit: u2deficit};
}

/**
 * Add a new transaction to the list of transactions.
 * @param {Object} transactionData - Data of the transaction to be added
 */
export function addTransaction(transactionData) {
    // Push the transaction with a unique id
    transactions.value.push({ id: transactions.value.length + 1, date: new Date(), ...transactionData});

    saveTransaction(transactions.value[transactions.value.length - 1]);
}

/**
 * Handle the balance confirmation by adding two transactions to balance the situation.
 */
export function balanceConfirmed() {
    resetTransactions();
}

async function saveTransaction(transaction) {
    // 'transaction' collection reference
    const colRef = collection(db, `users/${auth.currentUser.uid}/transactions`);
    // data to send
    const transactionObj = {
        id: transaction.id,
        date: transaction.date,
        description: transaction.description,
        user_id: transaction.user_id,
        expense: transaction.expense,
        amount: transaction.amount,
        balance: transaction.balance
    }

    // create document and return reference to it
    const docRef = await addDoc(colRef, transactionObj);

    // access auto-generated ID with '.id'
    console.log('Document was created with ID: ', docRef.id);
}

export async function getTransactions() {
    // Get the current user's document
    const userDoc = await getDoc(doc(db, `users/${auth.currentUser.uid}`));
    const userData = userDoc.data();

    // Get all documents from the 'transactions' collection
    const querySnapshot = await getDocs(collection(db, `users/${auth.currentUser.uid}/transactions`));
    // Map each document to its data and assign it to the transactions ref
    transactions.value = querySnapshot.docs.map(doc => doc.data());

    // Check if partnerUid exists
    if (await getUserData('partnerUid')) {
        // Get all document from the partner's 'transactions' collection
        const partnerQuerySnapshot = await getDocs(collection(db, `users/${userData.partnerUid}/transactions`));
        // Map each document to its data and assign it to the transactions ref
        transactions.value = transactions.value.concat(partnerQuerySnapshot.docs.map(doc => doc.data()));
        balanceData.value = await getBalanceData();
    }
}

async function resetTransactions() {
    // Get current user's document
    const userDoc = await getDoc(doc(db, `users/${auth.currentUser.uid}`));
    const userData = userDoc.data();

    // Reference to the 'transactions' collection
    const colRef = collection(db, `users/${auth.currentUser.uid}/transactions`);
    
    // Get all documents from the 'transactions' collection
    const querySnapshot = await getDocs(colRef);
    
    // Delete each document
    querySnapshot.forEach(async doc => {
        await deleteDoc(doc.ref);
    });

    if (getUserData('partnerUid')) {
        // Reference to the partner's 'transactions' collection
        const partnerColRef = collection(db, `users/${userData.partnerUid}/transactions`);
        
        // Get all documents from the partner's 'transactions' collection
        const partnerQuerySnapshot = await getDocs(partnerColRef);
        
        // Delete each document
        partnerQuerySnapshot.forEach(async doc => {
            await deleteDoc(doc.ref);
        });
    }

    // Clear the transactions ref
    transactions.value = [];
}

export function clearTransactions() {
    // Clear the transactions ref
    transactions.value = [];
}