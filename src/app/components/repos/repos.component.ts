import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit, OnChanges {

  @Input() repoUrl: string;
  repos = [];

  constructor(
    private githubService: GithubService,
    private ref: ChangeDetectorRef
    ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if(this.repoUrl) {
      this.githubService.getRepos(this.repoUrl).subscribe(
        (repos: []) => {
          this.repos = repos;
          this.ref.detectChanges();
        },(err) => {
          console.log(err);
        }
      );
    } 
  }

}
