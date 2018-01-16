import { Component } from '@angular/core';
import { environment } from '../environments';
@Component({
  selector: 'sample-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample coding practice';
  public environmentName: string = environment.name;
  constructor() {
    console.clear();
   }
}
