import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  selectedFile: File | null = null;
  editFile: File | undefined = undefined; // Fichier sélectionné pour la modification
  title: string = '';
  content: string = '';
  postToEdit: Post | null = null; // Post en cours de modification

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  // Charger les posts
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

  // Ajouter un post
  addPost(title: string, content: string): void {
    const newPost: Post = {
      id: 0, // Généré par le backend
      title,
      content,
      mediaUrl: '', // Valeur par défaut si aucun média n'est fourni
      mediaType: '', // Optionnel, valeur par défaut
      createdAt: new Date().toISOString(), // Optionnel
      updatedAt: new Date().toISOString(),
      reactions: []
    };

    this.postService.createPost(newPost).subscribe(
      (post) => {
        if (this.selectedFile) {
          // Si un fichier est sélectionné, uploader le média
          this.uploadMedia(post.id);
        } else {
          // Sinon, recharger la liste des posts
          this.loadPosts();
        }
      },
      (error) => {
        console.error('Erreur lors de la création du post :', error);
      }
    );
  }

  // Uploader un média pour un nouveau post
  uploadMedia(postId: number): void {
    if (this.selectedFile) {
      this.postService.uploadMedia(postId, this.selectedFile).subscribe(
        (fileName) => {
          const mediaType = this.selectedFile!.type.startsWith('image') ? 'IMAGE' : 'VIDEO';
          const updatedPost: Post = { ...this.posts.find((post) => post.id === postId)! };
          updatedPost.mediaUrl = fileName;
          updatedPost.mediaType = mediaType;
  
          this.postService.updatePost(postId, updatedPost).subscribe(
            () => {
              this.loadPosts();
            },
            (error) => {
              console.error('Erreur lors de la mise à jour du post :', error);
            }
          );
        },
        (error) => {
          alert(error.message); // Afficher le message d'erreur à l'utilisateur
        }
      );
    }
  }

  // Modifier un post
  editPost(post: Post): void {
    this.postToEdit = { ...post }; // Copier le post pour la modification
  }

  // Enregistrer les modifications d'un post

// post-list.component.ts (Angular)

updatePost(post: Post): void {
  if (this.postToEdit) {
      // Convertir `null` en `undefined` pour correspondre au type attendu
      const fileToUpload = this.editFile !== null ? this.editFile : undefined;

      this.postService.updatePost(post.id, post, fileToUpload).subscribe(
          () => {
              this.loadPosts();
              this.cancelEdit();
          },
          (error) => {
              console.error('Erreur lors de la mise à jour du post :', error);
          }
      );
  }
}

  // Enregistrer le post mis à jour
  saveUpdatedPost(post: Post): void {
    this.postService.updatePost(post.id, post).subscribe(
      () => {
        this.loadPosts(); // Recharger la liste des posts
        this.cancelEdit(); // Fermer le formulaire de modification
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du post :', error);
      }
    );
  }

  cancelEdit(): void {
    this.postToEdit = null; // Réinitialiser le post en cours de modification
    this.editFile = undefined; // Réinitialiser le fichier sélectionné pour la modification
  }

  // Gérer la sélection de fichier pour l'ajout
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      const maxSize = 10 * 1024 * 1024; // 10 Mo
  
      if (file.size > maxSize) {
        alert('Le fichier est trop volumineux. La taille maximale autorisée est de 10 Mo.');
        return;
      }
  
      this.selectedFile = file;
    }
  }

  // Gérer la sélection de fichier pour la modification
// post-list.component.ts (Angular)

onEditFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input?.files?.[0]) {
      this.editFile = input.files[0]; // `editFile` est maintenant de type `File | undefined`
  } else {
      this.editFile = undefined; // Au lieu de `null`
  }
}

  // Supprimer un post
  deletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe(
      () => {
        this.loadPosts();
      },
      (error) => {
        console.error('Erreur lors de la suppression du post :', error);
      }
    );
  }
}