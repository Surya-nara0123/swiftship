import Tasks from "@/models/taskModel";
import { NextResponse } from "next/server";

export async function POST(request) {

    try {
        const reqBody = await request.json()
        const { taskTitle, type, fromLocation, toLocation, fromUsername, toUsername } = reqBody

        const newTask = new Tasks({
            taskTitle, type, fromLocation, toLocation, fromUsername, toUsername
        })
        const savedTask = await newTask.save()
        
        console.log(newTask);
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedTask
        })

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}