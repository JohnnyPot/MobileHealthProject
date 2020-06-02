import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InteractionsPage } from './interactions.page';

describe('InteractionsPage', () => {
  let component: InteractionsPage;
  let fixture: ComponentFixture<InteractionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InteractionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
