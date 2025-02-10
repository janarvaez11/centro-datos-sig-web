import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        // Obtener la última orden ordenando por el número
        const lastOrder = await db.order.findFirst({
            where: {
                order: {
                    startsWith: 'ODI'
                }
            },
            orderBy: {
                order: 'desc'
            }
        });

        let nextNumber = 1; // Por defecto empezamos en 1

        if (lastOrder && lastOrder.order) {
            // Extraer el número de la última orden
            const match = lastOrder.order.match(/ODI(\d+)/);
            if (match) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }

        // Generar el siguiente número en formato ODI00001
        const nextOrder = `ODI${String(nextNumber).padStart(5, '0')}`;

        return NextResponse.json({ order: nextOrder }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate'
            }
        });
    } catch (error) {
        console.error("Error generando número de orden:", error);
        return NextResponse.json({ error: "Error obteniendo el número de orden" }, { status: 500 });
    }
}
