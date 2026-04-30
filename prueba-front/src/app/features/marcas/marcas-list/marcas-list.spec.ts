import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasList } from './marcas-list';

describe('MarcasList', () => {
  let component: MarcasList;
  let fixture: ComponentFixture<MarcasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcasList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcasList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
