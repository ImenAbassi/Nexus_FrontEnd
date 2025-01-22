import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class userCompagneService {

  private link = 'http://localhost:8081/nexus/';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get<any>(`${this.link}usercompagne/getAll`);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.link}usercompagne/delete/${id}`, { responseType: 'text' });
  }

  public add(entity: any): Observable<any> {
    return this.http.post<any>(`${this.link}usercompagne/add`, entity);
  }

  public update(entity: any): Observable<any> {
    return this.http.put<any>(`${this.link}usercompagne/update/${entity.id}`, entity);
  }

  public getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.link}usercompagne/getById/${id}`);
  }

}