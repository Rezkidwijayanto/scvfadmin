import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstpoComponent } from './mstpo.component';

describe('MstpoComponent', () => {
  let component: MstpoComponent;
  let fixture: ComponentFixture<MstpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstpoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MstpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
