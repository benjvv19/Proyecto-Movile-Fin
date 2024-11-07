import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoletasadminPage } from './boletasadmin.page';

describe('BoletasadminPage', () => {
  let component: BoletasadminPage;
  let fixture: ComponentFixture<BoletasadminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletasadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
