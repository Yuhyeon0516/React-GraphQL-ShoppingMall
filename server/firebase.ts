// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'dotenv/config';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FB_APIKEY,
    authDomain: 'yuhyeon-shop.firebaseapp.com',
    projectId: 'yuhyeon-shop',
    storageBucket: 'yuhyeon-shop.appspot.com',
    messagingSenderId: '573088299508',
    appId: process.env.FB_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

export const db = getFirestore(app);
