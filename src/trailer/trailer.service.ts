import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import { TrailerInputDto } from './trailer-input.dto';

@Injectable()
export class TrailerService {
  private youtubeURL = 'http://youtu.be/watch?v=';
  constructor(private http: HttpService) { }

  async getViaplayIMDB(vp_link: string): Promise<string> {
    try {
      const { data } = await this.http.get(vp_link).toPromise();
      // test the JSON path
      // handle better errors
      const { id: imdbID } = data._embedded['viaplay:blocks'][0]?._embedded[
        'viaplay:product'
      ]?.content?.imdb;

      return imdbID;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async getTrailerMedia(imdbId: string): Promise<string> {
    try {
      // test process.env exists
      // handle better errors
      const _URL = `${process.env.TMDB_BASE_URL}movie/${imdbId}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
      const { data } = await this.http.get(_URL).toPromise();
      const { key: firstTrailer } = data.results.find(
        (media) => media.type.toLowerCase() === 'trailer',
      );

      return `${this.youtubeURL}${firstTrailer}`;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async getTrailer(trailerInputDto: TrailerInputDto): Promise<string> {
    const imdbId = await this.getViaplayIMDB(trailerInputDto.vp_link);
    const mediaURL = await this.getTrailerMedia(imdbId);

    return mediaURL;
  }
}
