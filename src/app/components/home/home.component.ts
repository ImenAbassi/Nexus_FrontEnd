import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';
import { ReactionType } from 'src/app/models/ReactionType.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  reactionTypes = Object.values(ReactionType); // Expose reaction types to the template

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  // Load all posts
  loadPosts(): void {
    this.postService.getPosts().subscribe(
      (posts) => {
        this.posts = posts;
        this.posts.forEach((post) => {
          if (post.mediaUrl) {
            if (post.mediaType === 'IMAGE') {
              this.postService.getMediaBase64(post.mediaUrl).subscribe(
                (base64Image) => {
                  post.mediaUrl = `data:image/jpeg;base64,${base64Image}`;
                },
                (error) => {
                  console.error('Erreur lors de la récupération de l\'image :', error);
                }
              );
            } else if (post.mediaType === 'VIDEO') {
              post.mediaUrl = this.postService.getMediaUrl(post.mediaUrl);
            }
          }
          // Load reaction counts for each post
          this.loadReactionCounts(post.id);
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des posts :', error);
      }
    );
  }

  // Load reaction counts for a post
  loadReactionCounts(postId: number): void {
    this.postService.getReactionCounts(postId).subscribe(
      (counts) => {
        const post = this.posts.find((p) => p.id === postId);
        if (post) {
          post.reactions = counts;
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des réactions :', error);
      }
    );
  }

  // Add a reaction to a post
  addReaction(postId: number, type: ReactionType): void {
    const reactedBy = 'user123'; // Replace with the actual user ID or username
    this.postService.addReaction(postId, type, reactedBy).subscribe(
      () => {
        this.loadReactionCounts(postId); // Refresh reaction counts
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la réaction :', error);
      }
    );
  }

  // Get the total number of reactions
  getTotalReactions(reactions: { [key: string]: number }): number {
    return reactions ? Object.values(reactions).reduce((a, b) => a + b, 0) : 0;
  }

  // Get the icon for a reaction type
  getReactionIcon(reactionType: ReactionType): string {
    switch (reactionType) {
      case ReactionType.LIKE:
        return '../assets/img/thumb-up.png';
      case ReactionType.LOVE:
        return '../assets/img/heart.png';
      case ReactionType.HAHA:
        return '../assets/img/happy-face.png';
      case ReactionType.WOW:
        return '../assets/img/wow.png'; // Add the appropriate icon
      case ReactionType.SAD:
        return '../assets/img/sad-face.png';
      case ReactionType.ANGRY:
        return '../assets/img/angry.png';
      default:
        return '';
    }
  }
}