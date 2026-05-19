import { Module } from "@nestjs/common";

import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { SitesModule } from "./sites/sites.module";
import { ReviewsModule } from "./reviews/reviews.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    SitesModule,
    ReviewsModule,
  ],
})
export class AppModule {}