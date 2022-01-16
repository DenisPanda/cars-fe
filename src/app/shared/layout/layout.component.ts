import { UiService } from './../../services/ui.service';
import { AuthService } from './../../services/auth.service';
import { environment } from './../../../environments/environment';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  title = environment.headerTitle;

  email: string | null = null;

  constructor(private authS: AuthService, private uiS: UiService) { }

  ngOnInit(): void {
    this._subs.push(
      this.authS.loggedIn$.subscribe(
        (loggedIn) => {
          if (loggedIn) {
            this.email = this.authS.user?.email || null;
            return;
          }

          this.email = null;
        }
    ))
  }

  logout(): void {
    this.authS.logout();
    this.uiS.snack('Successfully logged out!');
  }

  ngOnDestroy(): void {
    this._subs.forEach(s => s.unsubscribe());
  }
}
