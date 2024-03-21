import Tasks from "@/models/taskModel";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        const tasks = await Tasks.find()
        return NextResponse.json(tasks)
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}