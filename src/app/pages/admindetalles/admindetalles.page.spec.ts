import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmindetallesPage } from './admindetalles.page';

describe('AdmindetallesPage', () => {
  let component: AdmindetallesPage;
  let fixture: ComponentFixture<AdmindetallesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
