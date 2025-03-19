import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Post } from '../models/post.model';
import { ReactionType } from '../models/ReactionType.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:8081/nexus/api/posts'; // URL de votre API Spring Boot

  constructor(private http: HttpClient) {}

  // Créer un post
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post).pipe(
      catchError((error) => {
        console.error('Erreur lors de la création du post :', error);
        return throwError(() => new Error('Erreur lors de la création du post'));
      })
    );
  }

  // Mettre à jour un post

updatePost(id: number, post: Post, file?: File): Observable<Post> {
  const formData = new FormData();
  formData.append('post', new Blob([JSON.stringify(post)], { type: 'application/json' }));
  if (file) {
      formData.append('file', file, file.name);
  }
  return this.http.put<Post>(`${this.apiUrl}/${id}`, formData).pipe(
      catchError((error) => {
          console.error('Erreur lors de la mise à jour du post :', error);
          return throwError(() => new Error('Erreur lors de la mise à jour du post'));
      })
  );
}

  // Récupérer tous les posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des posts :', error);
        return throwError(() => new Error('Erreur lors de la récupération des posts'));
      })
    );
  }

  // Supprimer un post
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la suppression du post :', error);
        return throwError(() => new Error('Erreur lors de la suppression du post'));
      })
    );
  }

  // Uploader un média
  uploadMedia(postId: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<string>(`${this.apiUrl}/${postId}/upload`, formData).pipe(
      catchError((error) => {
        if (error.status === 413) {
          console.error('Le fichier est trop volumineux.');
          return throwError(() => new Error('Le fichier est trop volumineux. La taille maximale autorisée est de 10 Mo.'));
        } else {
          console.error('Erreur lors de l\'upload du média :', error);
          return throwError(() => new Error('Erreur lors de l\'upload du média'));
        }
      })
    );
  }
  // Récupérer un média en base64
  getMediaBase64(fileName: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/media/${fileName}/base64`, { responseType: 'text' }).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération du média en base64 :', error);
        return throwError(() => new Error('Erreur lors de la récupération du média en base64'));
      })
    );
  }

  getMediaUrl(fileName: string): string {
    return `http://localhost:8081/nexus/api/posts/uploads/${fileName}`;
  }
  // Add a reaction to a post
  addReaction(postId: number, type: ReactionType, reactedBy: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${postId}/reactions`, { type, reactedBy });
  }

  // Get reaction counts for a post
  getReactionCounts(postId: number): Observable<{ [key: string]: number }> {
    return this.http.get<any>(`${this.apiUrl}/${postId}/reactions/count`);
  }
}