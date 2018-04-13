import { Injectable } from '@angular/core';
import { Post } from '../models/Post.model';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostsService {

  posts: Post[] = [];
  postsSubject = new Subject<Post[]>();

  constructor(
    private httpClient: HttpClient
  ) { }

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

  savePostsToServer() {
      this.httpClient
      .put("https://blog-c3fd0.firebaseio.com/posts.json", this.posts)
      .subscribe(
          () => {
              console.log('Enregistrement terminé !');
          },
          (error) => {
              console.log('Erreur de sauvegarde ! ' + error);
          }
      )
  }

  getPostsFromServer() {
      this.httpClient
          .get<any[]>("https://blog-c3fd0.firebaseio.com/posts.json")
          .subscribe(
              (response) => {
                  this.posts = response;
                  this.emitPostsSubject();
              },
              (error) => {
                  console.log('Erreur de chargement ! ' + error);
              }
          );
  }

}
