import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuirofanocreacionComponent } from './quirofanocreacion.component';

describe('QuirofanocreacionComponent', () => {
  let component: QuirofanocreacionComponent;
  let fixture: ComponentFixture<QuirofanocreacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuirofanocreacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuirofanocreacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
