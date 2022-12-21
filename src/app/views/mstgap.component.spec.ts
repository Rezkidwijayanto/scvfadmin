import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstgapComponent } from './mstgap.component';

describe('MstgapComponent', () => {
  let component: MstgapComponent;
  let fixture: ComponentFixture<MstgapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstgapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MstgapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
