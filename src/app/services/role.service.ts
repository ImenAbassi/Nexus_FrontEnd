import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class roleService {

  private link = 'http://localhost:8081/nexus/';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get<any>(`${this.link}role/getAll`);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.link}role/delete/${id}`, { responseType: 'text' });
  }

  public add(entity: any): Observable<any> {
    return this.http.post<any>(`${this.link}role/add`, entity);
  }

  public update(entity: any): Observable<any> {
    return this.http.put<any>(`${this.link}role/update/${entity.id}`, entity);
  }

  public getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.link}role/getById/${id}`);
  }

}