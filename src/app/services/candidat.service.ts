import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class CandidatService {
  
    private link = 'http://localhost:8081/nexus/';
  
    constructor(private http: HttpClient) { }
  
    public getAll(): Observable<any> {
      return this.http.get<any>(`${this.link}candidats/getAll`);
    }
  
    public delete(id: number): Observable<any> {
      return this.http.delete(`${this.link}candidats/delete/${id}`, { responseType: 'text' });
    }
  
    public add(entity: any): Observable<any> {
      return this.http.post<any>(`${this.link}candidats/add`, entity);
    }
  
    public update(entity: any): Observable<any> {
      return this.http.put<any>(`${this.link}candidats/update/${entity.id}`, entity);
    }
  
    public getById(id: number): Observable<any> {
      return this.http.get<any>(`${this.link}candidats/getById/${id}`);
    }
  
  }