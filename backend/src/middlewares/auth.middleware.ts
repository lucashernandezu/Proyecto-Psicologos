import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { Role } from '@prisma/client';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({
                success: false,
                message: 'Token no proporcionado'
            });
            return;
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Token no proporcionado'
            });
            return;
        }

        const decoded = verifyToken(token);

        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role
        };

        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token invalido o expirado'
        })
    }
}

export const authorizeRoles = (allowedRoles: Role[]): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {

        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Usuario no autenticado'
            });
            return;
        }

        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: 'No tienes permisos para acceder a este recurso'
            });
            return;
        }
        next();

    }
}

