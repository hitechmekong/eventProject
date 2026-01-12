/**
 * QR Code Generator Utility
 * Generates QR codes for guest check-in
 */

import QRCode from 'qrcode';

export interface QRCodeOptions {
    width: number;
    margin: number;
    color: {
        dark: string;
        light: string;
    };
}

const defaultOptions: QRCodeOptions = {
    width: 300,
    margin: 2,
    color: {
        dark: '#000000',
        light: '#ffffff'
    }
};

/**
 * Generate a QR code as data URL (base64)
 */
export const generateQRCodeDataURL = async (
    content: string,
    options: Partial<QRCodeOptions> = {}
): Promise<string> => {
    const opts = { ...defaultOptions, ...options };

    return QRCode.toDataURL(content, {
        width: opts.width,
        margin: opts.margin,
        color: opts.color
    });
};

/**
 * Generate check-in URL for a guest
 */
export const generateCheckinURL = (
    baseUrl: string,
    eventId: string,
    ticketCode: string
): string => {
    return `${baseUrl}/checkin?event=${eventId}&code=${ticketCode}`;
};

/**
 * Generate QR code for guest check-in
 */
export const generateGuestQRCode = async (
    baseUrl: string,
    eventId: string,
    ticketCode: string,
    options: Partial<QRCodeOptions> = {}
): Promise<string> => {
    const url = generateCheckinURL(baseUrl, eventId, ticketCode);
    return generateQRCodeDataURL(url, options);
};

export default { generateQRCodeDataURL, generateCheckinURL, generateGuestQRCode };
