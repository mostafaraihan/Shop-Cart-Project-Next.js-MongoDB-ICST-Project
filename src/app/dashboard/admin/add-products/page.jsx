import { addProduct } from "@/app/actions/product";
import "./AddProduct.css"; 

const AddProduct = () => {
	return (
		<div className="add-product-container">
			<form className="add-product-form" action={addProduct}>
				<h2 className="form-title">Add New Product</h2>

				<label htmlFor="title">Product Title</label>
				<input
					id="title"
					type="text"
					name="title"
					placeholder="Enter Product Title"
					required
				/>

				<label htmlFor="price">Product Price</label>
				<input
					id="price"
					type="number"
					name="price"
					placeholder="Enter Product Price"
					required
				/>

				<label htmlFor="image">Image URL</label>
				<input
					id="image"
					type="text"
					name="image"
					placeholder="Enter Image URL"
					required
				/>

				<button type="submit">Add New Product</button>
			</form>
		</div>
	);
};

export default AddProduct;


// "use client";

// import { addProduct } from "@/app/actions/product";
// import { useState } from "react";
// import "./AddProduct.css"

// const AddProduct = () => {
// 	const [product, setProduct] = useState({
// 		title: "",
// 		price: "",
// 		image: "",
// 	});
// 	const [imageUrl, setImageUrl] = useState("");

// 	const handleChange = (e) => {
// 		setProduct({
// 			...product,
// 			[e.target.name]:
// 				e.target.name === "price"
// 					? Number(e.target.value)
// 					: e.target.value,
// 		});
// 	};

// 	const submitHandler = (e) => {
// 		e.preventDefault();
// 		addProduct(product);
// 		setProduct({
// 			title: "",
// 			price: "",
// 			image: "",
// 		});
// 		setImageUrl("");
// 	};

// 	const handleImageChange = async (e) => {
// 		const file = e.target.files[0];
// 		if (!file) return;

// 		const data = new FormData();
// 		data.append("file", file);
// 		data.append("upload_preset", "shopping-cart-project-nextjs");

// 		const res = await fetch(
// 			"https://api.cloudinary.com/v1_1/dgykypdy0/image/upload",
// 			{
// 				method: "POST",
// 				body: data,
// 			}
// 		);

// 		const result = await res.json();
// 		setImageUrl(result.secure_url);
// 		setProduct({ ...product, image: result.secure_url });
// 	};

// 	return (
// 		<div className="add-product-container">
// 			<form className="add-product-form" onSubmit={submitHandler}>
// 				<h2 className="form-title">Add New Product</h2>

// 				<label htmlFor="title">Title</label>
// 				<input
// 					className="input-field"
// 					id="title"
// 					value={product.title}
// 					onChange={handleChange}
// 					type="text"
// 					name="title"
// 					required
// 				/>

// 				<label htmlFor="price">Price</label>
// 				<input
// 					className="input-field"
// 					id="price"
// 					value={product.price}
// 					onChange={handleChange}
// 					type="number"
// 					name="price"
// 					required
// 				/>

// 				<label htmlFor="image">Image</label>
// 				<input
// 					className="input-field"
// 					onChange={handleImageChange}
// 					type="file"
// 					name="image"
// 					id="image"
// 					required
// 				/>

// 				{imageUrl && (
// 					<div>
// 						<p>Image Preview:</p>
// 						<img
// 							src={imageUrl}
// 							style={{ width: "100px", height: "100px" }}
// 							alt="preview"
// 						/>
// 					</div>
// 				)}

// 				<button type="submit">Add Product</button>
// 			</form>
// 		</div>
// 	);
// };

// export default AddProduct;
