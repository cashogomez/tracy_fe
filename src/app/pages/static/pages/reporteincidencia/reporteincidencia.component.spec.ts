import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteincidenciaComponent } from './reporteincidencia.component';

describe('ReporteincidenciaComponent', () => {
  let component: ReporteincidenciaComponent;
  let fixture: ComponentFixture<ReporteincidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteincidenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteincidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
