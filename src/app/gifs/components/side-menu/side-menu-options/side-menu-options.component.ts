import { Component, inject, signal } from '@angular/core';
import { MenuOption } from '../../../interfaces/menu.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/services/gif.service';

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
  gifService = inject(GifService);

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs Populares',
      router: '/dashboard/trending',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar Gifs',
      router: '/dashboard/search',
    },
  ];
}
