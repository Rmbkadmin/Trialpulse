import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ReviewsService } from "./reviews.service";

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() body: any) {
    return this.reviewsService.create(body);
  }

  @Get("site/:siteId")
  findBySite(@Param("siteId") siteId: string) {
    return this.reviewsService.findBySite(siteId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  deleteReview(@Param("id") id: string, @Req() req: any) {
    if (req.user.role !== "ADMIN") {
      throw new UnauthorizedException("Admin access required");
    }

    return this.reviewsService.delete(id);
  }
}