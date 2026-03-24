import type { Gif } from '../interfaces/gif.interface';
import type { GiphyItem } from '../interfaces/giphy.interface';

export class GifMapper {
  static mapGiphyItemToGif(giphyItem: GiphyItem): Gif {
    return {
      id: giphyItem.id,
      title: giphyItem.title,
      url: giphyItem.images.original.url,
    };
  }

  static mapGiphyItemArrayToGifArray(giphyItemArray: GiphyItem[]): Gif[] {
    return giphyItemArray.map(this.mapGiphyItemToGif);
  }
}
