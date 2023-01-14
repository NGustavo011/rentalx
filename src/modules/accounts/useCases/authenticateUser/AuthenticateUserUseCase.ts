import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const errorMessage = "Email or password incorrect!";

        // Usuario existe
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError(errorMessage);
        }

        // Senha está correta
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError(errorMessage);
        }

        // Gerar jsonwebtoken
        const token = sign({}, "259823af837e251e560ca1158a4e77c7", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
