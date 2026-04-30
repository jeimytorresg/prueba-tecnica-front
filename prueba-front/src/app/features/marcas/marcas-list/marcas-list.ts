import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcasService, Marca } from '../../../core/services/marcas.service';

@Component({
  selector: 'app-marcas-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './marcas-list.html'
})
export class MarcasList implements OnInit {
  private fb = inject(FormBuilder);
  private marcasService = inject(MarcasService);

  // Ahora usamos el signal del servicio directamente
  marcas = this.marcasService.marcas;
  isLoading = false;
  mostrarModalEliminar = false;
  mostrarModalFormulario = false;
  modoEdicion = false;
  marcaSeleccionada: Marca | null = null;
  marcaForm: FormGroup;

  constructor() {
    this.marcaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: [''],
      pvpA: [0, [Validators.required, Validators.min(0)]],
      pvpB: [0, [Validators.required, Validators.min(0)]],
      pvpC: [0, [Validators.required, Validators.min(0)]],
      pvpD: [0, [Validators.required, Validators.min(0)]],
      pvpE: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.cargarMarcas();
  }

  cargarMarcas() {
    this.isLoading = true;
    // Forzamos la carga inicial si el caché está vacío
    this.marcasService.findAll().subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading marcas:', err);
        this.isLoading = false;
      }
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
    const getVal = (label: string) => marca.descuentos.find(d => d.etiqueta === label)?.valor || 0;
    this.marcaForm.patchValue({
      nombre: marca.nombre,
      descripcion: marca.descripcion,
      pvpA: getVal('A'),
      pvpB: getVal('B'),
      pvpC: getVal('C'),
      pvpD: getVal('D'),
      pvpE: getVal('E'),
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
      const formValue = this.marcaForm.value;
      const marcaData = {
        nombre: formValue.nombre,
        descripcion: formValue.descripcion,
        descuentos: [
          { etiqueta: 'A', valor: Number(formValue.pvpA || 0) },
          { etiqueta: 'B', valor: Number(formValue.pvpB || 0) },
          { etiqueta: 'C', valor: Number(formValue.pvpC || 0) },
          { etiqueta: 'D', valor: Number(formValue.pvpD || 0) },
          { etiqueta: 'E', valor: Number(formValue.pvpE || 0) },
        ]
      };

      if (this.modoEdicion && this.marcaSeleccionada?.id) {
        this.marcasService.update(this.marcaSeleccionada.id, marcaData).subscribe(() => {
          this.cargarMarcas();
          this.cerrarModales();
        });
      } else {
        this.marcasService.create(marcaData).subscribe(() => {
          this.cargarMarcas();
          this.cerrarModales();
        });
      }
    } else {
      this.marcaForm.markAllAsTouched();
    }
  }

  confirmarEliminacion() {
    if (this.marcaSeleccionada?.id) {
      this.marcasService.remove(this.marcaSeleccionada.id).subscribe(() => {
        this.cargarMarcas();
        this.cerrarModales();
      });
    }
  }
}