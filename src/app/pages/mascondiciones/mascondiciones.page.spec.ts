import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MascondicionesPage } from './mascondiciones.page';

describe('MascondicionesPage', () => {
  let component: MascondicionesPage;
  let fixture: ComponentFixture<MascondicionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MascondicionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
