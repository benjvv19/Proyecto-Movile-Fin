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
        { provide: SQLite} 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
