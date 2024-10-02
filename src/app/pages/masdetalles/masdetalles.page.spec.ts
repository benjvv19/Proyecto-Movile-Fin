import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasdetallesPage } from './masdetalles.page';

describe('MasdetallesPage', () => {
  let component: MasdetallesPage;
  let fixture: ComponentFixture<MasdetallesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MasdetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
