import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC1YUlDiRsjSKQE08Wkw0D3TVSND3XeE5c",
  authDomain: "sillyproject-d0835.firebaseapp.com",
  projectId: "sillyproject-d0835",
  storageBucket: "sillyproject-d0835.firebasestorage.app",
  messagingSenderId: "226549110918",
  appId: "1:226549110918:web:d0b40ede6ea2c0fb085907",
  databaseURL: "https://sillyproject-d0835-default-rtdb.firebaseio.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export default firebase;
