import React, { useEffect, useState } from "react";


export const Fetch = () => {

    const [task, setTask] = useState('')
    const [data, setData] = useState([])
    let counter = data.length

    useEffect(()=> {
         getUsersCreated()
    }, [])
    
    const createUser = () => {
        fetch('https://playground.4geeks.com/todo/users/Ruben7ctrl', {
            method: 'Post'
        })
        .then( response => {
            if (!response.ok) throw new Error(`error code: ${response.status}`)
                return response.json()
    })
        .then(data => getUsersCreated())
        .catch(err=>console.log(err))
    }

    const getUsersCreated = () => {
        fetch('https://playground.4geeks.com/todo/users/Ruben7ctrl')
        .then( response => {
            if (!response.ok) throw new Error(`error code: ${response.status}`)
                return response.json()
    })
        .then(data => {
            if (data.todos.length === 0) {
                setData(["No tasks, add tasks!!!"])
            } else {
            setData(data.todos)};
        })
    
        .catch(err => createUser())
    }

    // useEffect(() => {
    //     if (task.length > 0) {
    //         fetch('https://playground.4geeks.com/todo/todos/Ruben7ctrl', {
    //             method: 'Post',
    //             body: JSON.stringify({
    //                 'label': task,
    //                 'is_done': false
    //             }),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         .then( response => {
    //             if (!response.ok) throw new Error(`error code: ${response.status}`)
    //                 return response.json()
    //     })
    //         .then(data => {
    //             console.log(data)
    //             setData('')
    //     })
    //         .catch(err=>console.log(err))
    // }

    // }, [data])


    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('https://playground.4geeks.com/todo/todos/Ruben7ctrl', {
            method: 'Post',
            body: JSON.stringify({
                'label': task,
                'is_done': false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            if (!response.ok) throw new Error(`error code: ${response.status}`)
                return response.json()
    })
        .then(data => {
            console.log(data)
            getUsersCreated()
            setTask('')
    })
        .catch(err=>console.log(err))
}

        

    const handleDelete = (id) => {
        fetch('https://playground.4geeks.com/todo/todos/' + id, {
			method: 'DELETE', 
		})
			.then(resp => {
				getUsersCreated()
			})

    }

    const handleWorkChange = (e) => {
        setTask(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.code == 'enter') {
                handleSubmit(e)
        }
    }
    
    counter = data.length

    const handleClick = () => {
        fetch('https://playground.4geeks.com/todo/users/Ruben7ctrl', {
			method: 'DELETE', //que tipo de pedido 
		})
			.then(resp => {
                if (!resp.ok) throw new Error(`error code: ${resp.status}`);
				getUsersCreated()
			})
            .catch(err => console.log(err));
    }

console.log(data)

    return (
        <>
            <div className="tareas">
                <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} >
                    <input type="text" placeholder="What needs to do?" value={task} onChange={handleWorkChange}/>
                </form>

                <ul>
                    {data && data.map((el, i) => el === "No tasks, add tasks!!!" ? ( <li key={i}>{el}</li> ) : <li key={i}>{el.label}<span onClick={() => handleDelete(el.id)} className="text-danger p-1"><i className="fa-brands fa-x-twitter"></i></span></li>)}
                </ul>
                <div className="down">
                    <p className="counter">Items {counter}</p>
                    <button className="btn bg-white text-dark" onClick={handleClick}>Reset List <i className="fa-solid fa-power-off"></i></button>
                </div>
                
            </div>
        </>
    )
}