import { Component, OnInit, Input } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';
import { from } from 'rxjs';


class UserData {
  firstName: string;
  lastName: string;
  avatarURL: string;
  email: string;
  phone: string;
  bio: string;
  address: string;

  constructor(firstName: string, lastName: string, avatarURL: string, 
              email: string, phone: string, bio: string, address: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatarURL = avatarURL;
    this.email = email;
    this.phone = phone;
    this.bio = bio;
    this.address = address;
  }
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() user:User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.userService.getUser().subscribe(
      (response)=>
      {
        console.log(JSON.stringify(response));
        
        this.user = response;
      },
      (error) => console.log(error));
    console.log(this.user);
    
  }

}
