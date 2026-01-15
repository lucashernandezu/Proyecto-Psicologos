import { Request, Response } from 'express';
import userService from '../services/user.service';

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
      const loginData = req.body;
      const authResponse = await userService.authenticateUser(loginData);

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

  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const user = await userService.getUserById(userId);

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error al obtener perfil'
        });
      }
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllActiveUsers();

      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener usuarios'
      });
    }
  }

  async getDashboard(req: Request, res: Response) {
    try {
      const stats = await userService.getDashboardStats();

      res.status(200).json({
        success: true,
        data: {
          ...stats,
          userRole: req.user!.role,
          userName: req.user!.email
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener dashboard'
      });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;

      const updateData = req.body;

      const updatedUser = await userService.updateUserProfile(userId, updateData);

      res.status(200).json({
        success: true,
        message: 'Perfil actualizado exitosamente',
        data: updatedUser
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
          message: 'Error al actualizar perfil'
        });
      }
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;

      const { current_password, new_password } = req.body;

      await userService.changeUserPassword(userId, current_password, new_password);

      res.status(200).json({
        success: true,
        message: 'Contraseña actualizada exitosamente'
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
          message: 'Error al cambiar contraseña'
        });
      }
    }
  }



}

export default new UserController();
