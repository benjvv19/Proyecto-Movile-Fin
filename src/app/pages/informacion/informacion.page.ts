import { Component } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage {
  async openInstagram() {
    await Browser.open({ url: 'https://www.instagram.com/kicksp0rt/' });
  }
}
