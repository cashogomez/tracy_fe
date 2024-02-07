import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuirofanoinformacionComponent } from './quirofanoinformacion.component';

describe('QuirofanoinformacionComponent', () => {
  let component: QuirofanoinformacionComponent;
  let fixture: ComponentFixture<QuirofanoinformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuirofanoinformacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuirofanoinformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
