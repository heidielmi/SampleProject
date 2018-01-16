import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routableComponents, AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PetsService } from './shared/services/pet/index';

@NgModule({
  declarations: [
    AppComponent,
    routableComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ PetsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
