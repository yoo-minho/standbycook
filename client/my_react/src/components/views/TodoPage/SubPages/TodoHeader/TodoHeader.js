import React, { useContext } from 'react'
import { TodoContext } from '../../Stores/TodoStore.js'
import './TodoHeader.css'


function TodoHeader() {

    const {Todos} = useContext(TodoContext);

    return (
        <>
            <h1>투두애플리케이션</h1>
            <div className="countInfo">
                해야할일 : {Todos.filter(v=>v.todo_status==="N").length}개가 있습니다.
            </div>
        </>
    )
}

export default TodoHeader