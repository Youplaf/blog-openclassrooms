import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../models/Post.model';
import { Subscription } from 'rxjs/Subscription';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  @Input() posts: Post [];
  postsSubscription: Subscription;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postsService.emitPostsSubject();
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
