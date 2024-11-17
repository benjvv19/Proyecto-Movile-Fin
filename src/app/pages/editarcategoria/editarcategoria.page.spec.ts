import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarcategoriaPage } from './editarcategoria.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('EditarcategoriaPage', () => {
  let component: EditarcategoriaPage;
  let fixture: ComponentFixture<EditarcategoriaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarcategoriaPage],
      providers: [
        { provide: ServicebdService},
        { provide: SQLite}, 
        { provide: NativeStorage}     
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarcategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
