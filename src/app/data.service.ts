import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private apiUrl = 'http://localhost:8080/api/GET'; // Replace with your API endpoint URL
  private apiUrl = 'http://localhost/api';
  private constHeader = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

  fields: any[] = [];
  response: any[] = [];

  constructor(private http: HttpClient) { }

  getData() {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      return data;
    }); // Use any[] if the response is an array of objects, otherwise use object{}
  }

  getUpdatedData(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = `${this.apiUrl}/GET`;
    return this.http.post<any>(url, data, httpOptions);
    // this.http.post<any>(url, data, {headers}).subscribe(data => {
    //   this.response = data;
    //   return this.response;
    // })
  }

  updateDataOnServer(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = `${this.apiUrl}/SET`;
    return this.http.post(url, data, httpOptions).subscribe(resp => {     
    })
  }

  wait(milliseconds: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    });
  }
}


