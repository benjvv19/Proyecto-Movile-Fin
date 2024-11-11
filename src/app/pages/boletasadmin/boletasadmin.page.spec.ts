import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoletasadminPage } from './boletasadmin.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ServicebdService } from 'src/app/services/servicebd.service';

class MockSQLite {
  executeSql(query: string, params: any[]) {
    return Promise.resolve({ rows: { length: 0, item: () => ({}) } });
  }
}

class MockServicebdService {
  seleccionarTodasBoletas() {
    return Promise.resolve([]);
  }
}

describe('BoletasadminPage', () => {
  let component: BoletasadminPage;
  let fixture: ComponentFixture<BoletasadminPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoletasadminPage],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: SQLite, useClass: MockSQLite }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BoletasadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
