export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
  date: number;
}

export interface ToDoState {
  todos: ToDo[];
}
