import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    userId: string;
    avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository
    ) {}
    async execute({ userId, avatarFile }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(userId);

        if (user.avatar) {
            deleteFile(`./tmp/avatar/${user.avatar}`);
        }

        user.avatar = avatarFile;
        await this.usersRepository.updateAvatar({
            id: userId,
            avatar: user.avatar,
        });
    }
}
export { UpdateUserAvatarUseCase };
