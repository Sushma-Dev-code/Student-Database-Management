// import { Routes } from '@angular/router';

// import { Dashboard } from './dashboard/dashboard';
// import { StudentsList } from './students-list/students-list';
// import { AddStudent } from './add-student/add-student';

// export const routes: Routes = [

// {
// path:'',
// redirectTo:'dashboard',
// pathMatch:'full'
// },

// {
// path:'dashboard',
// component:Dashboard
// },

// {
// path:'students-list',
// component:StudentsList
// },

// {
// path:'add-student',
// component:AddStudent
// }

// ];


import { Routes } from '@angular/router';

import { Dashboard } from './dashboard/dashboard';
import { StudentList } from './student-list/student-list';
import { AddStudentComponent } from './add-student/add-student';
import { DeletedStudentsComponent } from './deleted-students/deleted-students';
import { Login } from './login/login';

export const routes: Routes=[

{
path:'',
redirectTo:'login',
pathMatch:'full'
},

{
    path:'login',
    component:Login
},

{
path:'dashboard',
component:Dashboard
},

{
path:'students-list',
component:StudentList
},

{
path:'add-student',
component:AddStudentComponent
},

{
path:'deleted-students',
component:DeletedStudentsComponent
}

];