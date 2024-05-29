import { Component } from '@angular/core';
import { JsonplaceholderService } from '../jsonplaceholder.service';
import { ActivatedRoute } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

type RESPONSE_POST ={
    userId:number,
    id:number,
    title:string,
    body:string
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  isLoading:boolean = false
  postId: number|undefined = undefined
  post:RESPONSE_POST[]|null = null
  postByID:RESPONSE_POST|null = null

  title = "POST"
  constructor(
    private jsonPlaceHolderService: JsonplaceholderService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private titleService:Title,
    private cookieService: CookieService
  ) { 
    this.titleService.setTitle("POST TITLE");
  }  

  fetchPost(): void {
    this.isLoading = true
      this.jsonPlaceHolderService.getPost().subscribe((data: RESPONSE_POST[]|false) => {
        this.isLoading = false
        this.post = (data === false) ? null : data;
      });

  }

  fetchPostById(id:number): void {
    this.isLoading = true
      this.jsonPlaceHolderService.getPostById(id).subscribe((data: RESPONSE_POST|false) => {        
        this.isLoading = false
        this.postByID = (data === false) ? null : data;      
      });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
    });

    this.postId = this.activatedRoute.snapshot.params['id'];
    if(this.postId !== undefined) {
      this.fetchPostById(this.postId)
    }else{
      this.fetchPost();
    }

  }
}

