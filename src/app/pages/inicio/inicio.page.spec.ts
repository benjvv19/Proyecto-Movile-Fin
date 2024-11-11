import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioPage } from './inicio.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

class ServicebdServiceMock {
  dbState() {
    return of(true);
  }

  fetchZapatillas() {
    return of([
      {
        id_zapatilla: '1',
        nombre: 'Zapatilla 1',
        descripcion: 'Descripción de Zapatilla 1',
        imagen_url: 'url_imagen_1',
        precio: '100',
        id_marca: '1',
        id_categoria: '2'
      },
      {
        id_zapatilla: '2',
        nombre: 'Zapatilla 2',
        descripcion: 'Descripción de Zapatilla 2',
        imagen_url: 'url_imagen_2',
        precio: '150',
        id_marca: '2',
        id_categoria: '3'
      }
    ]);
  }
}

describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;
  let service: ServicebdServiceMock;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InicioPage],
      providers: [
        { provide: ServicebdService, useClass: ServicebdServiceMock },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    service = TestBed.inject(ServicebdService) as unknown as ServicebdServiceMock;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
