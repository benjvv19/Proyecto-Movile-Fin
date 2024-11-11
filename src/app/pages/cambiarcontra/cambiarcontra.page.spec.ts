import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarcontraPage } from './cambiarcontra.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('CambiarcontraPage', () => {
  let component: CambiarcontraPage;
  let fixture: ComponentFixture<CambiarcontraPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CambiarcontraPage],
      imports: [IonicModule, FormsModule, CommonModule],
      providers: [
        ServicebdService,
        { provide: SQLite, useValue: jasmine.createSpyObj('SQLite', ['create', 'openDatabase']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CambiarcontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
