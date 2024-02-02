import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionotrasareasComponent } from './recepcionotrasareas.component';

describe('RecepcionotrasareasComponent', () => {
  let component: RecepcionotrasareasComponent;
  let fixture: ComponentFixture<RecepcionotrasareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepcionotrasareasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecepcionotrasareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
