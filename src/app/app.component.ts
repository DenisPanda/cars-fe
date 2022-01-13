import { AppTheme } from './enums/app-theme.enum';
import { ThemeService } from './services/theme.service';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  themeEnum = AppTheme;
  appTheme$ = this.tS.appTheme$;

  constructor(titleS: Title, private tS: ThemeService){

    this.tS.appTheme = AppTheme.default;

    // set page title depending on the build
    titleS.setTitle(env.title || 'Default Title');
  }

  toggleTheme() {
    this.tS.appTheme =
      this.tS.appTheme == AppTheme.default ? AppTheme.light : AppTheme.default;
  }
}
