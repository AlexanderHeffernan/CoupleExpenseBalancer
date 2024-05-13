import { ref } from 'vue';
import { db, auth } from '../firebase/init.js';
import { collection, addDoc, getDocs, deleteDoc, onSnapshot } from 'firebase/firestore';
import { getDoc, doc } from 'firebase/firestore';
import { getUserData } from './userData.js';

// Define a reactive reference to store the transactions
export const transactions = ref([]);
export const balanceData = ref({});
export const u1deficit = ref(0);
export const u2deficit = ref(0);

/**
 * Calculate a given users deficit
 * @param {number} user_id - The ID of the user
 * @returns {number} - The deficit amount of the user
 */
export function getUserDeficit(user_id) {
    let userUid;
    if (user_id == 1) {
        if (getUserData('original') === true) {
            userUid = getUserData('uid');
        }
        else {
            userUid = getUserData('partnerUid');
        }
    } else if (user_id == 2) {
        if (getUserData('original') === true) {
            userUid = getUserData('partnerUid');
        }
        else {
            userUid = getUserData('uid');
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
export function getBalanceData() {
    // Calculate both users deficits
    const u1deficit = getUserDeficit(1), u2deficit = getUserDeficit(2);
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
    balanceData.value = getBalanceData();
    u1deficit.value = balanceData.value.u1deficit;
    u2deficit.value = balanceData.value.u2deficit;
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
    
    // Convert timestamps to JavaScript Date objects
    const transactionsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Convert timestamps to Date objects
        data.date = data.date.toDate(); // Assuming 'date' is the field containing the timestamp
        return data;
    });

    // Assign converted data to the transactions ref
    transactions.value = transactionsData;

    // Check if partnerUid exists
    if (getUserData('partnerUid')) {
        // Get all document from the partner's 'transactions' collection
        const partnerQuerySnapshot = await getDocs(collection(db, `users/${userData.partnerUid}/transactions`));

        // Convert timestamps to JavaScript Date objects
        const partnersTransactionsData = partnerQuerySnapshot.docs.map(doc => {
            const data = doc.data();
            // Convert timestamps to Date objects
            data.date = data.date.toDate(); // Assuming 'date' is the field containing the timestamp
            return data;
        });
        
        // Map each document to its data and assign it to the transactions ref
        transactions.value = transactions.value.concat(partnersTransactionsData);
        balanceData.value = getBalanceData();
        u1deficit.value = balanceData.value.u1deficit;
        u2deficit.value = balanceData.value.u2deficit;
    }
}

export async function listenForTransactions() {
    const transactionsRef = collection(db, `users/${getUserData('partnerUid')}/transactions`);

    return onSnapshot(transactionsRef, (snapshot) => {
        if (snapshot.docChanges().length > 0) {
            getTransactions();
        }
    });
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