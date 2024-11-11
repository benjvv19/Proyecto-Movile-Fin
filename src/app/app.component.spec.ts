import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';


class MockNativeStorage {
  setItem(key: string, value: any): Promise<any> {
    return Promise.resolve(); 
  }

  getItem(key: string): Promise<any> {
    return Promise.resolve(null); 
  }

  removeItem(key: string): Promise<any> {
    return Promise.resolve(); 
  }

}

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: NativeStorage, useClass: MockNativeStorage }, 
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
