import prisma from '../config/database'
import { RegisterUserDTO, UpdateUserDTO, LoginUserDTO, UserResponse } from '../types/user.types'
import { hashPassword } from '../utils/password.utils';

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

}

export default new UserService();