import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmincategoriasPage } from './admincategorias.page';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

describe('AdmincategoriasPage', () => {
  let component: AdmincategoriasPage;
  let fixture: ComponentFixture<AdmincategoriasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmincategoriasPage],
      providers: [
        { provide: ServicebdService},
        { provide: SQLite}, 
        { provide: NativeStorage}, 
        { provide: Router, useValue: { navigate: jasmine.createSpy() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdmincategoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
