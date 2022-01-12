import { UiService } from './ui.service';
import { AppTheme } from './../enums/app-theme.enum';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _appTheme$$!: BehaviorSubject<string | AppTheme>;
  /**
   * Current applied appTheme stream
   */
  appTheme$!: Observable<string | AppTheme>;

  /**
   * Previously applied theme
  */
  previousTheme!: string | AppTheme;

  constructor(
    private uiS: UiService
  ) {
    this._appTheme$$ = new BehaviorSubject('' as (string | AppTheme));
    this.appTheme$ = this._appTheme$$.asObservable();
    this.appTheme = '';
  }

  /**
   * Get/set current appTheme
   */
  set appTheme(theme: string | AppTheme) {
    if (this._appTheme$$.value !== theme) {
      this._appTheme$$.next(theme);

      // if another theme is applied, remove the old one
      this.uiS.removeBodyClass(this.previousTheme);
      this.uiS.setBodyClass(theme)
      this.previousTheme = theme;
    }
  }

  get appTheme(): string | AppTheme {
    return this._appTheme$$.value;
  }
}
