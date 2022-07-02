import { Todo } from "./todo.class";

export class TodoList {
  constructor() {
    // this.todos = [];
    this.cargarLocalStorage();
  }

  nuevoTodo( todo ) {
    this.todos.push(todo);
    this.guardarLocalStorage();
  }

  eliminarTodo( id ) {
    this.todos = this.todos.filter( todo => todo.id != id);
    this.guardarLocalStorage();
  }

  marcarCompletado( id ) {
    for(const todo of this.todos) {
      if(todo.id == id) {
        todo.completado = !todo.completado;
        this.guardarLocalStorage();
        break;
      }
    }
  }

  eliminarCompletados() {
    this.todos = this.todos.filter( todo => !todo.completado);
    this.guardarLocalStorage();
  }

  guardarLocalStorage() {
    localStorage.setItem('todo', JSON.stringify(this.todos));
  }

  cargarLocalStorage() {
    this.todos = localStorage.getItem('todo') 
                  ? JSON.parse(localStorage.getItem('todo'))
                  : [];
    /**
     * Lo de arriba nos hara la conversión de los todos en un arreglo de objetos
     * no obstante, estos no seran de tipo Todo.
     * Para "transformarlos" devuelta todos haremos lo siguiente:
     */
    this.todos = this.todos.map( obj => Todo.fromJson( obj ));
  }
}