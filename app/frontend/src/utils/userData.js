import { ref } from 'vue';
import { db, auth } from '../firebase/init.js';
import { getDoc, doc } from 'firebase/firestore';
import { getTransactions, listenForTransactions } from './transactions.js';
import { startLoading, stopLoading } from './navigation.js';

const data = ref(null);
const partnerData = ref(null);

export async function loadUserData(user) {
    startLoading();
    try {
        const userDoc = await getDoc(doc(db, `users/${user.uid}`));
        if (!userDoc.exists()) 
            throw new Error("User document does not exist.");
        
        data.value = userDoc.data();
        
        // Check if user has a partner
        if (data.value.partnerUid)
            partnerData.value = (await getDoc(doc(db, `users/${data.value.partnerUid}`))).data();
        
        await getTransactions();
        listenForTransactions(); // Listen for changes in the user's transactions firestore collection
    } catch(error) {
        console.error("Error fetching user data: ", error);
    } 
    stopLoading();
}
/**
 * Get user data for specified user.
 * @param {string} dataLabel - Label of the data to retrive.
 * @param {long?} uid - UID of the user to get data for. If not provided, the current user's data is used.
 * @returns {*} - The requested user data.
 */
export function getUserData(dataLabel, uid = auth.currentUser?.uid) {
    if (!uid) 
        return null;
    
    if (dataLabel === 'uid' && uid === auth.currentUser.uid)
        return auth.currentUser.uid;

    let dataDoc = data;
    if (uid !== auth.currentUser.uid)
        dataDoc = partnerData;

    if (!dataDoc.value)
        return null; // User data not available yet
    
    if (!Object.prototype.hasOwnProperty.call(dataDoc.value, dataLabel)) { 
        console.error(`Data label '${dataLabel}' does not exist in the user data.`);
        return null;
    }
    
    return dataDoc.value[dataLabel];
}