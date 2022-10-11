import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movement } from '../models/movement.model';

@Injectable({
  providedIn: 'root',
})
export class MovementsService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}
  getAllMovements(): Observable<Movement[]> {
    return this.http.get<Movement[]>(this.baseApiUrl + '/api/Movements');
  }
}
