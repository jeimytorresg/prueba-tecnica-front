import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. Definimos la interfaz estricta (¡Adiós al 'any'!)
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
  imports: [CommonModule],
  templateUrl: './marcas-list.html'
})
export class MarcasList {
  

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

}