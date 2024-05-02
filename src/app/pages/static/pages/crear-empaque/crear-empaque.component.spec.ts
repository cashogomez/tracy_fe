import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEmpaqueComponent } from './crear-empaque.component';

describe('CrearEmpaqueComponent', () => {
  let component: CrearEmpaqueComponent;
  let fixture: ComponentFixture<CrearEmpaqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEmpaqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearEmpaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
