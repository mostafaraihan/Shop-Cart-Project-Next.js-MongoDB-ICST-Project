// import connectDb from "@/app/utils/db";
// import Product from "@/app/models/product";

// export async function GET() {

// 	await connectDb();
// 	const products = await Product.find();
// 	return Response.json({ data: products });
// }

// export async function POST(request) {
// 	// database product create
// 	await connectDb();
// 	const body = await request.json();
// 	try {
// 		const newProduct = await Product.create(body);
// 		return Response.json(newProduct, { status: 201 });
// 	} catch (error) {
// 		return Response.json({ error: "Failed To Create Product" });
// 	}
// }


import connectDb from "@/app/utils/db";
import Product from "@/app/models/product";
import { NextResponse } from "next/server";

export async function GET(req) {
	await connectDb();
	const { searchParams } = new URL(req.url);

	const page = searchParams.get("page") || "1";

	const pageSize = 8;
	try {
		const currentPage = Number(page) || 1;
		const skip = (currentPage - 1) * pageSize;
		const totalProducts = await Product.countDocuments();

		const products = await Product.find({})
			.skip(skip)
			.limit(pageSize)
			.sort({ createdAt: -1 });

		return NextResponse.json({
			success: true,
			products,
			currentPage,
			totalPages: Math.ceil(totalProducts / pageSize),
		});
	} catch (err) {
		return NextResponse.json(
			{
				success: false,
				err: err.message,
			},
			{ status: 500 },
		);
	}
}

export async function POST(request) {
	await connectDb();
	const body = await request.json();
	try {
		const newProduct = await Product.create(body);
		return NextResponse.json(newProduct, { status: 201 }); 
	} catch (error) {
		return NextResponse.json({ error: "Failed To Create Product" }, { status: 500 });
	}
}
