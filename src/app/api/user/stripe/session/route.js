import { NextResponse } from "next/server";
import connectDb from "@/app/utils/db";
import Product from "@/app/models/product";
import { getToken } from "next-auth/jwt";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    await connectDb();

    try {
        // ১. Request থেকে cartItems নেওয়া
        const { cartItems } = await req.json();

        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return NextResponse.json({ error: "Invalid cart items" }, { status: 400 });
        }

        // ২. User verification
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        const user = token?.user;

        if (!user || !user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // ৩. Products fetch
        const productIds = cartItems.map(item => item._id);
        const products = await Product.find({ _id: { $in: productIds } });

        if (products.length !== cartItems.length) {
            return NextResponse.json({ error: "Some products not found" }, { status: 404 });
        }

        // ৪. Stripe line items preparation
        const lineItems = cartItems.map(item => {
            const product = products.find(p => p._id.toString() === item._id);
            if (!product) throw new Error(`Product ${item._id} not found`);

            const quantity = Math.min(item.quantity, 99);

            return {
                price_data: {
                    currency: "bdt", // ✅ BDT currency
                    product_data: {
                        name: product.title,
                        images: product.image ? [product.image] : [],
                    },
                    unit_amount: Math.round(product.price * 100), // 1 ৳ = 100 paisa
                },
                quantity,
            };
        });

        // ৫. Stripe session create
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            payment_method_types: ["card"],
            success_url: process.env.NEXTAUTH_URL + "/success",
            cancel_url: process.env.NEXTAUTH_URL + "/cart",
            client_reference_id: user.id.toString(),
            customer_email: user.email,
            billing_address_collection: "required",
            shipping_address_collection: {
                allowed_countries: ["BD"], 
            },
            payment_intent_data: {
                metadata: {
                    userId: user.id.toString(),
                    cartItems: JSON.stringify(cartItems.map(item => ({
                        _id: item._id,
                        quantity: Math.min(item.quantity, 99),
                    }))),
                },
            },
        });

        if (process.env.NODE_ENV === "development") {
            console.log("Stripe session ID:", session.id);
        }

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err) {
        console.error("Stripe checkout error:", err);
        return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
    }
}
