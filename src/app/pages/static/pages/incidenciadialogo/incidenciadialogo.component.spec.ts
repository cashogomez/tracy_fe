import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenciadialogoComponent } from './incidenciadialogo.component';

describe('IncidenciadialogoComponent', () => {
  let component: IncidenciadialogoComponent;
  let fixture: ComponentFixture<IncidenciadialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidenciadialogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncidenciadialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
