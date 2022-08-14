import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';
import { UserService } from 'src/app/service/user.service';

// import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userValue !: FormGroup;
  listTodo : Todo = new Todo();
  userData !: any;

  constructor(private userbuilder: FormBuilder,
    private user : UserService) { }

  ngOnInit(): void {
    this.userValue = this.userbuilder.group({
      id: [''],
      name: [''] ,
      gender: [''],
      class: [''],
      math: [''],
      chemistry: [''],
      physics: [''],
      ratings: ['']
    })
    this.getUserDetails();
  }

  postUserDetails(){
    this.listTodo.id = this.userValue.value.id;
    this.listTodo.name = this.userValue.value.name;
    this.listTodo.gender = this.userValue.value.gender;
    this.listTodo.class = this.userValue.value.class;
    this.listTodo.math = this.userValue.value.math;
    this.listTodo.chemistry = this.userValue.value.chemistry;
    this.listTodo.physics = this.userValue.value.physics;
    this.listTodo.ratings = (this.userValue.value.math + this.userValue.value.chemistry + this.userValue.value.physics)/3;

    this.user.postUser(this.listTodo)
    .subscribe(res=>{
      console.log(this.listTodo);
      alert("Added already!");
      this.userValue.reset();
      this.getUserDetails();
    },_err=>{
      alert("Something went wrong, please check again!!")
    })
  }
  
  getUserDetails(){
    this.user.getUser().subscribe(res=>{
      this.userData = res; 
    })
  }

  deleteUserDetails(item : any){
    this.user.deleteUser(item.id)
    .subscribe(res=>{
      alert("Deleted!!");
      this.getUserDetails();
    })
  }

}
