import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondJsonComponentComponent } from './second-json-component.component';

describe('SecondJsonComponentComponent', () => {
  let component: SecondJsonComponentComponent;
  let fixture: ComponentFixture<SecondJsonComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondJsonComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondJsonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
