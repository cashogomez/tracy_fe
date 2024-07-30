import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnconstruccionComponent } from './enconstruccion.component';

describe('EnconstruccionComponent', () => {
  let component: EnconstruccionComponent;
  let fixture: ComponentFixture<EnconstruccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnconstruccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnconstruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
