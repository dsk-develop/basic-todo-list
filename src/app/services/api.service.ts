import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, timeout } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token: string = '';
  private jwtToken$: BehaviorSubject<string> = new BehaviorSubject<string>(this.token);
  private API_URL: string = 'http://localhost:3000/api/todos';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { 
    const fetchToken: string | null = localStorage.getItem('act');

      if (fetchToken) {
        // using descripted formate
        this.token = atob(fetchToken);
        this.jwtToken$.next(this.token);
      }
  }
  
  get jwtUserToken(): Observable<string> {
    return this.jwtToken$.asObservable();
  }
  // Create
  createToDo(body: {title: string, description: string, status: any[]}): Observable<any> {
    const token = this.token;
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.API_URL}`, body);
  }
  // headers can be pass using Interceptors
  // createToDo(title: string, description: string) {
  //   return this.http.post(`${this.API_URL}/createTodos`, { title, description }, { headers: { Authorization: `Bearer${this.token}` } });
  // }
  updateToDo(id: string, data: { title: string, description: string, status: string }): Observable<any> {
    return this.http.put(`${this.API_URL}/updateTodos/${id}`, data);
  }

  deleteToDo(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/deleteTodos/${id}`);
  }

  listToDos(): Observable<any> {
    return this.http.get(`${this.API_URL}/listTodos`);
  }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   return throwError('Something bad happened; please try again later.');
  // }
  
  // login
  login(username: string, password: string): void {
    this.http.post<{ token: string }>(`${this.API_URL}/auth/login`, { username, password })
      .subscribe(
        (res: { token: string }): void => {
          this.token = res.token;

          if (this.token) {
            this.toastr.success('Login Successful', '', {
              timeOut: 700,
              positionClass: 'toast-top-center',
            }).onHidden.toPromise().then((): void => {
              this.jwtToken$.next(this.token);
              localStorage.setItem('act', btoa(this.token));
              this.router.navigateByUrl('/').then();
            });
          }
        },
        (err: HttpErrorResponse) => this.toastr.error('Authorization Failed, try again', '', { timeOut: 700 })
      );
  }
  // logout
  logout() {
    // setting token and jwtToken to empty string
    this.token = '';
    this.jwtToken$.next(this.token);
    this.toastr
      .success('Logged out Successfully', '', { timeOut: 700 })
      .onHidden.subscribe((): void => {
        localStorage.removeItem('act');
        this.router.navigateByUrl('/login').then();
      });
    return '';
  }
  // get all todos
  getAllTodos(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(`${this.API_URL}/todos`, { headers });
  }
  // Update
  updateTodo(statusValue: string, todoId: number) {
    return this.http.patch(
      `${this.API_URL}/todos/${todoId}`,
      { status: statusValue },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      }).pipe(
        tap((res: any) => {
          if (res) {
            this.toastr.success('Status Updated Successfully', '', { timeOut: 1000 });
          }
        })
      );
  }
  // delete
  deleteTodo(todoId: number) {
    return this.http.delete(`${this.API_URL}/todos/${todoId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
    .pipe(
      tap((res: Object) => {
      if (res) {
        this.toastr.success('Status Updated Successfully', '', { timeOut: 1000 });
      }
    }))
  }
}
