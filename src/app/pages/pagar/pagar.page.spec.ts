import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagarPage } from './pagar.page';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('PagarPage', () => {
  let component: PagarPage;
  let fixture: ComponentFixture<PagarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagarPage],
      imports: [IonicModule, FormsModule, CommonModule],
      providers: [
        ServicebdService,
        { provide: SQLite} ,
        NativeStorage
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PagarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Calcula el total como 0 cuando el carrito esta vacio', () => {
    
    component.productosCarrito = [];

    component.calcularTotal();

    expect(component.totalPagar).toBe(0);
  });
});
