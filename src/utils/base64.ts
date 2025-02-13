import sharp from 'sharp';
import { Buffer } from 'buffer';

export const convertImageUrlToBase64 = async (
  imageUrl: string
): Promise<string> => {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Process image to 16x16 WebP
  const image = sharp(buffer);
  const resizedBuffer = await image
    .resize(32, 32, {
      fit: 'contain',
      kernel: 'nearest'
    })
    .webp({
      quality: 80,        // Good balance between quality and size
      lossless: false,    // Lossy compression for smaller size
      nearLossless: true, // Use near-lossless compression
      effort: 6           // Maximum compression effort
    })
    .toBuffer();

  const base64String = resizedBuffer.toString('base64');
  return `data:image/webp;base64,${base64String}`;
};

export const dataUriToBlob = (dataUri: string): Blob => {
  const byteString = atob(dataUri.split(",")[1]);
  const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];

  const uint8Array = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  return new Blob([uint8Array], { type: mimeString });
};


export const convertImageUrlToBase64HighRes = async (
  imageUrl: string
): Promise<string> => {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Process image to 16x16 WebP
  const image = sharp(buffer);
  const resizedBuffer = await image
    .resize(96, 96, {
      fit: 'contain',
      kernel: 'nearest'
    })
    .webp({
      quality: 80,        // Good balance between quality and size
      lossless: false,    // Lossy compression for smaller size
      nearLossless: true, // Use near-lossless compression
      effort: 6           // Maximum compression effort
    })
    .toBuffer();

  const base64String = resizedBuffer.toString('base64');
  return `data:image/webp;base64,${base64String}`;
};