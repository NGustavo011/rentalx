import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../../database";
import { User } from "../../entities/User";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateAvatarDTO } from "../dtos/IUpdateAvatarDTO";
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
        avatar,
        id,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();
        Object.assign(user, {
            id,
            name,
            password,
            email,
            driver_license,
            avatar,
        });

        await this.repository.user.create({
            data: user,
        });
    }

    async updateAvatar({ avatar, id }: IUpdateAvatarDTO): Promise<void> {
        await this.repository.user.update({ data: { avatar }, where: { id } });
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
