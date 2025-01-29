import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { orderId: string } }
) {
    try {
        const { userId } = auth();
        const { orderId } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const order = await db.order.update({
            where: {
                id: orderId,
                userId,
            },
            data: {
                ...values,
            },
        });
        return NextResponse.json(order)

    } catch (error) {
        console.log("[ORDER ID]", error);
        return new NextResponse("Error Interno", { status: 500 });
    }

}