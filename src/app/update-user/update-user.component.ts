import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  id!: number;
  user: User = new User;
  roles = [
    { name: 'admin' },
    { name: 'write' },
    { name: 'read' },
    { name: 'signatory' }
  ]

  selRoles!: Array<{ name: string }>;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.user = new User();
    this.id = this.route.snapshot.params['id']
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
      this.selRoles = data.roles.map(role => { return { name: role.name } });
      this.user.roles = [];
      this.user.roles.push(...this.selRoles);
    },
      error => console.log(error)
    )
  }

  goToUserList() {
    this.router.navigate(['/users'])
  }
  onSubmit() {
    this.userService.updateUser(this.id, this.user).subscribe(data => {
      this.user = <User>data
      let timestamp = new Date(Date.now()).toLocaleDateString("en-us");
      console.log("User was successfully updated at Date" + timestamp +
        " The User pseudonym is :" + this.user.emailId +
        "updateUserComponent onSubmit() was the causing event");
      this.goToUserList();
    },
      error => console.log(error));
    this.user = new User();
  }

}
