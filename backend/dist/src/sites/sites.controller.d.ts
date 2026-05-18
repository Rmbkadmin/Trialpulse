import { SitesService } from "./sites.service";
export declare class SitesController {
    private readonly sitesService;
    constructor(sitesService: SitesService);
    create(body: any, req: any): import("@prisma/client").Prisma.Prisma__ResearchSiteClient<{
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
