import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../services/gif.service';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'gif-history-page',
  imports: [GifListComponent],
  templateUrl: './gif-history-page.component.html',
})
export default class GifHistoryPageComponent {
  gifService = inject(GifService);
  // get params from routes dinamically
  // activeQuery = inject(ActivatedRoute).params.subscribe((params) => {
  //   console.log(params['query']);
  // });
  // the same but in mode signal - the params is a observable
  activeQuery = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query'])),
  );

  gifsByKey = computed(() =>
    this.gifService.getHistoryGifs(this.activeQuery()),
  );
}
