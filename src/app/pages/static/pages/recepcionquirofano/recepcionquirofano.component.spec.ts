import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionquirofanoComponent } from './recepcionquirofano.component';

describe('RecepcionquirofanoComponent', () => {
  let component: RecepcionquirofanoComponent;
  let fixture: ComponentFixture<RecepcionquirofanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepcionquirofanoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecepcionquirofanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
