import { Component } from '@angular/core';
import { ThemeToggleComponent } from '../../theme-toggle/theme-toggle.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeToggleComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {

}
