import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  gifService = inject(GifService);
  searchGifs = signal<Gif[]>([]);

  onSearch(searchValue: string) {
    if (searchValue.trim().length > 0) {
      this.gifService
        .getSearchGifs(searchValue)
        .subscribe((response) => this.searchGifs.set(response));
    }
  }
}
