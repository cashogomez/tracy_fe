import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Distrib1Component } from './distrib1.component';

describe('Distrib1Component', () => {
  let component: Distrib1Component;
  let fixture: ComponentFixture<Distrib1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Distrib1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Distrib1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
