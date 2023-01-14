import { Specification } from "../../entities/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../ISpecificationRepository";
import { prisma } from "../../../../database";
import { PrismaClient } from "@prisma/client";

class SpecificationRepository implements ISpecificationsRepository {
    private repository: PrismaClient;

    constructor() {
        this.repository = prisma;
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = new Specification();
        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });
        await this.repository.specification.create({
            data: {
                name: specification.name,
                description: specification.description,
            },
            select: {
                id: true,
            },
        });
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.specification.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                created_at: true,
            },
        });
        return specifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.specification.findFirst({
            where: {
                name: {
                    equals: name,
                },
            },
        });
        return specification;
    }
}

export { SpecificationRepository };
