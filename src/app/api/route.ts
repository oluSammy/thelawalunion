
import { NextResponse, NextRequest } from "next/server";
// import formidable from "formidable";
// import FormData from "form-data";


export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};

// To handle a POST request to /api
export async function POST(request: NextRequest) {
    const data = await request.formData();

    const files = data.getAll("files");

    console.log({ files }, "data...")

    // Do whatever you want
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
}