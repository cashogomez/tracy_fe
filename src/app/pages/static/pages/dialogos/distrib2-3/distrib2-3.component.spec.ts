import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Distrib23Component } from './distrib2-3.component';

describe('Distrib23Component', () => {
  let component: Distrib23Component;
  let fixture: ComponentFixture<Distrib23Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Distrib23Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Distrib23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
