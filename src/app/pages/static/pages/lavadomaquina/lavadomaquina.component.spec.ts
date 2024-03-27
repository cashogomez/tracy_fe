import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavadomaquinaComponent } from './lavadomaquina.component';

describe('LavadomaquinaComponent', () => {
  let component: LavadomaquinaComponent;
  let fixture: ComponentFixture<LavadomaquinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LavadomaquinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LavadomaquinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
