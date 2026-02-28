import { app } from "./firebase";
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(app);
