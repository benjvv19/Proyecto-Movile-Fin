import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmindetallesPage } from './admindetalles.page';
import { ActivatedRoute } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';


describe('AdmindetallesPage', () => {
  let component: AdmindetallesPage;
  let fixture: ComponentFixture<AdmindetallesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmindetallesPage],
      providers: [
        { provide: ServicebdService },
        { provide: SQLite },
        NativeStorage,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              }
            }
          }
        },
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
