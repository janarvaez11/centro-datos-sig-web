import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { orderNumber: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { orderNumber } = params;

        const existingOrder = await db.order.findFirst({
            where: {
                order: orderNumber
            }
        });

        return NextResponse.json({ exists: !!existingOrder });
    } catch (error) {
        console.error("[ORDER_CHECK]", error);
        return new NextResponse("Error interno", { status: 500 });
    }
} 