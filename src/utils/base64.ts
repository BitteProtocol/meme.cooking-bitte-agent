export const convertImageUrlToBase64 = async (
  imageUrl: string
): Promise<string> => {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  const blob = await response.blob();
  const imageBitmap = await createImageBitmap(blob);

  // Create a canvas to resize the image
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const size = 96; // Desired width and height
  canvas.width = size;
  canvas.height = size;

  if (!ctx) {
    throw new Error("Failed to get 2D context");
  }
  // Draw the image onto the canvas, resizing it to 96x96
  ctx.drawImage(imageBitmap, 0, 0, size, size);

  // Convert the canvas to a base64 string
  const base64String = canvas.toDataURL(response.headers.get("content-type") || "image/jpeg");

  return base64String;
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