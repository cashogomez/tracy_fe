import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emergente2Component } from './emergente2.component';

describe('Emergente2Component', () => {
  let component: Emergente2Component;
  let fixture: ComponentFixture<Emergente2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emergente2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Emergente2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
