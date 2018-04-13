import { Injectable } from '@angular/core';
import { Post } from '../models/Post.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostsService {

  posts: Post[] = [];
  postsSubject = new Subject<Post[]>();

  constructor() { }

  emitPostsSubject() {
    this.postsSubject.next(this.posts.slice());
  }

  addPost(postToAdd: Post) {
    this.posts.push(postToAdd);
    this.emitPostsSubject();
  }

  updatePost(index: number, post: Post) {
    this.posts[index] = post;
    this.emitPostsSubject();
  }

  deletePost(index: number) {
    this.posts.splice(index, 1);
    this.emitPostsSubject();
  }

}
