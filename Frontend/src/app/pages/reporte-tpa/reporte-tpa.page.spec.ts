import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporteTPAPage } from './reporte-tpa.page';

describe('ReporteTPAPage', () => {
  let component: ReporteTPAPage;
  let fixture: ComponentFixture<ReporteTPAPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTPAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
