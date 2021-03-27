import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TrailerModule } from './trailer/trailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TrailerModule
  ],

})
export class AppModule { }
