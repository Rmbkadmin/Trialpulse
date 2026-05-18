import { PrismaService } from "../prisma/prisma.service";
export declare class SitesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        name: string;
        city: string;
        state: string;
        specialty: string;
        therapeuticAreas?: string[];
    }): import("@prisma/client").Prisma.Prisma__ResearchSiteClient<{
        id: string;
        createdAt: Date;
        name: string;
        city: string;
        state: string;
        specialty: string;
        therapeuticAreas: string[];
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        reviews: {
            id: string;
            createdAt: Date;
            overallRating: number;
            communicationScore: number;
            professionalismScore: number;
            experienceScore: number;
            reviewText: string;
            userId: string;
            siteId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        city: string;
        state: string;
        specialty: string;
        therapeuticAreas: string[];
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ResearchSiteClient<({
        reviews: {
            id: string;
            createdAt: Date;
            overallRating: number;
            communicationScore: number;
            professionalismScore: number;
            experienceScore: number;
            reviewText: string;
            userId: string;
            siteId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        city: string;
        state: string;
        specialty: string;
        therapeuticAreas: string[];
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
