"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProductCard from "@/app/component/ProductCard";
import { useCart } from "@/app/component/CartContext";
import { getBaseUrl } from "@/app/utils/api";
import PageSwitch from "@/app/component/PageSwitch";
import { useSearchParams } from "next/navigation";

const getProduct = async (page) => {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/products?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  return data;
};

const Shop = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { addToCart } = useCart();
  const { data: session } = useSession();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false);
    }
  }, [session]);

  useEffect(() => {
    getProduct(page)
      .then((data) => {
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(console.error);
  }, [page]);

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {products.length ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={() => addToCart(product)}
              isLoggedIn={isLoggedIn} 
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <PageSwitch totalPages={totalPages} currentPage={page} pathname="/shop" />
    </div>
  );
};

export default Shop;



// "use client";

// import { useEffect, useState } from "react";
// import ProductCard from "@/app/component/ProductCard";
// import { useCart } from "@/app/component/CartContext";

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     fetch("/api/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data?.data || []))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div style={{ padding: "2rem" }}>
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
//         {products.length ? (
//           products.map((p) => <ProductCard key={p._id} product={p} onAddToCart={() => addToCart(p)} />)
//         ) : (
//           <p>No products available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Shop;