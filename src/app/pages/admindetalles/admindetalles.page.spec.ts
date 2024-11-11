import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmindetallesPage } from './admindetalles.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; 
import { ServicebdService } from 'src/app/services/servicebd.service';





describe('AdmindetallesPage', () => {
  let component: AdmindetallesPage;
  let fixture: ComponentFixture<AdmindetallesPage>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmindetallesPage],
      providers: [
        { provide: ServicebdService},
        { provide: SQLite}, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdmindetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
