import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './services/api.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Params, appConfig } from './services/AppConfig';
import { FormsModule } from '@angular/forms';
import { LoginPageModule } from './pages/login/login.module';
import { LoginPage } from './pages/login/login.page';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [LoginPage],
  imports: [
    LoginPageModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonicModule.forRoot(
      { mode: 'ios' }
    ),],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: ApiService, multi: true },
    { provide: Params, useValue: appConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
