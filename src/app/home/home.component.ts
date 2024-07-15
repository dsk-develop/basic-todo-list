import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
interface TodoItem {
  id: number;
  title: string;
  status: string;
  description: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedStatus: string = '';
  showCreateForm: boolean = false;
  todos: any;
 
  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  title: string = '';
  description: string = '';
  status: any[] = [
    {value: 'OPEN', label: 'OPEN'},
    {value: 'CLOSED', label: 'CLOSED'},
    {value: 'WIP', label: 'WIP'}
  ];
  ngOnInIy(){this.listTodos();
  }
  //create todo
  createTodo(): void {
    this.apiService.createToDo({title: this.title, description: this.description, status: this.status}).subscribe(
      (response: any) => {
        console.log(response);
        
        this.toastr.success('TODO created successfully!', 'Success');
        this.router.navigate(['/todos']);
      },
      (error: any) => {
        console.log(error);
        
        console.error('Failed to create TODO:', error);
        this.toastr.error('Failed to create TODO. Please try again.', 'Error');
      }
    );
  }
  // edit todo
  updateTodo(id: string): void {
    this.apiService.updateToDo(id, { title: this.title, description: this.description, status}).subscribe(
      (response: any) => {
        console.log(response);
        this.toastr.success('TODO updated successfully!', 'Success');
        this.router.navigate(['/todos']);
      },
      (error: any) => {
        console.error('Failed to update TODO:', error);
        this.toastr.error('Failed to update TODO. Please try again.', 'Error');
      }
    );
  }
  // delete todo
  deleteTodo(id: string): void {
    this.apiService.deleteToDo(id).subscribe(
      (response: any) => {
        console.log(response);
        this.toastr.success('TODO deleted successfully!', 'Success');
        this.router.navigate(['/todos']);
      },
      (error: any) => {
        console.error('Failed to delete TODO:', error);
        this.toastr.error('Failed to delete TODO. Please try again.', 'Error');
      }
    );
  }

  listTodos(): void {
    this.apiService.listToDos().subscribe(
      (response: any) => {
        console.log(response);
        this.todos = response.todos;
      },
      (error: any) => {
        console.error('Failed to fetch TODOs:', error);
        this.toastr.error('Failed to fetch TODOs. Please try again.', 'Error');
      }
    );
  }


  items: TodoItem[] = [
    { id: 1, title: 'Task 1', status: 'open', description:'Lorem Ipsum jgjhfu tyeyweuyu rtwfggd erterere..' },
    { id: 2, title: 'Task 2', status: 'closed', description:'Testing ..'  },
  ];
  filteredItems: TodoItem[] = [...this.items];
   // Status Filter 
   filterRecords(): void {
    if (this.selectedStatus) {
      this.filteredItems = this.items.filter(item => item.status === this.selectedStatus);
    } else {
      this.filteredItems = [...this.items];
    }
  }
  openCreateTodoForm(): void {
    this.showCreateForm = true;
  }

  closeCreateTodoForm(): void {
    this.showCreateForm = false;
  }
  // newTodo: TodoItem = { id: 0, title: '', status: 'open' , description: ''};
  // createTodo(todoForm: NgForm): void {
  //   if (todoForm.invalid) {
  //     return;
  //   }
  //   this.newTodo.id = this.items.length + 1;
  //   this.items.push({ ...this.newTodo });
  //   this.filterRecords();
  //   this.closeCreateTodoForm();
  //   todoForm.resetForm({ status: 'open' }); 
  // }
}
