import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleboletasPage } from './detalleboletas.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DetalleboletasPage', () => {
  let component: DetalleboletasPage;
  let fixture: ComponentFixture<DetalleboletasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleboletasPage],
      imports: [IonicModule, FormsModule, CommonModule],
      providers: [
        ServicebdService,
        { provide: SQLite}, 
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id_venta: '123' }) 
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleboletasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
