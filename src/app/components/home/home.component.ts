import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  posts: Post[] = [];

  constructor(private authService: AuthService, private postService: PostService,private router: Router) {}
  ngOnInit(): void {
    this.loadPosts();
  }
 
  loadPosts(): void {
    this.postService.getPosts().subscribe(
      (posts) => {
        this.posts = posts;
        this.posts.forEach((post) => {
          if (post.mediaUrl) {
            if (post.mediaType === 'IMAGE') {
              // Si c'est une image, récupérer en base64
              this.postService.getMediaBase64(post.mediaUrl).subscribe(
                (base64Image) => {
                  // Ne pas concaténer deux fois "data:image/jpeg;base64"
                  post.mediaUrl = `data:image/jpeg;base64,${base64Image}`;
                },
                (error) => {
                  console.error('Erreur lors de la récupération de l\'image :', error);
                }
              );
            } else if (post.mediaType === 'VIDEO') {
              // Si c'est une vidéo, utiliser l'URL directe
              post.mediaUrl = this.postService.getMediaUrl(post.mediaUrl);
            }
          }
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des posts :', error);
      }
    );
  }






}

