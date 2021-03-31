import { IsNotEmpty, Matches } from 'class-validator';

export class TrailerInputDto {
  @IsNotEmpty()
  @Matches('^https://content.viaplay.se/pc-se/film/([\\w-]+)')
  vp_link: string;
}
