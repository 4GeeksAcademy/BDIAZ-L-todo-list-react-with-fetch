import React, {useState, useEffect}from "react";

//create your first component
const Home = () => {

	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState(["No tasks here, add tasks"]);

	
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