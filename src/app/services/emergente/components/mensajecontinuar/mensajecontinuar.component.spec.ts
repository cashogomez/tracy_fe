import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajecontinuarComponent } from './mensajecontinuar.component';

describe('MensajecontinuarComponent', () => {
  let component: MensajecontinuarComponent;
  let fixture: ComponentFixture<MensajecontinuarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajecontinuarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajecontinuarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
