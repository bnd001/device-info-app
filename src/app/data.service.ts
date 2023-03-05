import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api/GET'; // Replace with your API endpoint URL
  private constHeader = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

  fields: any[] = [];

  constructor(private http: HttpClient) { }

  getData() {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      return data;
    }); // Use any[] if the response is an array of objects, otherwise use object{}
  }

  postData(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl}/resource`;
    return this.http.post(this.apiUrl, data, { headers });
  }
}


