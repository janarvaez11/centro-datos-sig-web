import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Desactivar la verificación de autenticación para esta ruta
export const config = {
    api: {
        bodyParser: true,
        externalResolver: true,
    },
};

export async function OPTIONS(req: Request) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': '*',
        },
    });
}

export async function POST(req: Request) {
    try {
        // Permitir cualquier origen
        if (req.method === 'OPTIONS') {
            return new NextResponse(null, {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                },
            });
        }

        const data = await req.json();
        console.log("Webhook datos recibidos:", data);

        // Validar datos recibidos
        if (!data.order || !data.elemento) {
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    error: "Datos incompletos"
                }), 
                { 
                    status: 200, // Cambiado a 200 para evitar errores en Power Automate
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
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    error: "Orden no encontrada"
                }), 
                { 
                    status: 200, // Cambiado a 200 para evitar errores en Power Automate
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

        return new NextResponse(
            JSON.stringify({
                success: true,
                message: "Registro creado exitosamente"
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
        console.error("Error en webhook:", error);
        return new NextResponse(
            JSON.stringify({
                success: false,
                error: "Error interno"
            }), 
            { 
                status: 200, // Cambiado a 200 para evitar errores en Power Automate
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
    }
} 