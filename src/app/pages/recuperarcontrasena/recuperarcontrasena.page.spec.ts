import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarcontrasenaPage } from './recuperarcontrasena.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';




describe('RecuperarcontrasenaPage', () => {
  let component: RecuperarcontrasenaPage;
  let fixture: ComponentFixture<RecuperarcontrasenaPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperarcontrasenaPage],
      providers: [
        { provide: ServicebdService},
        { provide: SQLite},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarcontrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Valida y muestra una alerta si la pregunta esta vacia', async () => {
    component.pregunta = '';
    spyOn(component, 'presentAlert'); 
    const result = await component.verificarPregunta();
    expect(result).toBe(false); 
    expect(component.presentAlert).toHaveBeenCalledWith('Pregunta vacía', 'Por favor, seleccione una pregunta de seguridad.');
  });

});
