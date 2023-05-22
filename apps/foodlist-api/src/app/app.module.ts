import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppUserModule } from './appuser/app-user.module';
import { AuthModule, JwtAuthGuard } from '@foodlist/foodlist-api/auth';
import * as fs from 'fs';
import { RecipeModule } from './recipe/recipe.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SubstanceModule } from './substance/substance.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DBS_HOST,
      port: +process.env.DBS_PORT,
      username: process.env.DBS_USERNAME,
      password: process.env.DBS_PASSWORD,
      database: process.env.DBS_DATABASE,
      ssl: process.env.DBS_CA_LOCATION
        ? {
            ca: fs.readFileSync(process.env.DBS_CA_LOCATION).toString(),
          }
        : undefined,
      autoLoadEntities: true,
    }),
    AuthModule,
    SubstanceModule,
    RecipeModule,
    ShoppingListModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
