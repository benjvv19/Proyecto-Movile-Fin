import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarPage } from './eliminar.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('EliminarPage', () => {
  let component: EliminarPage;
  let fixture: ComponentFixture<EliminarPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarPage],
      providers: [
        { provide: ServicebdService},
        { provide: SQLite}, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EliminarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
