import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarCategoriaPage } from './agregarcategoria.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

describe('AgregarCategoriaPage', () => {
  let component: AgregarCategoriaPage;
  let fixture: ComponentFixture<AgregarCategoriaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarCategoriaPage],
      imports: [IonicModule, FormsModule, CommonModule],
      providers: [
        ServicebdService,
        { provide: SQLite} ,
        NativeStorage
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
