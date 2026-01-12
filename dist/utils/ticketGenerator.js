"use strict";
/**
 * Ticket Code Generator Utility
 * Generates random alphanumeric codes for guest tickets
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueCodes = exports.generateTicketCode = void 0;
const defaultOptions = {
    length: 8,
    includeLetters: true,
    includeNumbers: true,
    uppercase: true
};
const generateTicketCode = (options = {}) => {
    const opts = Object.assign(Object.assign({}, defaultOptions), options);
    let chars = '';
    if (opts.includeLetters) {
        chars += opts.uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'abcdefghijklmnopqrstuvwxyz';
    }
    if (opts.includeNumbers) {
        chars += '0123456789';
    }
    if (!chars) {
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }
    let code = '';
    for (let i = 0; i < opts.length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
};
exports.generateTicketCode = generateTicketCode;
const generateUniqueCodes = (count_1, existingCodes_1, ...args_1) => __awaiter(void 0, [count_1, existingCodes_1, ...args_1], void 0, function* (count, existingCodes, options = {}) {
    const existingSet = new Set(existingCodes);
    const newCodes = [];
    let attempts = 0;
    const maxAttempts = count * 10; // Prevent infinite loop
    while (newCodes.length < count && attempts < maxAttempts) {
        const code = (0, exports.generateTicketCode)(options);
        if (!existingSet.has(code) && !newCodes.includes(code)) {
            newCodes.push(code);
            existingSet.add(code);
        }
        attempts++;
    }
    if (newCodes.length < count) {
        throw new Error(`Could not generate ${count} unique codes. Generated ${newCodes.length}.`);
    }
    return newCodes;
});
exports.generateUniqueCodes = generateUniqueCodes;
exports.default = { generateTicketCode: exports.generateTicketCode, generateUniqueCodes: exports.generateUniqueCodes };
