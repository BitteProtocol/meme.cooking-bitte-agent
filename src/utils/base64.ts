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

  // Process all images the same way
  const image = sharp(buffer);
  const resizedBuffer = await image
    .resize(96, 96)
    .toFormat('png')
    .toBuffer();

  const base64String = resizedBuffer.toString('base64');
  return `data:image/png;base64,${base64String}`;
};

export const dataUriToBlob = (dataUri: string): Blob => {
  const byteString = atob(dataUri.split(",")[1]);
  const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};