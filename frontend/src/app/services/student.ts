import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn:'root'
})

export class StudentService{

  api='http://localhost:3000/students';

  constructor(private http:HttpClient){}

  getStudents(){
    return this.http.get(this.api);
  }

  addStudent(data:any){
    return this.http.post(this.api,data);
  }

  updateStudent(id:number,data:any){
    return this.http.put(
      `${this.api}/${id}`,
      data
    );
  }

  deleteStudent(id:number){
    return this.http.delete(
      `${this.api}/${id}`
    );
  }

getDeletedStudents() {
  return this.http.get(`${this.api}/deleted`);
}
}