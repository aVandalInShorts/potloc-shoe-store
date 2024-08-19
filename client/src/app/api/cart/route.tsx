import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({ message: "GET request to /api/cart" });
}

export async function POST(req: Request, res: NextResponse) {
	const { cart } = await req.json();
	console.log("Cart submitted", cart, res);
	return NextResponse.json({ message: "Cart submitted", cart });
}

export async function PUT() {
	return NextResponse.json({ message: "PUT request to /api/cart" });
}

export async function DELETE() {
	return NextResponse.json({ message: "DELETE request to /api/cart" });
}
