import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap, of } from 'rxjs';

export interface Descuento {
  id?: string;
  etiqueta: string;
  valor: number;
}

export interface Marca {
  id?: string;
  nombre: string;
  descripcion: string;
  descuentos: Descuento[];
}

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://104.236.31.102/api/marcas';
  
  private marcasCache = signal<Marca[]>([]);
  private loaded = false;

  marcas = this.marcasCache.asReadonly();

  findAll(forceRefresh = false): Observable<Marca[]> {
    if (this.loaded && !forceRefresh) {
      return of(this.marcasCache());
    }
    return this.http.get<Marca[]>(this.apiUrl).pipe(
      tap(data => {
        this.marcasCache.set(data);
        this.loaded = true;
      })
    );
  }

  findOne(id: string): Observable<Marca> {
    const cached = this.marcasCache().find(m => m.id === id);
    if (cached) return of(cached);
    return this.http.get<Marca>(`${this.apiUrl}/${id}`);
  }

  create(marca: Omit<Marca, 'id'>): Observable<Marca> {
    return this.http.post<Marca>(this.apiUrl, marca).pipe(
      tap(() => this.findAll(true).subscribe())
    );
  }

  update(id: string, marca: Partial<Marca>): Observable<Marca> {
    return this.http.patch<Marca>(`${this.apiUrl}/${id}`, marca).pipe(
      tap(() => this.findAll(true).subscribe())
    );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const current = this.marcasCache();
        this.marcasCache.set(current.filter(m => m.id !== id));
      })
    );
  }

  clearCache(): void {
    this.marcasCache.set([]);
    this.loaded = false;
  }
}
