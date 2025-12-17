import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporteRamPage } from './reporte-ram.page';

describe('ReporteRamPage', () => {
  let component: ReporteRamPage;
  let fixture: ComponentFixture<ReporteRamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteRamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
