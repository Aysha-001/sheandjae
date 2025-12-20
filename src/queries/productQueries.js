import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../config/firebase";

/* ---------------- SINGLE PRODUCT ---------------- */
export const fetchProductById = async (id) => {
    console.log("id", id)
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("Product not found");
  }

  return { id: snap.id, ...snap.data() };
};

/* ---------------- NEW ARRIVALS (HOME) ---------------- */
export const fetchNewArrivals = async () => {
  const q = query(
    collection(db, "products"),
    where("isnewarrival", "==", true),
    orderBy("createdAt", "desc"),
    limit(6)
  );

  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

/* ---------------- CATEGORY LISTING ---------------- */
export const fetchProductsByCategory = async (category) => {
  const q = query(
    collection(db, "products"),
    where("category", "==", category),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

/* ---------------- RELATED PRODUCTS ---------------- */
export const fetchRelatedProducts = async (tag, currentId) => {
  if (!tag) return [];

  const q = query(
    collection(db, "products"),
    where("tags", "array-contains", tag),
    limit(5)
  );

  const snap = await getDocs(q);

  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter(p => p.id !== currentId)
    .slice(0, 4);
};
