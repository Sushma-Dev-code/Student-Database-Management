import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
selector:'app-deleted-students',
standalone:true,
imports:[
CommonModule,
RouterModule
],
templateUrl:'./deleted-students.html',
styleUrls:['./deleted-students.css']
})

export class DeletedStudentsComponent
implements OnInit{

students:any[]=[];

constructor(
private http:HttpClient,
private cdr:ChangeDetectorRef
){}

ngOnInit(){

this.loadDeletedStudents();

}

loadDeletedStudents() {

  this.http.get<any[]>(
    'http://localhost:3000/students/deleted'
  ).subscribe({

    next: (data) => {

      console.log("Deleted:", data);

      this.students = [...data];

      this.cdr.detectChanges();

      console.log(this.students);

    },

    error: (err) => {

      console.log(err);

    }

  });

}

}