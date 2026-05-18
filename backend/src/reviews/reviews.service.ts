import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    userId: string;
    siteId: string;
    overallRating: number;
    communicationScore: number;
    professionalismScore: number;
    experienceScore: number;
    reviewText: string;
  }) {
    return this.prisma.review.create({ data });
  }

  findBySite(siteId: string) {
    return this.prisma.review.findMany({
      where: { siteId },
      include: { user: true, site: true },
    });
  }
  delete(reviewId: string) {
  return this.prisma.review.delete({
    where: { id: reviewId },
  });
}
}