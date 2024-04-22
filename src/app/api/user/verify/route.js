import { NextResponse } from "next/server";
import { UserVarification } from "@/app/lib/model/userVerify";
// import { Product} from '../../lib/model/products'
import mongoose from "mongoose";
import { con } from "@/app/lib/db";
import { User } from "@/app/lib/model/user";

export async function GET(request, res) {
    // let records;
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('_id') || '';
        const uniqueSting = searchParams.get('uniqueSting') || '';
        console.log("---", userId, uniqueSting);
        await mongoose.connect(process.env.MONGODB)
        try {
            const result = await UserVarification.find({ userId })
            console.log("res", result.length);
            let message;

            if (result.length > 0) {
                const { expiresAt } = result[0];
                if (expiresAt < Date.now()) {
                    try {
                        await UserVarification.deleteOne({ userId })
                        try {
                            await User.deleteOne({ _id: userId })
                            message = "Link has expired. please sign up again.";
                            return NextResponse.redirect(`/user/varified/error=true&message=${message}`)
                        } catch (err) {
                            console.log("1", err);
                            message = "Clearing user with expired unique string failed"
                            return NextResponse.redirect(`/user/varified/error=true&message=${message}`)
                        }

                    } catch (err) {
                        console.log("2", err);
                        message = "An error occured while clearing expired user";
                        return NextResponse.redirect(`/user/verified/error=true&message=${message}`);
                    }

                } else {
                    // valid record exist so update the user string
                    try {

                        await User.updateOne({ _id: userId }, { varified: true })
                        try {
                            await UserVarification.deleteOne({ userId })
                            message = "User Registeration was successfull"
                            return NextResponse.json({ url: `/user/varified/error=true&message=${message}`, success: true })
                        } catch (err) {
                            console.log("3", err);
                            message = "An error occured whilefizing successful verification."
                            // res.redirect(`/user/varified/error=true & message=${message}`)              
                            return NextResponse.json({ url: `/user/varified/error=true&message=${message}` })
                        }

                    } catch (err) {
                        console.log("4", err);
                        message = "An error occured while Updating user record to show varified."
                        // res.redirect(`/user/varified/error=true & message=${message}`)
                        return NextResponse.json({ url: `/user/varified/error=true&message=${message}` })
                    }

                }

            } else {
                message = "Account record does't exist or has been varified already. please sign up or login in."
                // res.redirect(`/user/varified/error=true & message=${message}`)
                return NextResponse.json({ url: `/user/varified/error=true&message=${message}` })
            }

        } catch (err) {
            message = "An Error occured while checking for existing user varification records."
            // res.redirect(`/user/varified/error=true & message=${message}`)
            return NextResponse.json({ url: `/user/varified/error=true & message=${message}` })

        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal server error', success: false });
    }
}

