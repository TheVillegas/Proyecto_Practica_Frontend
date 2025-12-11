import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarALiBasicoPage } from './generar-ali-basico.page';

describe('GenerarALiBasicoPage', () => {
  let component: GenerarALiBasicoPage;
  let fixture: ComponentFixture<GenerarALiBasicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarALiBasicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
