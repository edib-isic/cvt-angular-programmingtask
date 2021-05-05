import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @ViewChild('myForm', { static: false }) MyForm!: NgForm;
  roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'write' },
    { id: 3, name: 'read' },
    { id: 4, name: 'signatory' }
  ]


  user: User = new User();
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.userService.createUser(this.user).subscribe(data => {
      this.goToUserList();
      let timestamp = new Date(Date.now()).toLocaleDateString("en-us");
      console.log("User was successfully created on Date" + timestamp +
        " The User pseudonym is " + this.user.emailId +
        "createUserComponend saveUser() was the causing event");
    },
      error => console.log(error));
  }

  goToUserList() {
    this.router.navigate(['/users'])
  }
  onSubmit() {
    this.saveUser();
  }
}

