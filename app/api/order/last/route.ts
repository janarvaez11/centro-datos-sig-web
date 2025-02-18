import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        // Obtener la última orden
        const lastOrder = await db.order.findFirst({
            select: {
                order: true
            },
            orderBy: {
                order: 'desc'
            }
        });

        let nextNumber = 1;
        
        if (lastOrder) {
            // Extraer el número de la última orden
            const match = lastOrder.order.match(/\d+$/);
            if (match) {
                nextNumber = parseInt(match[0]) + 1;
            }
        }

        // Formatear el número con ceros a la izquierda
        const formattedNumber = String(nextNumber).padStart(5, '0');

        return new NextResponse(
            JSON.stringify({ 
                number: formattedNumber
            }), 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            }
        );
    } catch (error: any) {
        console.error("Error generando número de orden:", error);
        return new NextResponse(
            JSON.stringify({ 
                error: "Error obteniendo el número de orden",
                details: error?.message || "Error desconocido"
            }), 
            { 
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}
