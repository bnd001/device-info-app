import {Component, OnInit} from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  fields: any[] = [];
  data: any[] = [];
  constructor(private dataService: DataService, private http: HttpClient) { }


  

ngOnInit(): void {
    this.http.get<any>('assets/statticfile.json').subscribe((data) => {
      this.fields = data.DATA_FIELDS;
    }); 
    
}


getData() {
    this.dataService.getData();
  }
  setData() {

  }
  title = 'Device Param App';
}
