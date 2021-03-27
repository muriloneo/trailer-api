import { CacheInterceptor, CACHE_MANAGER, Controller, Get, Inject, NotFoundException, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';

import { TrailerService } from './trailer.service';
import { TrailerInputDto } from './trailer-input.dto';

@Controller('trailer')
@UseInterceptors(CacheInterceptor)
export class TrailerController {
  constructor(private trailerService: TrailerService, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  @Get()
  async getTrailer(@Query(ValidationPipe) trailerInputDto: TrailerInputDto) {
    const hash = uuidv4(trailerInputDto.vp_link);

    let movieMedia;
    try {
      movieMedia = await this.cacheManager.get(hash);
      if (movieMedia) {
        return movieMedia;
      } else {
        movieMedia = this.trailerService.getTrailer(trailerInputDto);
        this.cacheManager.set(hash, movieMedia, { ttl: null });
        return movieMedia;
      }
    } catch (e) {
      throw new NotFoundException;
    }

  }

}
