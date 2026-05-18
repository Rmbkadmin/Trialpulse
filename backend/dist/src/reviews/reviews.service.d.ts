import { PrismaService } from "../prisma/prisma.service";
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        userId: string;
        siteId: string;
        overallRating: number;
        communicationScore: number;
        professionalismScore: number;
        experienceScore: number;
        reviewText: string;
    }): import("@prisma/client").Prisma.Prisma__ReviewClient<{
        id: string;
        createdAt: Date;
        overallRating: number;
        communicationScore: number;
        professionalismScore: number;
        experienceScore: number;
        reviewText: string;
        userId: string;
        siteId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findBySite(siteId: string): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            email: string;
            passwordHash: string;
            firstName: string;
            lastName: string;
            role: string;
            verified: boolean;
            createdAt: Date;
        };
        site: {
            id: string;
            createdAt: Date;
            name: string;
            city: string;
            state: string;
            specialty: string;
            therapeuticAreas: string[];
        };
    } & {
        id: string;
        createdAt: Date;
        overallRating: number;
        communicationScore: number;
        professionalismScore: number;
        experienceScore: number;
        reviewText: string;
        userId: string;
        siteId: string;
    })[]>;
    delete(reviewId: string): import("@prisma/client").Prisma.Prisma__ReviewClient<{
        id: string;
        createdAt: Date;
        overallRating: number;
        communicationScore: number;
        professionalismScore: number;
        experienceScore: number;
        reviewText: string;
        userId: string;
        siteId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
