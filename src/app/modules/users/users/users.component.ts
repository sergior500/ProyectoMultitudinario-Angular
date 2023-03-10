import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { token } from '../../../interfaces/token.inteface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UsersService) { }
  token !:token;
  user !:User;
  ngOnInit(): void {
    this.token = jwtDecode(localStorage.getItem('token')!)

    this.userService.user(this.token.sub)
      .subscribe({
        next:(resp) => {
          this.user = resp;
        }
      })

  }

}
