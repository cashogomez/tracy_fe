import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsterilizadorguardarComponent } from './esterilizadorguardar.component';

describe('EsterilizadorguardarComponent', () => {
  let component: EsterilizadorguardarComponent;
  let fixture: ComponentFixture<EsterilizadorguardarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsterilizadorguardarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EsterilizadorguardarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
