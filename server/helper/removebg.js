import 'dotenv/config';
import fetch, { FormData, fileFromSync } from 'node-fetch';
import path from 'path';


export default async function removeBackground(imagePath, outputFileName) {
    const apiKey = process.env.API_KEY;
    const url = `https://api.apyhub.com/processor/image/remove-background/file?output=${outputFileName}`

    if(!apiKey) {
        throw new Error("Missing API_KEY in environment variable");
    }
    
    const form = new FormData();
    form.append('image', fileFromSync(imagePath));

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'apy-token': apiKey,
        },
        body: form
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error: ${error}`);
    }

    return await response.arrayBuffer();
    
}