import {z} from "zod";

export const formSchema = z.object({

    order: z.string().min(2),
    procesoProduccion: z.string().min(2),                     
    fig: z.string().min(2),                        
    proyecto: z.string().min(2),                    
    cliente: z.string().min(2),                    
    elemento: z.string().min(1),                   
    fechaDeteccion: z.string().min(2),              
    nivelInspeccion: z.string().min(2),
    planMuestra: z.string().min(2),            
    modoFallo: z.string().min(2),                   
    efecto: z.string().min(2),                      
    causaModoFallo: z.string().min(2),              
    medidasEnsayo: z.string().min(2),               
    ocurrencia: z.string().min(2),                  
    gravedad: z.string().min(2),                    
    deteccion: z.string().min(2),                  
    npr: z.string().min(2),                         
    estadoNPR: z.string().min(2),                      
    codigoColaboradorCT: z.string().min(2),         
    codigoResponsableInspeccion: z.string().min(2), 
    accionImplementada: z.string().min(2),          
    fechaValidacionCorreccion: z.string().min(2),   
    costoReproceso: z.string().min(2)              

})