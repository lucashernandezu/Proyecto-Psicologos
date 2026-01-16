import crypto from 'crypto';

export const generateToken = (length: number = 32): string => {
    return crypto.randomBytes(length).toString('hex');
};

export const getTokenExpiration = (hours: number = 1): Date => {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + hours);
    return expirationDate;
};

export const isTokenExpired = (expiresAt: Date): boolean => {
    return new Date() > expiresAt;
};
