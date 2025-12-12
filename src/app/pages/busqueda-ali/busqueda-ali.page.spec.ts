import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusquedaALIPage } from './busqueda-ali.page';

describe('BusquedaALIPage', () => {
  let component: BusquedaALIPage;
  let fixture: ComponentFixture<BusquedaALIPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaALIPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
