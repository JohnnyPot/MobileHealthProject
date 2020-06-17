import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicinePopupDetailsPage } from './medicine-popup-details.page';

describe('MedicinePopupDetailsPage', () => {
  let component: MedicinePopupDetailsPage;
  let fixture: ComponentFixture<MedicinePopupDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicinePopupDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicinePopupDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
