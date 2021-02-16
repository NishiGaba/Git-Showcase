import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {

  queries = [];

  constructor(
    private db: AngularFireDatabase,
    private toastr: ToastrService,
  ) {
    //grab all queries from firebase
    db.object("/queries")
    .valueChanges()
    .subscribe((obj) => {
      if (obj) {
        this.queries = Object.values(obj).sort((a, b) => b.date - a.date);
      } else {
        toastr.error("NO post to display");
        this.queries = [];
      }
    });
  }

  ngOnInit() {
  }


}
