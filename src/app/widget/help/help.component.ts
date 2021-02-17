import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  email= null;
  description = '';
  error = null;
  queryBlock = false;
  display = "none";

  constructor(
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

  onSubmit() {
    console.log(this.email, this.description);
    const uid = uuidv4();
    let date = Date.now();
    this.db.object(`/queries/${uid}`)
      .set({
        id: uid,
        email: this.email,
        description: this.description,
        date: date,
      })
      .then((res) => {
        this.description = '';
        this.query.sendMail(this.email, this.description, date);
        this.toastr.success("Query added successfully");
      })
      .catch((err) => {
        this.toastr.error("Oopsss, try again!");
      });
  }


}
