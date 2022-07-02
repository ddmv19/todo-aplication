import { Todo } from "../classes";
import { todoList } from "../index";

//Referencias en HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const clearCompleted = document.querySelector('.clear-completed');
const filtros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {
  const htmlTodo = `
  <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

  const div =  document.createElement('div');
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild);

  return div.firstElementChild;
}

//Eventos
txtInput.addEventListener('keyup', ( event ) => {
  if(event.keyCode === 13 && txtInput.value.length > 0) {
    const nuevoTodo = new Todo( txtInput.value );
    todoList.nuevoTodo( nuevoTodo );
    
    crearTodoHtml( nuevoTodo );
    txtInput.value = '';
  }
});

/** Tachar y actualizar 'completed' de nuestra Todo List
 * En este caso estamos realizando el evento en el ul
 * la constante nombreElemento tendremos el elemento html
 * la constante todoElemento tendremos el item (li) de nuestra lista
 * y mediante la constante todoId recuperamos el id de nuestro
 * item o todo 
 */

divTodoList.addEventListener('click', ( event ) => {
  const nombreElemento = event.target.localName;
  const todoElemento = event.target.parentElement.parentElement;
  const todoId = todoElemento.getAttribute('data-id');

  if(nombreElemento.includes('input')) {
    todoList.marcarCompletado( todoId );
    todoElemento.classList.toggle('completed');
  } else if(nombreElemento.includes('button')) {
    todoList.eliminarTodo( todoId );
    divTodoList.removeChild(todoElemento);
  }

});

clearCompleted.addEventListener('click', () => {
  const todosCompleted = document.querySelectorAll('.completed');
  todosCompleted.forEach( todo => {
    console.log( todo );
    divTodoList.removeChild( todo );
  });
  console.log('click');
  todoList.eliminarCompletados();
  console.log( todoList );
});

filtros[0].addEventListener('click', () => {
  console.log('Mostrar todos');
  console.log(todoList);
  divTodoList.innerHTML = '';
  todoList.todos.forEach( todo => {
    crearTodoHtml(todo);
  });
});

filtros[1].addEventListener('click', () => {
  const allTodos = document.querySelectorAll('li');
  allTodos.forEach( todo => {
    if(todo.classList.contains('completed')) {
      divTodoList.removeChild(todo);
    }
  });
});

filtros[2].addEventListener('click', () => {
  const todosCompleted = document.querySelectorAll('li');
  todosCompleted.forEach( todo => {
    if(!todo.classList.contains('completed') && 
        !todo.lastElementChild.classList.contains('selected') &&
        !todo.lastElementChild.classList.contains('filtro')) {
      console.log(todo);
      divTodoList.removeChild(todo);
    }
  });
});

