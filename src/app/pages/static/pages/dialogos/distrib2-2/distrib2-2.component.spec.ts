import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Distrib22Component } from './distrib2-2.component';

describe('Distrib22Component', () => {
  let component: Distrib22Component;
  let fixture: ComponentFixture<Distrib22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Distrib22Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Distrib22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
