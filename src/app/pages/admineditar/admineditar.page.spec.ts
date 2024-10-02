import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmineditarPage } from './admineditar.page';

describe('AdmineditarPage', () => {
  let component: AdmineditarPage;
  let fixture: ComponentFixture<AdmineditarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmineditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
