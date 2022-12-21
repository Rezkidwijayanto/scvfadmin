import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantaccComponent } from './plantacc.component';

describe('PlantaccComponent', () => {
  let component: PlantaccComponent;
  let fixture: ComponentFixture<PlantaccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantaccComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantaccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
