import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student';

@Component({
  selector:'app-add-student',
  standalone:true,
  imports:[FormsModule],
  templateUrl:'./add-student.html',
  styleUrls:['./add-student.css']
})

export class AddStudentComponent implements OnInit{

student:any={

name:'',
email:'',
phone:'',
class:'',
gender:''

};

editMode=false;

constructor(

private router:Router,
private service:StudentService

){}

ngOnInit(){

const data=history.state.student;

if(data){

this.student={...data};

this.editMode=true;

}

}


saveStudent(){

if(

!this.student.name ||
!this.student.email ||
!this.student.phone ||
!this.student.class ||
!this.student.gender

){

alert(
'Please fill all fields'
);

return;

}


// UPDATE
if(this.editMode){

this.service
.updateStudent(
this.student.id,
this.student
)
.subscribe({

next:()=>{

alert(
'Student Updated Successfully'
);

this.router.navigate(
['/students-list']
);

},

error:(err)=>{

console.log(err);

}

});

}


// ADD
else{

this.service
.addStudent(
this.student
)
.subscribe({

next:()=>{

alert(
'Student Added Successfully'
);

this.router.navigate(
['/students-list']
);

},

error:(err)=>{

console.log(err);

}

});

}

}

}