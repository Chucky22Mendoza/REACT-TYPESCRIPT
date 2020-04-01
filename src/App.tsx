import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i,1);
    setTasks(newTasks);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card mt-5 bg-primary">
            <div className="card-title pt-5">
              <h3 className="text-center text-light">ADD A NEW TASK</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <input
                    type="text"
                    className="form-control col-md-10 offset-md-1"
                    onChange={e => setNewTask(e.target.value)}
                    value={newTask}
                    placeholder="Task Name..."
                    ref={taskInput}
                    autoFocus
                  />
                </div>
                <div className="form-group row">
                  <button className="btn btn-info btn-block text-dark col-md-10 offset-md-1">
                    SAVE
                  </button>
                </div>
              </form>
            </div>
          </div>

          {tasks.map((t: ITask, i: number) => (
            <div key={i} className="card card-body bg-info mt-2 text-center">
              <h2
                style={{ textDecoration: t.done ? "line-through" : "" }}
                className="text-dark"
              >
                {t.name}
              </h2>
              <div className="form-group row mt-2">
                <div className="col-md-6">
                  <button
                    className="btn btn-dark text-light col-md-8 offset-md-1"
                    onClick={() => toggleDoneTask(i)}
                  >
                    {t.done ? "✓" : "✗"}
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-dark col-md-8"
                    onClick={() => removeTask(i)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
