import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajecancelarComponent } from './mensajecancelar.component';

describe('MensajecancelarComponent', () => {
  let component: MensajecancelarComponent;
  let fixture: ComponentFixture<MensajecancelarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajecancelarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajecancelarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
