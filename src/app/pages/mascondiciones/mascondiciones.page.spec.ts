import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MascondicionesPage } from './mascondiciones.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ServicebdService } from 'src/app/services/servicebd.service';

describe('MascondicionesPage', () => {
  let component: MascondicionesPage;
  let fixture: ComponentFixture<MascondicionesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MascondicionesPage],
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        ServicebdService,
        SQLite
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MascondicionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
