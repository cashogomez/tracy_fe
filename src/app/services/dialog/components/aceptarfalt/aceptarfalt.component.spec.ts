import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarfaltComponent } from './aceptarfalt.component';

describe('AceptarfaltComponent', () => {
  let component: AceptarfaltComponent;
  let fixture: ComponentFixture<AceptarfaltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AceptarfaltComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AceptarfaltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
