import { useSelector, useDispatch } from 'react-redux'
import { add, remove, done } from './redux/todoSlice'
import { useEffect, useState } from 'react'
import plus from './assets/images/Plus.svg'
import deleteBtn from './assets/images/TrashSimple.svg'
import tick from './assets/images/Check.svg'
import returnSvg from './assets/images/return.svg'
import './App.css'

function App() {
  const todoValue = useSelector(state => state.todo.value)
  const [inputValue, setInputValue] = useState('')
  const [doneTask, setDoneTask] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const setLocal = localStorage.getItem('done')

    if (setLocal) {
      setDoneTask(JSON.parse(setLocal))
    }
  }, [])

  function handleAdd(event) {
    event.preventDefault()
    if (inputValue.length < 3) {
      return alert('Type at least three letters!')
    }

    dispatch(add(inputValue))
    setInputValue('')
  }

  function handleDelete(id) {
    dispatch(remove(id))
  }

  function handleDone(id) {
    const completed = todoValue[id]

    const Done = JSON.parse(localStorage.getItem('done')) || [];
    const updatedDone = [...Done, completed];
    localStorage.setItem('done', JSON.stringify(updatedDone));

    dispatch(done(id))
    setDoneTask([...doneTask, completed])
  }

  function handleRestore(id) {
    const restored = doneTask[id]

    const updatedDone = doneTask.filter((_, i) => i !== id);
    localStorage.setItem('done', JSON.stringify(updatedDone));

    setDoneTask(updatedDone)
    dispatch(add(restored))
  }

  return (
    <div>
      <div>
        {/* form */}
        <form className='single_form'>
          <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='single_input' type="text" placeholder='Add a new task' />
          <button onClick={handleAdd} className='adder_button' type='submit'>
            <img src={plus} alt="add" />
          </button>
        </form>

        {/* tasks */}

        <div className='task_section'>
          <h3 className='task_counter'>Tasks to do - {todoValue.length}</h3>
          {/* box */}

          {
            todoValue.length > 0 && todoValue.map((item, index) => {
              return (
                <div key={index} className='box'>
                  <h3 className='task_name'>{item}</h3>
                  <div className='buttons'>
                    <button onClick={() => handleDone(index)} className='button'>
                      <img src={tick} alt="Tick" />
                    </button>
                    <button onClick={() => handleDelete(index)} className='button'>
                      <img src={deleteBtn} alt="delete" />
                    </button>
                  </div>
                </div>
              )
            })
          }

          {/* Done */}

          <div className='done_section'>
            <h3 className='done_counter'>Done - {doneTask.length}</h3>
            {
              doneTask.length > 0 && doneTask.map((item, index) => {
                return (
                  <div className='box' key={index}>
                    <h3 className='done_task'>{item}</h3>
                    <button onClick={() => handleRestore(index)} className='return'>
                      <img className='image' src={returnSvg} alt="return" />
                    </button>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App