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
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Process image with minimal size settings
    const resizedBuffer = await sharp(buffer, {
      failOnError: false
    })
      .resize(96, 96, {  // Smaller size for high compression
        fit: 'contain',
        withoutEnlargement: true,
        kernel: 'nearest'
      })
      .webp({
        quality: 40,         // Lower quality for smaller size
        alphaQuality: 40,    // Lower alpha quality
        lossless: false,
        nearLossless: false,
        effort: 6,
        smartSubsample: true,
        mixed: true          // Allow mixed compression
      })
      .toBuffer();

    const base64String = resizedBuffer.toString('base64');
    return `data:image/webp;base64,${base64String}`;
  } catch (error) {
    console.error('Image processing error:', error);
    throw new Error(`Failed to process image: ${error.message}`);
  }
};

export const calculateDeposit = (iconBase64: string): string => {
  // Convert icon to blob to get size
  const iconBlob = dataUriToBlob(iconBase64);
  const iconSizeInBytes = iconBlob.size;

  // Fixed minimum deposit (0.155 NEAR in yoctoNEAR)
  const minDepositYocto = BigInt("155000000000000000000000");

  // Calculate additional deposit based on icon size
  const depositPerByte = BigInt("1000000000000000"); // Additional amount per byte
  const iconSizeDeposit = BigInt(iconSizeInBytes) * depositPerByte;

  // Calculate total deposit
  const calculatedDeposit = minDepositYocto + iconSizeDeposit;

  // Max deposit (0.16 NEAR in yoctoNEAR to give some headroom)
  const maxDepositYocto = BigInt("160000000000000000000000");

  // Ensure we don't exceed max deposit
  return calculatedDeposit > maxDepositYocto ?
    maxDepositYocto.toString() :
    calculatedDeposit.toString();
};

// Helper function to convert yoctoNEAR to NEAR for debugging
export const yoctoToNear = (yoctoAmount: string): number => {
  return Number(BigInt(yoctoAmount)) / 1e24;
};