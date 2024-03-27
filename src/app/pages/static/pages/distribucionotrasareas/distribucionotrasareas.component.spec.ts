import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribucionotrasareasComponent } from './distribucionotrasareas.component';

describe('DistribucionotrasareasComponent', () => {
  let component: DistribucionotrasareasComponent;
  let fixture: ComponentFixture<DistribucionotrasareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistribucionotrasareasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistribucionotrasareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
