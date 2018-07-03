import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject ,  Observable } from 'rxjs';

import { map } from 'rxjs/operators';


import { configDoc } from './configDoc';

const { host, port } = configDoc;

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  _documents = new BehaviorSubject<Document[]>([]);
  
  constructor(
    private http: HttpClient
  ) { }

  get documents() {
    return this._documents.asObservable();
  }

  loadAll() {
    this.http.get<Document[]>(`http://${host}:${port}/api/document`).subscribe(
      docs => this._documents.next(docs)
    );
  }

  addDocument(document): Observable<Document> {
    return this.http.post<Document>(`http://${host}:${port}/api/document`, document, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  editDocument(document) {
    return this.http.put(`http://${host}:${port}/api/document/${document.ID}`, document, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteDocument(id) {
    return this.http.delete(`http://${host}:${port}/api/document/${id}`);
  }

  getDocumentsForContext(id): Observable<Document[]> {
    return this.http.get<any>(`http://${host}:${port}/rest/Work_context(${id})/documents?$expand=documents`).pipe(
      map(data => data.documents.__ENTITIES)
    );
  }

  uploadDocument(formData) {
    return this.http.post(`http://${host}:${port}/api/uploaddocument`, formData, {
      responseType: 'text'
    });
  }

  downloadDocument(id) {
    return this.http.get(`http://${host}:${port}/api/downloaddocument/${id}`, {
      responseType: 'blob'
    });
  }
}