import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDocComponent } from './trainingdoc.component';

describe('TrainingDocComponent', () => {
  let component: TrainingDocComponent;
  let fixture: ComponentFixture<TrainingDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
