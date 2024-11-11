import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesPage } from './detalles.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('DetallesPage', () => {
  let component: DetallesPage;
  let fixture: ComponentFixture<DetallesPage>;
  let mockServicebd: jasmine.SpyObj<ServicebdService>;
  let mockNativeStorage: jasmine.SpyObj<NativeStorage>;
  let mockAlertController: jasmine.SpyObj<AlertController>;
  let mockRouter: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DetallesPage],
      providers: [
        { provide: ServicebdService, useValue: mockServicebd },
        { provide: NativeStorage, useValue: mockNativeStorage },
        { provide: AlertController, useValue: mockAlertController },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    });

    fixture = TestBed.createComponent(DetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
