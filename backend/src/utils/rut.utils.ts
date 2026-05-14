export const cleanRut = (rut: string): string => {
    return rut.replace(/\./g, '').trim();
};

export const isValidRutFormat = (rut: string): boolean => {
    const cleanedRut = cleanRut(rut);
    return /^\d{7,8}-[\dkK]$/.test(cleanedRut);
};

export const calculateVerificationDigit = (rutNumbers: string): string => {
    let sum = 0;
    let multiplier = 2;

    for (let i = rutNumbers.length - 1; i >= 0; i--) {
        sum += parseInt(rutNumbers[i]) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const remainder = sum % 11;

    if (remainder === 1) return 'K';
    if (remainder === 0) return '0';

    return (11 - remainder).toString();
};



export const validateRut = (rut: string): boolean => {

    if (!isValidRutFormat(rut)) {
        return false;
    }

    const cleanedRut = cleanRut(rut);

    const [rutNumbers, providedDigit] = cleanedRut.split('-');

    const correctDigit = calculateVerificationDigit(rutNumbers);

    return correctDigit.toUpperCase() === providedDigit.toUpperCase();
};


export const formatRut = (rut: string): string => {

    const cleaned = rut.replace(/[^\dkK]/g, '');

    if (cleaned.length < 2) return cleaned;

    const body = cleaned.slice(0, -1);
    
    const digit = cleaned.slice(-1).toUpperCase();

    const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${formattedBody}-${digit}`;
};
