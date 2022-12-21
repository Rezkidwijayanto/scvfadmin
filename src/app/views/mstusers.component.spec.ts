import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstusersComponent } from './mstusers.component';

describe('MstusersComponent', () => {
  let component: MstusersComponent;
  let fixture: ComponentFixture<MstusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MstusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
