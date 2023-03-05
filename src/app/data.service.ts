import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost/api/GET'; // Replace with your API endpoint URL

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<any[]>(this.apiUrl); // Use any[] if the response is an array of objects, otherwise use object{}
  }
}
