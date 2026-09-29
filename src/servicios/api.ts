import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Api {
	private readonly http = inject(HttpClient);

	post<TRequest, TResponse>(ruta: string, cuerpo: TRequest): Observable<TResponse> {
		return this.http.post<TResponse>(ruta, cuerpo);
	}
}
