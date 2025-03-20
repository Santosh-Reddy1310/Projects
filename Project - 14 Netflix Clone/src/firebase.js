import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAXxUbA43zFeh_pVkstlOHal32ElmUK-m8",
  authDomain: "netflix-clone-db9ff.firebaseapp.com",
  projectId: "netflix-clone-db9ff",
  storageBucket: "netflix-clone-db9ff.firebasestorage.app",
  messagingSenderId: "1023898592338",
  appId: "1:1023898592338:web:7cb1394c42db7b58522b8b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      email: email,
      authProvider: "local"
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error(error);
    toast.error(error.code);
  }
};

export { auth, db, signup, login, logout };