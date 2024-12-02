import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        console.log('Received request:', request.url);
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');
        const symbol = searchParams.get('symbol');
        const depositTokenId = searchParams.get('depositTokenId') || 'wrap.near';
        const softCap = searchParams.get('softCap') || '100000000000000000000000000';
        const hardCap = searchParams.get('hardCap') || '500000000000000000000000000';
        const durationMs = searchParams.get('durationMs') || '3600000';
        const description = searchParams.get('description') || '';
        const imageUrl = searchParams.get('imageUrl') || '';
        console.log('Request parameters:', {
            name,
            symbol,
            depositTokenId,
            softCap,
            hardCap,
            durationMs,
            description,
            imageUrl
        });

        if (!name || !symbol) {
            console.log('Missing required parameters');
            return NextResponse.json({
                error: 'name and symbol are required parameters'
            }, { status: 400 });
        }

        const referenceMetadata = {
            "description": description,
            "twitterLink": "",
            "telegramLink": "",
            "website": ""
        };

        // Create form data
        const formData = new FormData();
        const imageResponse = await fetch(imageUrl);
        const imageBlob = await imageResponse.blob();
        // Fetch image from URL and create file
        const contentType = imageResponse.headers.get('content-type');
        let fileExtension = 'webp'; // default
        if (contentType === 'image/gif') {
            fileExtension = 'gif';
        } else if (contentType === 'image/jpeg') {
            fileExtension = 'jpg';
        } else if (contentType === 'image/png') {
            fileExtension = 'png';
        } else if (contentType === 'image/avif') {
            fileExtension = 'avif';
        }

        formData.append('imageFile', imageBlob, `image.${fileExtension}`);

        // Add reference metadata
        formData.append('reference', JSON.stringify(referenceMetadata));

        console.log('Sending request to meme.cooking API...');
        // Upload reference metadata
        const uploadResponse = await fetch('https:/meme.cooking/api/create', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.6',
                'Origin': 'https://meme.cooking',
                'Referer': 'https://meme.cooking/create'
            }
        });

        const { referenceCID, imageCID } = await uploadResponse.json();
        console.log('Received reference from meme.cooking:', referenceCID);

        if (!referenceCID) {
            console.log('Failed to generate reference metadata');
            return NextResponse.json({
                error: 'Failed to generate reference metadata'
            }, { status: 500 });
        }

        const transactionPayload = {
            receiverId: 'meme-cooking.near',
            actions: [
                {
                    type: 'FunctionCall',
                    params: {
                        methodName: 'create_meme',
                        args: {
                            duration_ms: durationMs,
                            name,
                            symbol,
                            icon: imageCID,
                            decimals: 18,
                            total_supply: '1000000000000000000000000000',
                            reference: referenceCID,
                            reference_hash: "",
                            deposit_token_id: depositTokenId,
                            soft_cap: softCap,
                            hard_cap: hardCap
                        },
                        gas: '300000000000000',
                        deposit: '123560000000000000000000'
                    }
                }
            ]
        };

        console.log('Generated transaction payload:', transactionPayload);
        return NextResponse.json({ transactionPayload });

    } catch (error) {
        console.error('Error generating meme creation transaction payload:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        const errorStack = error instanceof Error ? error.stack : undefined;

        console.error('Error details:', {
            message: errorMessage,
            stack: errorStack,
            type: error?.constructor?.name
        });

        return NextResponse.json({
            error: 'Failed to generate meme creation transaction payload',
            details: {
                message: errorMessage,
                type: error?.constructor?.name
            }
        }, { status: 500 });
    }
}
