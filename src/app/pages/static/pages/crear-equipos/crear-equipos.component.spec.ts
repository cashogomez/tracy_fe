import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEquiposComponent } from './crear-equipos.component';

describe('CrearEquiposComponent', () => {
  let component: CrearEquiposComponent;
  let fixture: ComponentFixture<CrearEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEquiposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
