import { BadRequestException, CacheModule, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TrailerController } from './trailer.controller';
import { TrailerService } from './trailer.service';

describe('TrailerController', () => {
  let trailerController: TrailerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrailerController, TrailerService],
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 2,
        }),
        CacheModule.register({
          ttl: null
        })
      ]
    }).compile();

    trailerController = module.get<TrailerController>(TrailerController);
  });

  it('should fail with empty params on getTrailer', async () => {
    expect(async () => await trailerController.getTrailer({ vp_link: '' })).rejects.toThrow(BadRequestException);
  })
});