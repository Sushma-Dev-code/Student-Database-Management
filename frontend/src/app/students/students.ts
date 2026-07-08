import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student';

@Component({
selector:'app-students',
standalone:true,
imports:[CommonModule,FormsModule],
templateUrl:'./students.html',
styleUrl:'./students.css'
})

export class StudentsComponent implements OnInit{

students:any[]=[];
filteredStudents:any[]=[];
paginatedStudents:any[]=[];

selectedClass='';
searchText='';

currentPage=1;
itemsPerPage=5;

student={
name:'',
email:'',
phone:'',
class:'',
gender:''
};

editId=0;

constructor(
private service:StudentService
){}

ngOnInit(){
this.loadStudents();
}

loadStudents(){

this.service
.getStudents()
.subscribe((data:any)=>{

this.students=data;

this.applyFilters();

});

}

applyFilters(){

this.filteredStudents=this.students.filter(
(student:any)=>{

    /*
const classMatch=
this.selectedClass==='' ||
student.class===this.selectedClass;

const searchMatch=
student.name
.toLowerCase()
.includes(
this.searchText.toLowerCase()
);

return classMatch &&
searchMatch;

});*/
const classMatch=
this.selectedClass==='' ||
student.class===this.selectedClass;

const search=this.searchText.toLowerCase();
 
const searchMatch=

student.name
.toLowerCase().includes(search)

||

student.email
.toLowerCase().includes(search)

||

student.phone.toString()
.includes(search);

return classMatch && searchMatch;
});


this.currentPage=1;

this.updatePagination();

}

updatePagination(){

const start=
(this.currentPage-1)
*this.itemsPerPage;

const end=
start+
this.itemsPerPage;

this.paginatedStudents=
this.filteredStudents.slice(
start,
end
);

}

nextPage(){

if(
this.currentPage<
this.totalPages()
){

this.currentPage++;

this.updatePagination();

}

}

previousPage(){

if(this.currentPage>1){

this.currentPage--;

this.updatePagination();

}

}

totalPages(){

return Math.ceil(
this.filteredStudents.length/
this.itemsPerPage
);

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

if(this.editId===0){

this.service
.addStudent(this.student)
.subscribe(()=>{

this.loadStudents();

});

}
else{

this.service
.updateStudent(
this.editId,
this.student
)
.subscribe(()=>{

this.loadStudents();

this.editId=0;

});

}

this.student={
name:'',
email:'',
phone:'',
class:'',
gender:''
};

}

edit(s:any){

this.student={...s};

this.editId=s.id;

}

delete(id:number){

this.service
.deleteStudent(id)
.subscribe(()=>{

this.loadStudents();

});

}

}