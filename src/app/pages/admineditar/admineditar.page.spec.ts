import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmineditarPage } from './admineditar.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AdmineditarPage', () => {
  let component: AdmineditarPage;
  let fixture: ComponentFixture<AdmineditarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmineditarPage],
      imports: [IonicModule, FormsModule, CommonModule],
      providers: [
        ServicebdService,
        { provide: SQLite},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdmineditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
