/**
 * Represents a QR code as a data URL.
 */
export type QRCodeDataURL = string;

/**
 * Asynchronously generates a QR code data URL from the given text.
 *
 * @param text The text to encode in the QR code.
 * @returns A promise that resolves to a QRCodeDataURL.
 */
export async function generateQRCode(text: string): Promise<QRCodeDataURL> {
  // TODO: Implement this by calling an API.
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAPYSURBvoQAAAABJRU5ErkJggg==';
}
