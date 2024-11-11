import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminproductosPage } from './adminproductos.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';


describe('AdminproductosPage', () => {
  let component: AdminproductosPage;
  let fixture: ComponentFixture<AdminproductosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminproductosPage],
      providers: [
        { provide: ServicebdService},
        { provide: SQLite}, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminproductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
