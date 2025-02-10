import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        // Obtener todas las órdenes y ordenarlas localmente para asegurar el orden correcto
        const allOrders = await db.order.findMany({
            select: {
                order: true
            }
        });

        // Filtrar y ordenar las órdenes válidas
        const validOrders = allOrders
            .map(o => o.order)
            .filter(order => order.startsWith('ODI-'))
            .map(order => {
                const num = parseInt(order.split('-')[1]);
                return { order, num };
            })
            .sort((a, b) => b.num - a.num); // Ordenar de forma descendente

        let nextNumber = 1; // Valor por defecto

        if (validOrders.length > 0) {
            nextNumber = validOrders[0].num + 1; // Tomar el número más alto y sumar 1
        }

        // Generar el siguiente número en formato ODI-00001
        const nextOrder = `ODI-${String(nextNumber).padStart(5, '0')}`;

        // Verificar si el número generado ya existe
        const exists = allOrders.some(o => o.order === nextOrder);
        if (exists) {
            throw new Error("Número de orden duplicado detectado");
        }

        return NextResponse.json({ 
            order: nextOrder,
            currentMax: validOrders.length > 0 ? validOrders[0].order : null
        }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
    } catch (error: any) {
        console.error("Error generando número de orden:", error);
        return NextResponse.json({ 
            error: "Error obteniendo el número de orden",
            details: error?.message || "Error desconocido"
        }, { 
            status: 500 
        });
    }
}
