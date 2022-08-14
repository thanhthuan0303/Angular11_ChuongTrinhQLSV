import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userValue !: FormGroup;
  listTodo : Todo = new Todo();
  userData !: any;

  constructor(private userbuilder: FormBuilder,private user : UserService) { }

  ngOnInit(): void {
    this.userValue = this.userbuilder.group({
      id: [''],
      name: [''] ,
      gender: [''],
      class: [''],
      math: [''],
      chemistry: [''],
      physics: ['']
    })
    this.getUserDetails();
  }
  getUserDetails(){
    this.user.getUser().subscribe(res=>{
      this.userData = res; 
    })
  }

}

