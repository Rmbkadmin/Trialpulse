import { ReviewsService } from "./reviews.service";
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(body: any): import("@prisma/client").Prisma.Prisma__ReviewClient<{
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
    deleteReview(id: string, req: any): import("@prisma/client").Prisma.Prisma__ReviewClient<{
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
