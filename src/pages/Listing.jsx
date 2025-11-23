import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useParams, Link } from "react-router-dom";

export default function Listing() {
  const { category } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [sort, setSort] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  // fetch only when category changes
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      let q = query(
        collection(db, "Product"),
        ...(category && category !== "all"
          ? [where("category", "==", category)]
          : []),
        orderBy("createdAt")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAllProducts(data);
      setLoading(false);
    };

    fetchAllProducts();
  }, [category]);

  // apply filters/sorting locally
  useEffect(() => {
    let data = [...allProducts];

    if (color) {
      data = data.filter(
        (p) => p.color?.toLowerCase() === color.toLowerCase()
      );
    }
    if (size) {
      data = data.filter((p) =>
        p.size?.toLowerCase().includes(size.toLowerCase())
      );
    }
    if (sort === "low-high") {
      data.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      data.sort((a, b) => b.price - a.price);
    }

    setProducts(data);
  }, [allProducts, sort, color, size]);

  if (loading) return <p className="p-4">Loading...</p>;

  if (products.length === 0) {
    return <p className="p-4">No products found in this category.</p>;
  }

  return (
    <div className="pt-10">
      {/* Intro Text */}
      <div className="text-center mb-6 px-4">
        <h2 className="text-lg font-serif text-gray-700 italic">
          Rings go around, stories abound...
        </h2>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 border-b border-gray-200 pb-3 mb-6">
        {/* Sort by Price */}
        <select
          className="border rounded px-3 py-1 text-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>

        {/* Color */}
        <select
          className="border rounded px-3 py-1 text-sm"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="">All Colors</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Rose Gold">Rose Gold</option>
        </select>

        {/* Size */}
        <select
          className="border rounded px-3 py-1 text-sm"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">All Sizes</option>
          <option value="Adjustable">Adjustable</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
  {products.map((product) => (
    <Link
      to={`/product/${product.id}`}
      key={product.id}
      className="block max-w-xs mx-auto"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover mb-2"
      />
      <h2 className="text-sm font-medium truncate">{product.name}</h2>
      <p className="text-gray-600 text-sm">₹{product.price}</p>
    </Link>
  ))}
</div>
</div>
  );
}
