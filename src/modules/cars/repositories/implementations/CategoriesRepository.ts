import { Category } from "../../entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

import { prisma } from "../../../../database";
import { PrismaClient } from "@prisma/client";

class CategoriesRepository implements ICategoriesRepository {
    private repository: PrismaClient;

    private static INSTANCE: CategoriesRepository;

    constructor() {
        this.repository = prisma;
    }

    // public static getInstance(): CategoriesRepository {
    //     if (!CategoriesRepository.INSTANCE) {
    //         CategoriesRepository.INSTANCE = new CategoriesRepository();
    //     }
    //     return CategoriesRepository.INSTANCE;
    // }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();
        Object.assign(category, { name, description });

        await this.repository.category.create({
            data: {
                name: category.name,
                description: category.description,
            },
            select: {
                id: true,
            },
        });
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.category.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                created_at: true,
            },
        });
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.category.findFirst({
            where: {
                name: {
                    equals: name,
                },
            },
        });
        return category;
    }
}

export { CategoriesRepository };
