import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://my.api.mockaroo.com/terminos.json?key=fde773a0';

  constructor(private http: HttpClient) { }

  obtenerTerminos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}