import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoqrComponent } from './historicoqr.component';

describe('HistoricoqrComponent', () => {
  let component: HistoricoqrComponent;
  let fixture: ComponentFixture<HistoricoqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoqrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricoqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
