import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../services/student';

@Component({
selector:'app-add-student',
standalone:true,
imports:[
FormsModule
],
templateUrl:'./add-student.html',
styleUrl:'./add-student.css'
})

export class AddStudentComponent{

student={

name:'',
email:'',
phone:'',
class:'',
gender:''

};

constructor(
private service:StudentService,
private router:Router
){}

saveStudent(){

if(

!this.student.name ||
!this.student.email ||
!this.student.phone ||
!this.student.class ||
!this.student.gender

){

alert("Please fill all fields");

return;

}

this.service
.addStudent(this.student)
.subscribe(()=>{

alert("Student Added Successfully");

this.router.navigate(
['/students-list']
);

});

}

}