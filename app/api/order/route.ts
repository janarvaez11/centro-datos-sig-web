import {db} from "@/lib/db"
import {auth} from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try{

        const {userId} = auth();
        const data = await req.json()


        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})

        }

        const order = await db.order.create({
            data:{
                userId,
                ...data,
            },
        });

        return NextResponse.json(order);

    }catch(error){
        console.log("[ORDER]", error);
        return new NextResponse("Internal Error", {status: 500})


    }
    
}