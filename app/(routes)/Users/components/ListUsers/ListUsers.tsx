import {redirect} from 'next/navigation'
import {auth} from '@clerk/nextjs'
import { db } from '@/lib/db'
import { DataTable } from './data-table'
//import { columns } from '@/app/(routes)/components/CustomersTable'

import {columns} from './columns'



export async function ListUsers(){

    const{userId} = auth()


    if(!userId){
        return redirect("/")
    }

    const users = await db.user.findMany({
        where:{
            userId,
        },
        orderBy:{
            createdAt: "desc"
        }

    })



    return(

        <DataTable columns={columns} data={users}/>
    )
}