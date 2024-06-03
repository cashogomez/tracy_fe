import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Distrib2Component } from './distrib2.component';

describe('Distrib2Component', () => {
  let component: Distrib2Component;
  let fixture: ComponentFixture<Distrib2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Distrib2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Distrib2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
