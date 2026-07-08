import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../services/student';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard implements OnInit {

  students: any[] = [];

  constructor(
    private StService: StudentService,
    private router: Router,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    console.log("Loding students...");

    this.StService.getStudents().subscribe(
      {next:(data: any) => {
        

      this.students = [...data];
      this.cdr.detectChanges();
      console.log("Assigned:", this.students.length);

      setTimeout(() => {
        console.log("After 2 seconds:", this.students.length);
      }, 2000);

    },

    error: (err) => {
      console.error(err);
    }

      
      // console.log("students:",this.students);

      // console.log("Total:", this.totalStudents);
      // console.log("Female:", this.femaleStudents);
      // console.log("Male:", this.maleStudents);


    });

  }

  navigateToStudentslist(): void {

    this.router.navigate(['/students-list']);

  }

  get totalStudents(): number {

    return this.students.length;

  }

  get activeStudents(): number {

    return this.students.length;

  }

  get femaleStudents(): number {

    return this.students.filter(
      s => s.gender?.trim().toLowerCase() === 'female'
    ).length;

  }

  get maleStudents(): number {

    return this.students.filter(
      s => s.gender?.trim().toLowerCase() === 'male'
    ).length;

  }

}