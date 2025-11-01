import createPaymentLink from "@/utils/square/api/createPaymentLink";
import { NextResponse } from "next/server";



export async function POST(req: Request){
    try{

        const data = await req.json()

        const link = await createPaymentLink(data.order)
            
            if(link){
                
              return NextResponse.json({url: link}, { status: 201 })
    
            } else {
    
              return NextResponse.json({url: "Failed to create payment link"}, { status: 400 })
    
            }

    } catch(err) {
        
        return NextResponse.json({url: "Failed to create payment link"}, { status: 400 })
    }


}