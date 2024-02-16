import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect()


export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { email, password, username, mobile } = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({ email })
        console.log(reqBody);

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }
        console.log("hello");

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username: username,
            email: email,
            mobile: mobile,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        console.log("hello");

        //send verification email
        try {
            return NextResponse.json({
                message: "User created successfully",
                success: true,
                savedUser
            })
        }
        catch (error) {
            console.log(error);
        
        }



    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}