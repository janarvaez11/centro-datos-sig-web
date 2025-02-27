import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const modosFallo = await db.modosFallo.findMany({
            select: {
                id: true,
                modoFallo: true,
                codigo: true,
                efecto: true,
                causaModoFallo: true,
                ocurrencia: true,
                gravedad: true,
                deteccion: true,
                npr: true,
                estadoNPR: true
            },
            orderBy: {
                modoFallo: 'asc'
            }
        });

        return NextResponse.json(modosFallo);
    } catch (error) {
        console.error("[MODOSFALLO_GET]", error);
        return new NextResponse("Error interno", { status: 500 });
    }
} 