import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsterilizacionComponent } from './esterilizacion.component';

describe('EsterilizacionComponent', () => {
  let component: EsterilizacionComponent;
  let fixture: ComponentFixture<EsterilizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsterilizacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EsterilizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
