import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstJsonComponentComponent } from './first-json-component.component';

describe('FirstJsonComponentComponent', () => {
  let component: FirstJsonComponentComponent;
  let fixture: ComponentFixture<FirstJsonComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstJsonComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstJsonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
