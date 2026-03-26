import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@envs/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';
import { chunkArray } from '../shared/utils';

const GIFS_LOCAL_STORAGE_KEY = 'gifs';
const LIMIT_PER_GIFS = 20;

function getGifsFromLocalStorage() {
  const results = localStorage.getItem(GIFS_LOCAL_STORAGE_KEY) ?? '{}';
  const gifs = JSON.parse(results);

  return gifs;
}

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);
  private trendingPage = signal<number>(0);

  trendingGifs = signal<Gif[]>([]);
  isLoadingTrendingGifs = signal<boolean>(false);
  gifsHistory = signal<Record<string, Gif[]>>(getGifsFromLocalStorage());
  gifsHistoryKeys = computed(() => Object.keys(this.gifsHistory()));
  isLoading = signal<boolean>(false);

  constructor() {
    this.getTrendingGifs();
  }

  saveGifsOnStorage = effect(() => {
    const historyString = JSON.stringify(this.gifsHistory());
    localStorage.setItem(GIFS_LOCAL_STORAGE_KEY, historyString);
  });

  trendinfGifsGroup = computed<Gif[][]>(() =>
    chunkArray(this.trendingGifs(), 3),
  );

  getTrendingGifs() {
    if (this.isLoadingTrendingGifs()) return;
    this.isLoadingTrendingGifs.set(true);

    this.http
      .get<GiphyResponse>(`${environment.giphyURL}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: LIMIT_PER_GIFS,
          offset: this.trendingPage() * LIMIT_PER_GIFS,
          rating: 'g',
          bundle: 'messaging_non_clips',
        },
      })
      .subscribe((response) => {
        const gifs = GifMapper.mapGiphyItemArrayToGifArray(response.data);
        this.trendingGifs.update((prevGifs) => [...prevGifs, ...gifs]);
        this.trendingPage.update((prevPage) => prevPage + 1);
        this.isLoadingTrendingGifs.set(false);
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
