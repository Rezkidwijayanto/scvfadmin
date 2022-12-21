import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstmaterialComponent } from './mstmaterial.component';

describe('MstmaterialComponent', () => {
  let component: MstmaterialComponent;
  let fixture: ComponentFixture<MstmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstmaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MstmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
