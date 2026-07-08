import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
selector:'app-student-list',
standalone:true,
imports:[
FormsModule,
CommonModule,
RouterModule
],
templateUrl:'./student-list.html',
styleUrls:['./student-list.css']
})

export class StudentList implements OnInit{

students:any[]=[];
filteredStudents:any[]=[];
paginatedStudents:any[]=[];

selectedClass='';
searchText='';

currentPage=1;
itemsPerPage=5;

constructor(
private router:Router,
private http:HttpClient
){}

ngOnInit(){

this.loadStudents();

}

loadStudents(){

this.http.get<any[]>(
'http://localhost:3000/students'
)
.subscribe({

next:(data)=>{

this.students=data;

this.filteredStudents=[
...this.students
];

this.currentPage=1;

this.updatePagination();

},

error:(err)=>{

console.log(err);

}

});

}

applyFilters(){

this.filteredStudents=
this.students.filter(
(student:any)=>{

const classMatch=

this.selectedClass==='' ||
student.class===this.selectedClass;

const search=
this.searchText.toLowerCase();

const searchMatch=

student.name
.toLowerCase()
.includes(search)

||

student.email
.toLowerCase()
.includes(search)

||

student.phone
.toString()
.includes(search);

return classMatch &&
searchMatch;

});

this.currentPage=1;

this.updatePagination();

}

updatePagination(){

const start=
(this.currentPage-1)
*this.itemsPerPage;

const end=
start+this.itemsPerPage;

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

if(
this.currentPage>1
){

this.currentPage--;

this.updatePagination();

}

}

totalPages(){

return Math.ceil(
this.filteredStudents.length/
this.itemsPerPage
)||1;

}

edit(student:any){

this.router.navigate(
['/add-student'],
{
state:{student}
}
);

}

delete(id:number){

this.http.delete(
`http://localhost:3000/students/${id}`
)
.subscribe(()=>{

this.loadStudents();

});

}

}