import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('https://api.meme.cooking/info');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Error fetching info:', error);
        return NextResponse.json(
            { error: 'Failed to fetch info data' },
            { status: 500 }
        );
    }
}
