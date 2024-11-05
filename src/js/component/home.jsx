import React, {useState, useEffect}from "react";

//create your first component
const Home = () => {

	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState([{label: "No tasks here, add tasks"}]);

	
	useEffect(() => {
		getUsers();
	  }, []);
	
	const TaskChanger = (event) => {
		if (event.target.value !== "") {setNewTask(event.target.value)}
	}
	const addTask = (event) => {
		if (event.target.value !== "") {
			if (event.key == "Enter") {
				if (tasks[0] === "No tasks here, add tasks") {
					//tasks[0] = newTask;
					setTasks(newTask)
				} else {
					tasks.push(newTask);
				}
				addTodo(newTask);
				setNewTask("")
				getTodos();
			}	
		}
	}
	const deteleTask = (event, id) => {
		deleteTodo(id);

	}

	const getUsers = () =>{
		fetch('https://playground.4geeks.com/todo/users?offset=0&limit=100', {
			method: "GET",
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			  console.log(`resp.ok: ${resp.ok}`); 
			  console.log(`resp.status: ${resp.status}`); 
			  return resp.json(); 
		  })
		  .then(data => {
			const users = data.users; 
			console.log("getUsers: ", users)
			users.find((user) => {return user.name === "bdiaz"}) 
				? getTodos()
				: createUser()
		  })
		  .catch(error => {
			  console.log(error);
		  });
	}

	const createUser = () => {
		fetch('https://playground.4geeks.com/todo/users/bdiaz', {
			method: "POST",
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			  console.log(resp.ok); 
			  console.log(resp.status); 
			  console.log(resp.text());
			  return resp.json(); 
		  })
		  .then(data => {
			  console.log("data");
			  console.log(data); 
		  })
		  .catch(error => {
			  console.log(error);
		  });
	}

	const getTodos = () => {
		console.log("getTodos")
		fetch('https://playground.4geeks.com/todo/users/bdiaz', {
			method: "GET",
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			  console.log(`resp.ok: ${resp.ok}`); 
			  console.log(`resp.status: ${resp.status}`); 
			  return resp.json(); 
		  })
		  .then(data => {
			console.log("data.todos: ", data.todos)
			data.todos.length === 0 
				? setTasks([{label: "No tasks here, add tasks"}])
				: setTasks(data.todos)			
		  })
		  .catch(error => {
			  console.log(error);
		  });
	}

	const addTodo = (task) => {
		fetch('https://playground.4geeks.com/todo/todos/bdiaz', {
			method: "POST",
			body: JSON.stringify({
				label: task,
				is_done: false
			}),
			headers: {
			"Content-Type": "application/json",
			"accept": "application/json"
			}
		})
		.then(resp => {
			console.log(resp.ok); 
			console.log(resp.status); 
			console.log(resp.text()); 
			return resp.json(); 
		})
		.then(data => {
			console.log(data); 
			getTodos();
		})
		.catch(error => {
			console.log(error);
		});
	}

	const deleteTodo = (idTask) =>{
		console.log(`idTask: ${idTask}`);
		fetch('https://playground.4geeks.com/todo/todos/' + idTask, {
			method: "DELETE",
			headers: {
				"accept": "application/json"
				}
		}).then(resp => {
			console.log(resp.ok); 
			console.log(resp.status); 
			return resp.json();
		}).then(data => {
			console.log(data);
			getTodos();
		}).catch (error => {
			console.log(error);
		})
	}

	return (
		<div className="container mt-5">
			<h1 className="todo-header text-center">Todos</h1>
			<input className="form-control" type="text" onChange={TaskChanger} onKeyDown={addTask} value={newTask} placeholder="Add to do here"/>
			<ul className="list-group">
				{tasks.map((task, index) => {
					return <li key={index} id={task.id} className="list-group-item"><span onClick={(e)=>{deteleTask(e,task.id)}}><i className="fa fa-trash"></i></span>{task.label}</li>
				})}
				<li className="list-group-item paper"><small className="">{tasks.length} item left</small></li>
	  		</ul>
		</div>

	);
};

export default Home;