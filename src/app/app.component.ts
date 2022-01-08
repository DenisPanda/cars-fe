import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(titleS: Title){

    // set page title depending on the build
    titleS.setTitle(env.title || 'Default Title');
  }
}
