import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request) {
    try {
        console.log("hello1")
        const userId = await getDataFromToken(request);
        console.log("hello2")
        let user;
        try {
            user = await User.findById({ _id: userId }).select("-password -isAdmin");
        } catch (error) {
            console.log(error)
        }
        console.log(user._id.toString());
        return NextResponse.json({
            message: "user found successfully",
            data: {
                id: user._id.toString(),
                username: user.username,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}