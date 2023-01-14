import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../../database";
import { User } from "../../entities/User";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: PrismaClient;
    constructor() {
        this.repository = prisma;
    }

    async create({
        name,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();
        Object.assign(user, {
            name,
            password,
            email,
            driver_license,
        });

        await this.repository.user.create({
            data: user,
        });
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.user.findFirst({ where: { email } });
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.user.findFirst({ where: { id } });
        return user;
    }
}

export { UsersRepository };
