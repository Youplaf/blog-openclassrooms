import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/Post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() post: Post;
  @Input() index: number;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
  }

  getColor() {
    if(this.post.loveIts > 0){
      return 'green';
    } else if(this.post.loveIts < 0) {
      return 'red';
    } else {
      return 'black';
    }
  }

  onLoveIt() {
    this.post.loveIts++;
    this.postsService.updatePost(this.index, this.post);
  }

  onDontLoveIt() {
    this.post.loveIts--;
    this.postsService.updatePost(this.index, this.post);
  }

  onDelete() {
    this.postsService.deletePost(this.index);
  }

}
