import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, [])


// Fetch Task from server
const fetchTasks = async () => {
  const res = await fetch("http://localhost:6000/tasks");
  const data = await res.json();

  return data;
}

//Fetch task singular
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json();

  return data;
}

// Toggle Add task function
const [showAddTask, setShowAddTask] = useState(false);

// Add Task function
const addTask = async (task) => {
  const newTask = {...task};
  setTasks([...tasks, newTask]);
  const res = await fetch(`http://localhost:5000/tasks`, 
    {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  });
  return res;
}

// Delete Task function
const deleteTask = async (id) => {
  setTasks(tasks.filter((task) => task.id !== id))
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })
}

// Toggle Reminder Function
const toggleReminder = async (id) => {
  setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder } : task))

  const taskToToggle = await fetchTask(id);
  const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder};
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updateTask)
  })
  return res;
}

  return (
    <div className="container">
     <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
     {showAddTask ? <AddTask onAdd={addTask}/> : ""}
     {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : "No tasks to show!"}
    </div>
  );
}

export default App;
