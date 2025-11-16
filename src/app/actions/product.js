"use server";

import { updateTag } from "next/cache";
import { getBaseUrl } from "@/app/utils/config";

export const getProduct = async (page) => {
	const res = await fetch(`${getBaseUrl()}/api/products?page=${page}`);
	if (!res.ok) throw new Error("Failed to fetch products");
	return res.json();
};

export const addProduct = async (formData) => {
	const product = {
		title: formData.get("title"),
		price: Number(formData.get("price")),
		image: formData.get("image"),
	};
	const res = await fetch(`${getBaseUrl()}/api/products`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(product),
	});

	if (!res.ok) throw new Error("Failed to add product");

	updateTag("products");
	return res.json();
};


// "use server";

// import { updateTag } from "next/cache";
// import { getBaseUrl } from "@/app/utils/api";

// export const getProduct = async (page) => {
// 	const res = await fetch(`${getBaseUrl()}/api/products?page=${page}`);
// 	if (!res.ok) throw new Error("Failed to fetch products");
// 	return res.json();
// };

// export const addProduct = async (product) => {
// 	const res = await fetch(`${getBaseUrl()}/api/products`, {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(product), 
// 	});

// 	if (!res.ok) throw new Error("Failed to add product");

// 	updateTag("products");
// 	return res.json();
// };
