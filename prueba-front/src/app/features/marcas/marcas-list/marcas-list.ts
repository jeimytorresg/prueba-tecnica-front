import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface Descuento {
  tipo: string;
  porcentaje: string;
}

export interface Marca {
  id: number;
  nombre: string;
  descripcion: string;
  descuentos: Descuento[];
}

@Component({
  selector: 'app-marcas-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './marcas-list.html'
})
export class MarcasList {
  
  private fb = inject(FormBuilder);

  marcas: Marca[] = [
    {
      id: 1,
      nombre: 'Vitalia',
      descripcion: 'Marca especializada en productos naturales y saludables.',
      descuentos: [
        { tipo: 'pA', porcentaje: '5%' },
        { tipo: 'pB', porcentaje: '10%' },
        { tipo: 'pC', porcentaje: '15%' }
      ]
    },
    {
      id: 2,
      nombre: 'Frutalicious',
      descripcion: 'Marca de jugos y néctares con alto contenido de fruta.',
      descuentos: [
        { tipo: 'pA', porcentaje: '3%' },
        { tipo: 'pB', porcentaje: '7%' },
        { tipo: 'pC', porcentaje: '12%' }
      ]
    },
    {
      id: 3,
      nombre: 'CrunchyLand',
      descripcion: 'Especializada en cereales para niños y adultos.',
      descuentos: [
        { tipo: 'pA', porcentaje: '4%' },
        { tipo: 'pB', porcentaje: '8%' },
        { tipo: 'pC', porcentaje: '10%' }
      ]
    },
    {
      id: 9,
      nombre: 'ServiPlus',
      descripcion: 'Servicios tercerizados para puntos de venta y logística.',
      descuentos: [] 
    }
  ];


  mostrarModalEliminar = false;
  mostrarModalFormulario = false;
  modoEdicion = false; 
  marcaSeleccionada: Marca | null = null;

  marcaForm: FormGroup;

  constructor() {

    this.marcaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      pvpA: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      pvpB: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      pvpC: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      pvpD: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      pvpE: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }



  abrirModalNuevo() {
    this.modoEdicion = false;
    this.marcaForm.reset({ pvpA: 0, pvpB: 0, pvpC: 0, pvpD: 0, pvpE: 0 }); 
    this.mostrarModalFormulario = true;
  }

  abrirModalEditar(marca: Marca) {
    this.modoEdicion = true;
    this.marcaSeleccionada = marca;

    this.marcaForm.patchValue({
      nombre: marca.nombre,
      descripcion: marca.descripcion
    });
    this.mostrarModalFormulario = true;
  }

  abrirModalEliminar(marca: Marca) {
    this.marcaSeleccionada = marca;
    this.mostrarModalEliminar = true;
  }

  cerrarModales() {
    this.mostrarModalEliminar = false;
    this.mostrarModalFormulario = false;
    this.marcaSeleccionada = null;
  }

  guardarMarca() {
    if (this.marcaForm.valid) {
      console.log('Guardando...', this.marcaForm.value);
      this.cerrarModales();
    } else {
      this.marcaForm.markAllAsTouched();
    }
  }

  confirmarEliminacion() {
    console.log('Eliminando marca...', this.marcaSeleccionada);
    this.cerrarModales();
  }

}