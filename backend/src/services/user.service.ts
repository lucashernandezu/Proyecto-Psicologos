import prisma from '../config/database'
import { RegisterUserDTO, UpdateUserDTO, LoginUserDTO, UserResponse, AuthResponse } from '../types/user.types'
import { hashPassword, comparePassword } from '../utils/password.utils';
import { generateToken } from '../utils/jwt.utils';

class UserService {
    async createUser(data: RegisterUserDTO): Promise<UserResponse> {

        const existingEmail = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (existingEmail) {
            throw new Error('El email ya esta registrado');
        }

        const existingRut = await prisma.user.findUnique({
            where: { rut: data.rut }
        });

        if (existingRut) {
            throw new Error('El rut ya esta registrado')
        }

        const hashedPassword = await hashPassword(data.password);

        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                role: data.role,
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                rut: data.rut,
            }
        });

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;

    }

    async authenticateUser(data: LoginUserDTO): Promise<AuthResponse> {

        const user = await prisma.user.findUnique({
            where: { email: data.email }
        })

        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        if (!user.is_active) {
            throw new Error('Usuario desactivado');
        }

        const isPasswordValide = await comparePassword(data.password, user.password);

        if (!isPasswordValide) {
            throw new Error('Credenciales invalidas')
        }

        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role
        });

        const { password, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token
        };

    }

    async getUserById(userId: number): Promise<UserResponse> {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async getAllActiveUsers(): Promise<UserResponse[]> {
        const users = await prisma.user.findMany({
            where: { is_active: true }
        });

        return users.map(({ password, ...user }) => user);
    }

    async getDashboardStats() {
        return {
            totalUsers: await prisma.user.count(),
            totalPatients: await prisma.registeredPatient.count(),
            totalPsychologists: await prisma.psychologist.count(),
            totalAppointments: await prisma.appointment.count()
        };
    }


}

export default new UserService();