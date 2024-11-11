import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarperfilPage } from './editarperfil.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

class MockSQLite {
  executeSql(query: string, params: any[]): Promise<any> {
    return Promise.resolve();
  }
}

describe('EditarperfilPage', () => {
  let component: EditarperfilPage;
  let fixture: ComponentFixture<EditarperfilPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarperfilPage],  
      providers: [
        ServicebdService,
        { provide: SQLite, useClass: MockSQLite }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarperfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();  
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });

 
});
