import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = null;
  userName: string;
  email= null;
  error = null;
  queryBlock = false;
  display = "none";

  constructor(
    private githubService: GithubService,
    private auth: AuthService,
    private ref: ChangeDetectorRef
    ) {
      auth.getUser().subscribe((user) => {
        if(user != null) {
          this.email = user.email;
        }
      });
    }

  ngOnInit() {
  }

  handleFind() {
    this.githubService.getUserDetails(this.userName).subscribe(
      (user) => {
        this.user = user;
        this.error = null;
        this.ref.detectChanges();
      },
      (err) => {
        this.user = null;
        this.error = "User not found.";
      }
    );
  }

  toggleQueryBlock(flag) {
    console.log(flag);
    if(flag == 'open') {
      this.queryBlock = true;
    } else {
      this.queryBlock = false;
    }
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  onSubmit(f: NgForm) {

  }

}
