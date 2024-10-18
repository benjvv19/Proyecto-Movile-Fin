import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleboletasPage } from './detalleboletas.page';

describe('DetalleboletasPage', () => {
  let component: DetalleboletasPage;
  let fixture: ComponentFixture<DetalleboletasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleboletasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
