import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeaceptarComponent } from './mensajeaceptar.component';

describe('MensajeaceptarComponent', () => {
  let component: MensajeaceptarComponent;
  let fixture: ComponentFixture<MensajeaceptarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajeaceptarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeaceptarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
