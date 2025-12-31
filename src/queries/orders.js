import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const placeOrderToDB = async (orderData) => {
  const orderRef = collection(db, "orders");
  const docRef = await addDoc(orderRef, {
    ...orderData,
    status: "pending",
    created_at: serverTimestamp(),
  });
  return docRef.id;
};
