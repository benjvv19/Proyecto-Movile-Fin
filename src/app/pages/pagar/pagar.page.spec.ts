import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagarPage } from './pagar.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

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
});
