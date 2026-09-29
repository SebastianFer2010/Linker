import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioDeRegistro } from './formulario-de-registro';

describe('FormularioDeRegistro', () => {
  let component: FormularioDeRegistro;
  let fixture: ComponentFixture<FormularioDeRegistro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioDeRegistro],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioDeRegistro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
