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
  respData: any[] = [];
 
  //parameters: { RESOURCE_ID: number }[] = [];
  parameterObject: IParameterObject = {
    PARAMETERS: []
  };

  parameterObject2: IParameterObject2 = {
    PARAMETERS: []
  };
  constructor(private dataService: DataService, private http: HttpClient) { }


  

ngOnInit(): void {
    this.http.get<any>('assets/statticfile.json').subscribe((data) => {
      this.fields = data.DATA_FIELDS;
    }); 
    
}

generateJSON(input: any): string {
  const myJSON = JSON.stringify(input);
  console.log(myJSON); // JSON object as a string
  return myJSON;
}

getData() {
    for (let i = 0; i < this.fields.length; i++) {
      const param: IParameter = {
        RESOURCE_ID: this.fields[i].RESOURCE_ID
      };
      this.parameterObject.PARAMETERS.push(param);
    }

    var req  = this.generateJSON(this.parameterObject);

    var resp = this.dataService.getUpdatedData(req);
    resp.subscribe(data => {
         this.parameterObject2 = data;
         this.setDataToUiFields(this.parameterObject2);
       })
  }

  setDataToUiFields(resp: IParameterObject2 ) {
    for(let j = 0; j < resp.PARAMETERS.length; j++) {
      for (let i = 0; i < this.fields.length; i++) {
        if(resp.PARAMETERS[i].RESOURCE_ID == this.fields[i].RESOURCE_ID) {
          this.fields[i].DISP_DEFAULT_VALUE = resp.PARAMETERS[i].PARAM_VALUE
        }
      }
    }
  }

setData() {

  for (let i = 0; i < this.fields.length; i++) {
    const param2: IParameter2 = {
      RESOURCE_ID: this.fields[i].RESOURCE_ID,
      PARAM_VALUE: this.fields[i].DISP_DEFAULT_VALUE
    };
    this.parameterObject2.PARAMETERS.push(param2);
  }

  var req = this.generateJSON(this.parameterObject2);

  var resp = this.dataService.updateDataOnServer(req);

}



  title = 'Device Param App';
}

interface IDataField {
  RESOURCE_ID: number;
  DISP_NAME: string;
  DISP_UNIT_STRING: string;
  DISP_DEFAULT_VALUE: string;
}

interface IParameter {
  RESOURCE_ID: number;
}
interface IParameter2 {
  RESOURCE_ID: number;
  PARAM_VALUE: number;
}
interface IParameterObject {
  PARAMETERS: IParameter[];
}
interface IParameterObject2 {
  PARAMETERS: IParameter2[];
}
