import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SitesModule } from './sites/sites.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [PrismaModule, AuthModule, SitesModule, ReviewsModule],
})
export class AppModule {}