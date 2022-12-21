import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstvfdataComponent } from './mstvfdata.component';

describe('MstvfdataComponent', () => {
  let component: MstvfdataComponent;
  let fixture: ComponentFixture<MstvfdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstvfdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MstvfdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
