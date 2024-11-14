import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarPage } from './agregar.page';
import { ServicebdService } from 'src/app/services/servicebd.service'; 
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('AgregarPage', () => {
  let component: AgregarPage;
  let fixture: ComponentFixture<AgregarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarPage],
      imports: [IonicModule, FormsModule, CommonModule],
      providers: [
        ServicebdService,
        { provide: SQLite }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarPage);
    component = fixture.componentInstance;


    component.presentToast = async (message: string, color: string) => {
      component.errorMessage = message; 
      return Promise.resolve();
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validar si el precio es menor a 0', async () => {
    component.precio = -1;
    const product = { valid: true };

    await component.onSubmit(product);


    expect(component.errorMessage).toBe('El precio no puede ser menor a 0');
  });
});
