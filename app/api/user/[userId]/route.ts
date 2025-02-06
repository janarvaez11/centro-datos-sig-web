import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        //const { userId } = auth();
        const { userId } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const user = await db.user.update({
            where: {
                id: userId
            },
            data: {
                ...values,
            },
        });
        return NextResponse.json(user)

    } catch (error) {
        console.log("[USER ID]", error);
        return new NextResponse("Error Interno", { status: 500 });
    }

}
 
export async function DELETE(req: Request, {params}: {params: {userId: string}}){
    try {
        //const {userId} = auth()
        const {userId} = params

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const deleteUser = await db.user.delete({
            where:{
                id: userId,

            },
        });

        return NextResponse.json(deleteUser);

        
    } catch (error) {
        console.log("[DELETE USER ID]", error)
        return new NextResponse("Error Interno", {status:500})
    }
}