import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServicebdService } from './services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SQLite,ServicebdService, NativeStorage],
  bootstrap: [AppComponent],
})
export class AppModule {}
