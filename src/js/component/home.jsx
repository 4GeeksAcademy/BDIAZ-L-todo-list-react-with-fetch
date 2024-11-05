import React, {useState, useEffect}from "react";

//create your first component
const Home = () => {

	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState(["No tasks here, add tasks"]);

	
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
					tasks[0] = newTask;
				} else {
					tasks.push(newTask);
				}
				setNewTask("")
			}	
		}
	}
	const deteleTask = (event, item) => {
		setTasks(tasks.filter((i) => i !== item));
	}

	const getUsers = () =>{
		fetch('https://playground.4geeks.com/todo/users?offset=0&limit=100', {
			method: "GET",
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			  console.log(`resp.ok: ${resp.ok}`); // Será true si la respuesta es exitosa
			  console.log(`resp.status: ${resp.status}`); // El código de estado 200, 300, 400, etc.
			 //console.log(`resp.text(): ${resp.text()}`); // Intentará devolver el resultado exacto como string
			  return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
		  })
		  .then(data => {
			const users = data.users; // Asegúrate de acceder al array en la clave correcta
			console.log("arrayData: ", users)

			console.log(users.find((user, index, array) => {return user.name === "bdiaz"}));
		  })
		  .catch(error => {
			  // Manejo de errores
			  console.log(error);
		  });
	}

	return (
		<div className="container mt-5">
			<h1 className="todo-header text-center">Todos</h1>
			<input className="form-control" type="text" onChange={TaskChanger} onKeyDown={addTask} value={newTask} placeholder="Add to do here"/>
			<ul className="list-group">
				{tasks.map((item, index) => {
					return <li key={index} className="list-group-item"><span onClick={(e)=>{deteleTask(e,item)}}><i className="fa fa-trash" item={item}></i></span>{item}</li>
				})}
				<li className="list-group-item paper"><small className="">{tasks.length} item left</small></li>
	  		</ul>
		</div>

	);
};

export default Home;