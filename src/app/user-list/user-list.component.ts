import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user'
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users!: User[];
  roles!: String[];
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {

    this.getUsers();
  }
  private getUsers() {

    this.userService.getUsersList().subscribe(data => {
      this.users = data;
    });
    let timestamp = new Date(Date.now()).toLocaleDateString("en-us");
    console.log("userListComponent called getUsers () at Date" + timestamp +
      "userListComponent getUsers() was the causing event");
  }

  updateUser(id: number) {
    this.router.navigate(['update-user', id])
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      this.getUsers();
    });
    let timestamp = new Date(Date.now()).toLocaleDateString("en-us");
    console.log("userListComponent called deleteUser () at Date" + timestamp +
      "userListComponent deleteUser() was the causing event");
  }

  userDatails(id: number) {
    this.router.navigate(['user-details', id]);

  }
}
