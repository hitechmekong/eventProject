/**
 * Ticket Code Generator Utility
 * Generates random alphanumeric codes for guest tickets
 */

export interface CodeGeneratorOptions {
    length: number;
    includeLetters: boolean;
    includeNumbers: boolean;
    uppercase: boolean;
}

const defaultOptions: CodeGeneratorOptions = {
    length: 8,
    includeLetters: true,
    includeNumbers: true,
    uppercase: true
};

export const generateTicketCode = (options: Partial<CodeGeneratorOptions> = {}): string => {
    const opts = { ...defaultOptions, ...options };

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

export const generateUniqueCodes = async (
    count: number,
    existingCodes: string[],
    options: Partial<CodeGeneratorOptions> = {}
): Promise<string[]> => {
    const existingSet = new Set(existingCodes);
    const newCodes: string[] = [];
    let attempts = 0;
    const maxAttempts = count * 10; // Prevent infinite loop

    while (newCodes.length < count && attempts < maxAttempts) {
        const code = generateTicketCode(options);
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
};

export default { generateTicketCode, generateUniqueCodes };
