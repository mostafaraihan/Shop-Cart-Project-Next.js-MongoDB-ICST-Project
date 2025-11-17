"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProductCard from "@/app/component/ProductCard";
import { useCart } from "@/app/component/CartContext";
import PageSwitch from "@/app/component/PageSwitch";
import { useSearchParams } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';


const getProduct = async (page) => {
  try {
    const res = await fetch(`/api/products?page=${page}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalPages: 1 };
  }
};

const Shop = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { addToCart } = useCart();
  const { data: session } = useSession();

  const isLoggedIn = !!session;

  useEffect(() => {
    let isMounted = true;

    getProduct(page).then((data) => {
      if (isMounted) {
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
  <div className="bg-dark text-light min-vh-100">
    <div className="container py-5">
      {products.length > 0 ? (
        <div className="row g-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={() => addToCart(product)}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No products available.</p>
      )}

      <div className="mt-4 d-flex justify-content-center">
        <PageSwitch totalPages={totalPages} currentPage={page} pathname="/shop" />
      </div>
    </div>
  </div>
  );
};

export default Shop;



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