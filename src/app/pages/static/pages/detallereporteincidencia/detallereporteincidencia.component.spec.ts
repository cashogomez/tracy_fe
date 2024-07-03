import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallereporteincidenciaComponent } from './detallereporteincidencia.component';

describe('DetallereporteincidenciaComponent', () => {
  let component: DetallereporteincidenciaComponent;
  let fixture: ComponentFixture<DetallereporteincidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallereporteincidenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallereporteincidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
