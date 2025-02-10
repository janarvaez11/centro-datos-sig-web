import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        // Obtener todas las órdenes
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
            .sort((a, b) => a.num - b.num); // Ordenar de forma ascendente

        // Encontrar el primer número faltante en la secuencia
        let nextNumber = 1;
        for (let i = 0; i < validOrders.length; i++) {
            if (validOrders[i].num !== i + 1) {
                nextNumber = i + 1;
                break;
            }
            nextNumber = i + 2; // Si no hay huecos, usar el siguiente número
        }

        // Si no hay órdenes, empezar desde 1
        if (validOrders.length === 0) {
            nextNumber = 1;
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
            currentMax: validOrders.length > 0 ? validOrders[validOrders.length - 1].order : null
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
