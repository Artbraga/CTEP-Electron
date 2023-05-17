import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaRetornoComponent } from './consulta-retorno.component';

describe('ConsultaRetornoComponent', () => {
  let component: ConsultaRetornoComponent;
  let fixture: ComponentFixture<ConsultaRetornoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaRetornoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaRetornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
