import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EticaEmpresarialComponent } from './etica-empresarial.component';

describe('EticaEmpresarialComponent', () => {
  let component: EticaEmpresarialComponent;
  let fixture: ComponentFixture<EticaEmpresarialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EticaEmpresarialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EticaEmpresarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
