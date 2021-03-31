import { BadRequestException, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TrailerInputDto } from './trailer-input.dto';
import { TrailerService } from './trailer.service';

describe('TrailerService', () => {
  let trailerService: TrailerService;
  const trailerInputDto: TrailerInputDto = {
    vp_link: 'https://content.viaplay.se/pc-se/film/troja-2004',
  };
  const movieIMDB_ID = 'tt0332452';
  const movieMediaURL = 'http://youtu.be/watch?v=enJYNuWBJ9g';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrailerService],
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 2,
        }),
      ],
    }).compile();

    trailerService = module.get<TrailerService>(TrailerService);
  });

  it('should be defined', () => {
    expect(trailerService).toBeDefined();
  });

  it('should return IMDB ID from Viaplay URL', async () => {
    const mediaId = await trailerService.getViaplayIMDB(
      trailerInputDto.vp_link,
    );

    expect(mediaId).toEqual(movieIMDB_ID);
  });

  it('should get media URL from the IMDB ID', async () => {
    const mediaURL = await trailerService.getTrailerMedia(movieIMDB_ID);

    expect(mediaURL).toEqual(movieMediaURL);
  });

  it('should return media URL from Viaplay URL', async () => {
    const mediaURL = await trailerService.getTrailer(trailerInputDto);

    expect(mediaURL).toEqual(movieMediaURL);
  });

  it('should fail to get IMDB ID from invalid Viaplay URL', async () => {
    expect(
      async () => await trailerService.getViaplayIMDB('not-a-url'),
    ).rejects.toThrowError(BadRequestException);
  });

  it('should fail to get media URL from invalid IMDB ID', async () => {
    expect(
      async () => await trailerService.getTrailerMedia('not_valid_id'),
    ).rejects.toThrowError(BadRequestException);
  });

  it('should fail to get media URL from empty IMDB ID', async () => {
    expect(
      async () => await trailerService.getTrailerMedia(''),
    ).rejects.toThrowError(BadRequestException);
  });
});
