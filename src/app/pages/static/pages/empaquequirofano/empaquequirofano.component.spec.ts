import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpaquequirofanoComponent } from './empaquequirofano.component';

describe('EmpaquequirofanoComponent', () => {
  let component: EmpaquequirofanoComponent;
  let fixture: ComponentFixture<EmpaquequirofanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpaquequirofanoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpaquequirofanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
