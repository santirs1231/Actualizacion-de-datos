import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NucleoFamiliarComponent } from './nucleo-familiar.component';

describe('NucleoFamiliarComponent', () => {
  let component: NucleoFamiliarComponent;
  let fixture: ComponentFixture<NucleoFamiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NucleoFamiliarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NucleoFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
