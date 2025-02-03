import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        // Obtener la última orden de la base de datos
        const lastOrder = await db.order.findFirst({
            orderBy: { order: "desc" }, // Asegura obtener la más reciente
            select: { order: true }
        });

        // Si no hay órdenes previas, se inicia en ODI00001
        let lastNumber = 0;
        if (lastOrder && lastOrder.order) {
            const match = lastOrder.order.match(/\d+/); // Extrae solo los números
            lastNumber = match ? parseInt(match[0], 10) : 0;
        }

        // Genera el siguiente número en formato ODI00001
        const nextOrder = `ODI${String(lastNumber + 0).padStart(5, "0")}`;

        // Devuelve la respuesta con encabezado para evitar cacheo
        return NextResponse.json({ order: nextOrder }, { 
            status: 200,
            headers: {
                'Cache-Control': 'no-store', // Evita el cache
            }
        });
    } catch (error) {
        return NextResponse.json({ error: "Error obteniendo el número de orden" }, { status: 500 });
    }
}
