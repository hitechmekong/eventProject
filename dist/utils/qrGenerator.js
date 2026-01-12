"use strict";
/**
 * QR Code Generator Utility
 * Generates QR codes for guest check-in
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGuestQRCode = exports.generateCheckinURL = exports.generateQRCodeDataURL = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const defaultOptions = {
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
const generateQRCodeDataURL = (content_1, ...args_1) => __awaiter(void 0, [content_1, ...args_1], void 0, function* (content, options = {}) {
    const opts = Object.assign(Object.assign({}, defaultOptions), options);
    return qrcode_1.default.toDataURL(content, {
        width: opts.width,
        margin: opts.margin,
        color: opts.color
    });
});
exports.generateQRCodeDataURL = generateQRCodeDataURL;
/**
 * Generate check-in URL for a guest
 */
const generateCheckinURL = (baseUrl, eventId, ticketCode) => {
    return `${baseUrl}/checkin?event=${eventId}&code=${ticketCode}`;
};
exports.generateCheckinURL = generateCheckinURL;
/**
 * Generate QR code for guest check-in
 */
const generateGuestQRCode = (baseUrl_1, eventId_1, ticketCode_1, ...args_1) => __awaiter(void 0, [baseUrl_1, eventId_1, ticketCode_1, ...args_1], void 0, function* (baseUrl, eventId, ticketCode, options = {}) {
    const url = (0, exports.generateCheckinURL)(baseUrl, eventId, ticketCode);
    return (0, exports.generateQRCodeDataURL)(url, options);
});
exports.generateGuestQRCode = generateGuestQRCode;
exports.default = { generateQRCodeDataURL: exports.generateQRCodeDataURL, generateCheckinURL: exports.generateCheckinURL, generateGuestQRCode: exports.generateGuestQRCode };
