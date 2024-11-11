import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarcontrasenaPage } from './recuperarcontrasena.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

// Crear mocks para las dependencias
class MockSQLite {
  executeSql() {
    return Promise.resolve();
  }
}

class MockServicebdService {
  someMethod() {
    return Promise.resolve([]);
  }
}

describe('RecuperarcontrasenaPage', () => {
  let component: RecuperarcontrasenaPage;
  let fixture: ComponentFixture<RecuperarcontrasenaPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperarcontrasenaPage],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: SQLite, useClass: MockSQLite }, // Proveer el mock de SQLite
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarcontrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
