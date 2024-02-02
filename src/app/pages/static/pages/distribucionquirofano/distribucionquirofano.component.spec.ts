import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribucionquirofanoComponent } from './distribucionquirofano.component';

describe('DistribucionquirofanoComponent', () => {
  let component: DistribucionquirofanoComponent;
  let fixture: ComponentFixture<DistribucionquirofanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistribucionquirofanoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistribucionquirofanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
