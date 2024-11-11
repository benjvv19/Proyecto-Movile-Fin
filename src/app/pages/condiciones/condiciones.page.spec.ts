import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CondicionesPage } from './condiciones.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

describe('CondicionesPage', () => {
  let component: CondicionesPage;
  let fixture: ComponentFixture<CondicionesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CondicionesPage],
      imports: [IonicModule, FormsModule, CommonModule],
      providers: [
        ServicebdService,
        { provide: SQLite} 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CondicionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
