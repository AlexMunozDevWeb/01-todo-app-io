import { useState } from "react"

export const useTodoList = () => {

  const [todoList, setTodoList] = useState([])
  const [todoFilter, setTodoFilter] = useState([])

  // Add an element to the state
  function addItemTodo(task) {
    setTodoList( [...todoList, task] )
  }

  // Remove an element to the state
  function removeItemTodo(taskToRemove){
    const updatedTodoList = todoList.filter( todoList => todoList.id !== taskToRemove.id )
    setTodoList(updatedTodoList)
  }

  /**
   * @param {*} taskId 
   * * Updating the field active given the id
   * * prevState -> es una función que recibe el estado anterios
   */
  function changeActiveField(taskId){
    setTodoList(prevState =>
      prevState.map(item =>
        item.id === taskId ? { ...item, active: !item.active } : item
      )
    );
  }

  // Filter by active todo
  function filterTodo(e, buttonType){
    e.preventDefault()    
    let updatedTodo = []

    updatedTodo = buttonType === 'active' ? todoList.filter( todoList => todoList.active ) : 
                  buttonType === 'completed' ? todoList.filter( todoList => !todoList.active ): [] 
                  
    console.log(updatedTodo);
    setTodoFilter(updatedTodo)
  }

  // Restart the TODO list
  function restartTodo(e){
    e.preventDefault()
    const updatedTodo = todoList.filter( todoList => todoList.active === true )
    setTodoList(updatedTodo)
  }

  return {
    todoList,
    todoFilter,
    addItemTodo,
    removeItemTodo,
    filterTodo,
    changeActiveField,
    restartTodo
  }
}

