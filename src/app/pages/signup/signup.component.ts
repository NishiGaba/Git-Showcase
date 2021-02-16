import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
//firebase
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireDatabase } from "@angular/fire/database";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private auth : AuthService,
    private router : Router,
    private toastr: ToastrService,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    const {email, password} = f.form.value;
    this.auth.signUp(email, password)
    .then((res) => {
      console.log(res);
      const { uid } = res.user;

      this.db.object(`/users/${uid}`)
        .set({
          id: uid,
          email: email
        });
    })
    .then(() => {
      this.router.navigateByUrl("/");
      this.toastr.success("SignUp Success");
    })
    .catch((err) => {
      this.toastr.error("Signup failed");
    });
  }

}
