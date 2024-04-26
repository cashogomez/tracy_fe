import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmonempaquesComponent } from './admonempaques.component';

describe('AdmonempaquesComponent', () => {
  let component: AdmonempaquesComponent;
  let fixture: ComponentFixture<AdmonempaquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmonempaquesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmonempaquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
