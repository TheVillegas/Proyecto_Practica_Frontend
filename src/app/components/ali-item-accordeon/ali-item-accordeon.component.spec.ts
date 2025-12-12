import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ALIItemAccordeonComponent } from './ali-item-accordeon.component';

describe('ALIItemAccordeonComponent', () => {
  let component: ALIItemAccordeonComponent;
  let fixture: ComponentFixture<ALIItemAccordeonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ALIItemAccordeonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ALIItemAccordeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
