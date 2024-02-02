import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpaqueotrasareasComponent } from './empaqueotrasareas.component';

describe('EmpaqueotrasareasComponent', () => {
  let component: EmpaqueotrasareasComponent;
  let fixture: ComponentFixture<EmpaqueotrasareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpaqueotrasareasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpaqueotrasareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
