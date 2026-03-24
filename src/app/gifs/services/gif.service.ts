import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@envs/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  isLoading = signal<boolean>(true);
  gifsHistory = signal<Record<string, Gif[]>>({});
  gifsHistoryKeys = computed(() => Object.keys(this.gifsHistory()));

  constructor() {
    this.getTrendingGifs();
  }

  getTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyURL}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          offset: 0,
          rating: 'g',
          bundle: 'messaging_non_clips',
        },
      })
      .subscribe((response) => {
        const gifs = GifMapper.mapGiphyItemArrayToGifArray(response.data);
        this.trendingGifs.set(gifs);
        this.isLoading.set(false);
      });
  }

  getSearchGifs(searchValue: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyURL}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          offset: 0,
          rating: 'g',
          bundle: 'messaging_non_clips',
          q: searchValue,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemArrayToGifArray(items)),
        tap(() => this.isLoading.set(false)),
        tap((items) =>
          this.gifsHistory.update((prev) => ({
            ...prev,
            [searchValue.toLowerCase()]: items,
          })),
        ),
      );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.gifsHistory()[query] ?? [];
  }
}
