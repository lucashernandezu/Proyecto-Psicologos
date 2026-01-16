import { Request, Response } from "express";
import authService from "../services/auth.service";

class AuthController {
    async forgotPassword(req: Request, res: Response) {
        try {
            const forgotData = req.body;
            const result = await authService.requestPasswordReset(forgotData)
            res.status(200).json({
                success: result.success,
                message: result.message
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al realizar la solicitud'
            })
        }
    }


    async resetPassword(req: Request, res: Response) {
        try {

            const resetData = req.body

            const result = await authService.resetPassword(resetData)

            res.status(200).json({
                success: result.success,
                message: result.message
            })

        } catch (error) {

            if (error instanceof Error) {
                res.status(400).json({
                    success: false,
                    message: error.message
                })
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Error interno del servidor'
                })
            }

        }
    }

}

export default new AuthController;