import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { AuthService } from 'src/app/services/auth.service';
import { QueryService } from 'src/app/services/query.service';
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

//firebase
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireDatabase } from "@angular/fire/database";

//uuid
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = null;
  userName: string;
  email= null;
  description = '';
  error = null;
  queryBlock = false;
  display = "none";

  constructor(
    private githubService: GithubService,
    private auth: AuthService,
    private query: QueryService,
    private ref: ChangeDetectorRef,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private toastr: ToastrService,
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
}
