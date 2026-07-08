import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedStudentsComponent } from './deleted-students';

describe('DeletedStudentsComponent', () => {

  let component: DeletedStudentsComponent;
  let fixture: ComponentFixture<DeletedStudentsComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [DeletedStudentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeletedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});