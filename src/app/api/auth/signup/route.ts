import { NextResponse, NextRequest } from 'next/server';

export async function POST (request: NextRequest) {
    const body = await request.json();
    const res = await fetch(process.env.BACKEND_URL+'/auth/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    const user = await res.text()
   
    return NextResponse.json({ data: user }, { status: 200 });
}