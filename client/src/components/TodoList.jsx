import React, { useEffect, useState } from "react";
import "./todolist.css";
import axios from "axios";

function TodoList() {
    const [users, setUsers] = useState([]);

    const listUsers = () => {
        axios
            .get(`http://localhost:3000/api/v1/users/todo/`)
            .then((res) => {
                setUsers(res.data.users);
            })
            .catch((err) => console.log(err));
    };

    const [newTodo, setNewTodo] = useState("");
    const addTodo = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/users/todo",
                {
                    name: newTodo,
                    status: "uncomplete",
                }
            );
            setUsers([...users, response.data]);
            setNewTodo("");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        listUsers();
    }, [users]);
    return (
        <div>
            <div className="container">
                <h1>TODOLIST</h1>
                <div className="btn">
                    <div className="action">
                        <div className="action-add">
                            <input
                                type="text"
                                name="name"
                                placeholder="Add"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                            />
                        </div>
                        <button onClick={addTodo} className="action-icon">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <h2>Uncompleted Tasks</h2>
                        <ul>
                            {users.map((e, i) => (
                                <li key={e.id}>
                                    <span>{e.name}</span>
                                    <span>
                                        <button>hoàn thành</button>
                                        <button>xóa</button>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-6">
                        <h2>Completed Tasks</h2>
                        <ul>
                            <li>
                                <span>đã hoàn thành công việc 1</span>
                                <span>
                                    <button>đã hoàn thành</button>
                                    <button>xóa</button>
                                </span>
                            </li>
                            <li>
                                <span>đã hoàn thành việc 2</span>
                                <span>
                                    <button>đã hoàn thành</button>
                                    <button>xóa</button>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoList;
