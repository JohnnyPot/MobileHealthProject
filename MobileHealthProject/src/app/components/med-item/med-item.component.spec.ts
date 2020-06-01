import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedItemComponent } from './med-item.component';

describe('MedItemComponent', () => {
  let component: MedItemComponent;
  let fixture: ComponentFixture<MedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
