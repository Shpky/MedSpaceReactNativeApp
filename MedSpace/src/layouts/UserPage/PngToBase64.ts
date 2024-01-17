import RNFS from 'react-native-fs';

/**
 * Converts a PNG image file to a base64 string.
 * @param pngImage The path to the PNG image file.
 * @returns A promise that resolves with the base64 string of the image, or null if there was an error.
 */
export async function convertPngToBase64(pngImage: string): Promise<string | null> {
    const binaryString = await RNFS.readFile(pngImage, 'base64');
    return binaryString;
}