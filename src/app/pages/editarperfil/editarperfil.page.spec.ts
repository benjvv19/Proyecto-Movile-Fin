import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarperfilPage } from './editarperfil.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

class MockSQLite {
  executeSql(query: string, params: any[]): Promise<any> {
    return Promise.resolve();
  }
}

describe('EditarperfilPage', () => {
  let component: EditarperfilPage;
  let fixture: ComponentFixture<EditarperfilPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarperfilPage],  
      providers: [
        ServicebdService,
        { provide: SQLite, useClass: MockSQLite }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarperfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();  
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
  
  it('Valida si un correo no tiene @', () => {
    const correoInvalido1 = 'ejemplo.gmail.com';
    const resultado = component.validarCorreo(correoInvalido1);
    expect(resultado).toBeFalse();
  });


  it('Valida si un correo no tiene un punto', () => {
    const correoInvalido2 = 'ejemplo@gmail';
    const resultado = component.validarCorreo(correoInvalido2);
    expect(resultado).toBeFalse();
  });

  it('Valida si el correo esta vacio', () => {
    const correoInvalido3 = '';
    const resultado = component.validarCorreo(correoInvalido3);
    expect(resultado).toBeFalse();
  });

});
