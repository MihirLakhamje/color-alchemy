import dbConfig from "@/libs/dbConfig"
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

dbConfig();
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;
        console.log(email, password);

        if( !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }
        
        const hashedPassword = await bcryptjs.hash(password, 12);

        const user = new User({ email, password: hashedPassword});
        await user.save();

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }

}