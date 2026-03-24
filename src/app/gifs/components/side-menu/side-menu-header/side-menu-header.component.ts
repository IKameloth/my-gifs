import { Component } from '@angular/core';
// import { environment } from '../../../../../environments/environment'; // too long <--
import { environment } from '@envs/environment'; // --> alias from tsconfig.json

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
})
export class SideMenuHeaderComponent {
  environmentData = environment;
}
