import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api/GET'; // Replace with your API endpoint URL
  private constHeader = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

  fields: any[] = [];

  constructor(private http: HttpClient) { }

  getData() {
    this.http.get<any[]>(this.apiUrl, { headers : this.constHeader }).subscribe((data) => {
      return data;
    }); // Use any[] if the response is an array of objects, otherwise use object{}
  }

  getDefaultData() {
    this.http.get<any>('assets/statticfile.json').subscribe((data) => {
      this.fields = data.DATA_FIELDS;
    },
    (error) => {
      console.log(error);
    });
    return this.fields;
  }
}
