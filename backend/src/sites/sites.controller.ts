import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { SitesService } from "./sites.service";

@Controller("sites")
export class SitesController {
  constructor(
    private readonly sitesService: SitesService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() body: any,
    @Req() req: any
  ) {
    if (req.user.role !== "ADMIN") {
      throw new UnauthorizedException(
        "Admin access required"
      );
    }

    return this.sitesService.create(body);
  }

  @Get()
  findAll() {
    return this.sitesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.sitesService.findOne(id);
  }
}