import { Request, Response } from 'express'
import userService from '../services/user.service'
import { success } from 'zod';

class UserController {
    async register(req: Request, res: Response) {
        try {
            const userData = req.body;

            const newUser = await userService.createUser(userData);

            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: newUser
            });

        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({
                    success: false,
                    message: error.message
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Error interno del servidor'
                });

            }
        }

    }

    async login(req: Request, res: Response) {
        try {
            const loginData = req.body
            const authResponse = await userService.authenticateUser(loginData)

            res.status(200).json({
                success: true,
                message: 'Inicio de sesión exitoso',
                data: authResponse
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({
                    success: false,
                    message: error.message
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Error interno del servidor'
                });
            }
        }
    }
}

export default new UserController();