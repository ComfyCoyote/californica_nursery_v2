import calculateOrder from "@/utils/square/api/calculateOrder";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
            const data = await req.json()

            const calculated = await calculateOrder(data)
            
            if(calculated){

              return NextResponse.json({ amount: calculated }, { status: 201 })
            
            } else {
                return NextResponse.json({ amount: "Failed to calculate order price" }, { status: 400 })
             
            }

    } catch(err) {
        return NextResponse.json({ amount: err }, { status: 400 })
    }

}
