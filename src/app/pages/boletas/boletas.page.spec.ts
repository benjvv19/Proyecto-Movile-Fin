import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoletasPage } from './boletas.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { IonicModule} from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


describe('BoletasPage', () => {
  let component: BoletasPage;
  let fixture: ComponentFixture<BoletasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoletasPage],
      imports: [IonicModule, FormsModule, CommonModule],
      providers: [
        ServicebdService,
        { provide: SQLite} 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BoletasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
