//import { ref } from 'vue';
import { db, auth } from '../firebase/init.js';
import { query, collection, where, getDocs, doc, setDoc } from 'firebase/firestore';

export async function partnerAccounts(partnerEmail) {
    console.log(partnerEmail);
    // Query users collection where email is equal to partnerEmail
    const q = query(collection(db, 'users'), where('email', '==', partnerEmail));

    const querySnapshot = await getDocs(q);
    let partnerUid = null;

    querySnapshot.forEach(doc => {
        partnerUid = doc.id;
    });

    if (partnerUid) {
        const userRef = doc(db, `users/${auth.currentUser.uid}`);
        const partnerObj = { partnerUid: partnerUid };
        await setDoc (userRef, partnerObj, { merge: true});

        const partnerRef = doc(db, `users/${partnerUid}`);
        const userObj = { partnerUid: auth.currentUser.uid };
        await setDoc(partnerRef, userObj, { merge: true });
    } else {
        console.log("Fail");
    }
}