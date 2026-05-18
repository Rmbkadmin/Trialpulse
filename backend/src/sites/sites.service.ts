import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SitesService {
  constructor(private prisma: PrismaService) {}

create(data: {
  name: string;
  city: string;
  state: string;
  specialty: string;
  therapeuticAreas?: string[];
}) {
  return this.prisma.researchSite.create({ data });
}

  findAll() {
  return this.prisma.researchSite.findMany({
    include: { reviews: true },
  });
}

  findOne(id: string) {
    return this.prisma.researchSite.findUnique({
      where: { id },
      include: { reviews: true },
    });
  }
}