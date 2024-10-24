import React, { Component } from "react";
import "./TodoApp.css";

export default class TodoApp extends Component {
  state = {
    input: "",
    edit: "",
    data: [],
  };
  inputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  submit = (event) => {
    event.preventDefault();
    const { input } = this.state;
    if (input === "") return;
    this.setState((prevState) => ({
      data: [...prevState.data, { list: input, status: false }],
      input: "",
    }));
  };
  deleteItem = (index) => {
    this.setState({
      data: this.state.data.filter((data, ind) => ind !== index),
    });
  };
  complete = (index) => {
    this.setState((prevState) => ({
      data: prevState.data.map((value, ind) => {
        if (index === ind) {
          return { ...value, status: !value.status };
        }
        return value;
      }),
    }));
  };
  edit = (index) => {
    const editInput = document.getElementById(`edit${index}`);
    if (editInput.style.display === "block") {
      editInput.style.display = "none";
    } else {
      editInput.style.display = "block";
    }
    this.setState({ edit: this.state.data[index].list });
  };
  editSubmit = (event, index) => {
    event.preventDefault();
    this.setState((prevState) => ({
      data: prevState.data.map((value, ind) => {
        if (index === ind) {
          return { ...value, list: this.state.edit };
        }
        return value;
      }),
    }));
    document.getElementById(`edit${index}`).style.display = "none";
  };
  editOnchange = (event, index) => {
    this.setState({ edit: event.target.value });
  };

  render() {
    const { input, data, edit } = this.state;

    return (
      <div className="todo-container">
        <form className="input-section" onSubmit={this.submit}>
          <h1>Todo App</h1>
          <input
            type="text"
            value={input}
            onChange={this.inputChange}
            placeholder="Enter items..."
          />
        </form>
        <ul>
          {data.map((value, index) => (
            <div className="listItems">
              <li key={index} id={value.status ? "line-break" : ""}>
                {value.list}{" "}
                <div className="icons">
                  <i
                    id={value.status ? "check" : ""}
                    className="check fa-regular fa-circle-check"
                    onClick={() => this.complete(index)}
                  ></i>
                  <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => this.edit(index)}
                  ></i>
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => this.deleteItem(index)}
                  ></i>
                </div>
              </li>
              <form onSubmit={(event) => this.editSubmit(event, index)}>
                <input
                  type="text"
                  onChange={(event) => this.editOnchange(event, index)}
                  id={`edit${index}`}
                  value={edit}
                />
              </form>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}
