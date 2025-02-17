import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Función para manejar la solicitud OPTIONS (CORS)
export async function OPTIONS(req: Request) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        console.log("Datos recibidos:", data); // Para debugging

        // Validar datos recibidos
        if (!data.order || !data.elemento) {
            console.log("Datos faltantes:", { data }); // Para debugging
            return new NextResponse(
                JSON.stringify({
                    error: "Se requiere el número de orden (order) y el elemento"
                }), 
                { 
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
        }

        // Buscar la orden
        const order = await db.order.findFirst({
            where: {
                order: data.order
            }
        });

        if (!order) {
            console.log("Orden no encontrada:", data.order); // Para debugging
            return new NextResponse(
                JSON.stringify({
                    error: "Orden no encontrada: " + data.order
                }), 
                { 
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
        }

        // Crear registro AMEF
        const amef = await db.amef.create({
            data: {
                order: order.order,
                especificacionProceso: order.especificacionProceso,
                fig: order.fig,
                proyecto: order.proyecto,
                cliente: order.cliente,
                elemento: data.elemento,
                fechaDeteccion: order.fechaProgramada,
                nivelInspeccion: order.nivelInspeccion,
                planMuestra: order.planMuestra,
                modoFallo: "",
                efecto: "",
                causaModoFallo: "",
                medidasEnsayo: "",
                ocurrencia: "",
                gravedad: "",
                deteccion: "",
                npr: "",
                estadoNPR: "",
                codigoColaboradorCT: "",
                codigoResponsableInspeccion: "",
                accionImplementada: "",
                fechaValidacionCorreccion: "",
                costoReproceso: ""
            }
        });

        console.log("AMEF creado exitosamente:", amef); // Para debugging

        return new NextResponse(
            JSON.stringify({
                success: true,
                message: "Registro AMEF creado exitosamente",
                data: amef
            }), 
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
    } catch (error) {
        console.error("Error en creación de AMEF:", error); // Para debugging
        return new NextResponse(
            JSON.stringify({
                error: "Error al crear el registro AMEF",
                details: error instanceof Error ? error.message : "Error desconocido"
            }), 
            { 
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
    }
} 