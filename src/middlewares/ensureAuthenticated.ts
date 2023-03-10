import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAutheticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const token = authHeader.split(" ")[1];
    try {
        const { sub: userId } = verify(
            token,
            "259823af837e251e560ca1158a4e77c7"
        ) as IPayload;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(userId);
        if (!user) {
            throw new AppError("User does not exists!", 401);
        }

        request.user = {
            id: userId,
        };

        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}
