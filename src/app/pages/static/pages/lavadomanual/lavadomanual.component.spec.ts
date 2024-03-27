import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavadomanualComponent } from './lavadomanual.component';

describe('LavadomanualComponent', () => {
  let component: LavadomanualComponent;
  let fixture: ComponentFixture<LavadomanualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LavadomanualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LavadomanualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
