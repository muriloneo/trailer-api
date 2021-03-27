import { BadRequestException, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TrailerInputDto } from './trailer-input.dto';
import { TrailerService } from './trailer.service';

describe('TrailerService', () => {
  let trailerService: TrailerService;
  const trailerInputDto: TrailerInputDto = { vp_link: 'https://content.viaplay.se/pc-se/film/arrival-2016' };
  const arrivalIMDB_ID = 'tt2543164';
  const arrivalMediaURL = 'http://youtu.be/watch?v=tFMo3UJ4B4g';


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrailerService],
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 2,
        })
      ]
    }).compile();

    trailerService = module.get<TrailerService>(TrailerService);
  });

  it('should be defined', () => {
    expect(trailerService).toBeDefined();
  });

  it('should return IMDB ID from Viaplay URL', async () => {
    const mediaId = await trailerService.getViaplayIMDB(trailerInputDto.vp_link);

    expect(mediaId).toEqual(arrivalIMDB_ID);
  });

  it('should get media URL from the IMDB ID', async () => {
    const mediaURL = await trailerService.getTrailerMedia(arrivalIMDB_ID);

    expect(mediaURL).toEqual(arrivalMediaURL);
  });

  it('should return media URL from Viaplay URL', async () => {
    const mediaURL = await trailerService.getTrailer(trailerInputDto);

    expect(mediaURL).toEqual(arrivalMediaURL);
  });

  it('should fail to get IMDB ID from invalid Viaplay URL', async () => {
    expect(async () => await trailerService.getViaplayIMDB('not-a-url')).rejects.toThrowError(BadRequestException);
  });

  it('should fail to get media URL from invalid IMDB ID', async () => {
    expect(async () => await trailerService.getTrailerMedia('not_valid_id')).rejects.toThrowError(BadRequestException);
  });
});
