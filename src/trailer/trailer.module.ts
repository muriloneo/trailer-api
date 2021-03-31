import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { TrailerController } from './trailer.controller';
import { TrailerService } from './trailer.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
    CacheModule.register({
      ttl: null,
    }),
  ],
  controllers: [TrailerController],
  providers: [TrailerService],
})
export class TrailerModule {}
