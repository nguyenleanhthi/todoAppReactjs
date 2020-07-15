import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import TodoItems from "./components/TodoItems/TodoItems";
import FooterTodo from "./components/FooterTodo/FooterTodo";
import TrafficLight from "./components/TrafficLight/TrafficLight";

import tick from "./images/tick.svg";
import { Button } from "reactstrap";
const red = 0;
const orange = 1;
const green = 2;
class App extends Component {
  constructor() {
    super();
    this.state = {
      currentColor: red,
      todoItems: [
        {
          title: "di mua bim bim",
          isComplete: true,
          isDelete: false,
          isShow: true,
        },
        {
          title: "di da bong",
          isComplete: false,
          isDelete: false,
          isShow: true,
        },
        { title: "di cho", isComplete: false, isDelete: false, isShow: true },
      ],
      btnActive: {
        all: { isActive: true },
        active: { isActive: false },
        complete: { isActive: false },
      },
    };
    setInterval(() => {
      this.setState({
        currentColor: this.getNextColor(this.state.currentColor),
      });
    }, 1000 * 1000 * 1000);

    this.onKeyUp = this.onKeyUp.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.clearItemComplete = this.clearItemComplete.bind(this);
    this.showAll = this.showAll.bind(this);
    this.showActive = this.showActive.bind(this);
    this.showComplete = this.showComplete.bind(this);
  }
  getNextColor(color) {
    switch (color) {
      case red:
        return orange;
      case orange:
        return green;
      default:
        return red;
    }
  }
  onClickTodoItem(item) {
    return (event) => {
      const { todoItems } = this.state;
      const { all } = this.state.btnActive;
      const currentTodoItems = todoItems.map((i) =>
        i === item
          ? {
              ...item,
              isComplete: !item.isComplete,
              isShow: all.isActive ? true : !item.isShow,
            }
          : i
      );
      this.setState({
        todoItems: currentTodoItems,
      });
    };
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      //enter key
      let text = event.target.value;
      if (!text || text === "") return;

      text = text.trim();
      if (!text) return;

      const { complete } = this.state.btnActive;
      this.setState({
        todoItems: [
          {
            title: text,
            isComplete: false,
            isDelete: false,
            isShow: complete.isActive ? false : true,
          },
          ...this.state.todoItems,
        ],
      });
      event.target.value = "";
    }
  }

  checkAll() {
    const todoItemIsCompleteFalse = this.state.todoItems.find(
      (item) => !item.isComplete
    );
    if (todoItemIsCompleteFalse) {
      this.setState({
        todoItems: this.state.todoItems.map((item) => ({
          ...item,
          isComplete: true,
        })),
      });
    } else {
      this.setState({
        todoItems: this.state.todoItems.map((item) => ({
          ...item,
          isComplete: false,
        })),
      });
    }
    console.log(1);
    console.log(
      this.state.todoItems.map((item) => {
        item.isComplete = false;
      })
    );
  }

  onClickDeleteTodoItem(item) {
    return (event) => {
      const { todoItems } = this.state;
      this.setState({
        todoItems: todoItems.map((i) =>
          i === item ? { ...item, isDelete: true } : i
        ),
      });
    };
  }

  clearItemComplete() {
    const { todoItems } = this.state;
    this.setState({
      todoItems: todoItems.map((item) =>
        item.isComplete ? { ...item, isDelete: true } : item
      ),
    });
  }

  showAll() {
    const { todoItems } = this.state;
    this.setState({
      todoItems: todoItems.map((item) => ({ ...item, isShow: true })),
      btnActive: {
        all: { isActive: true },
        active: { isActive: false },
        complete: { isActive: false },
      },
    });
  }
  showActive() {
    const { todoItems } = this.state;
    this.setState({
      todoItems: todoItems.map((item) =>
        item.isComplete ? { ...item, isShow: false } : { ...item, isShow: true }
      ),
      btnActive: {
        all: { isActive: false },
        active: { isActive: true },
        complete: { isActive: false },
      },
    });
  }
  showComplete() {
    const { todoItems } = this.state;
    this.setState({
      todoItems: todoItems.map((item) =>
        !item.isComplete
          ? { ...item, isShow: false }
          : { ...item, isShow: true }
      ),
      btnActive: {
        all: { isActive: false },
        active: { isActive: false },
        complete: { isActive: true },
      },
    });
  }

  render() {
    const { currentColor, todoItems } = this.state;
    return (
      <div className="App">
        <h1 className="title text-center">Todos</h1>
        <div className="container">
          <div className="header">
            <img
              onClick={this.checkAll}
              src={tick}
              width={32}
              style={{ cursor: "pointer" }}
            ></img>
            <input
              type="text"
              placeholder="Add a new item"
              onKeyUp={this.onKeyUp}
            />
          </div>
          {todoItems.find((item) => !item.isDelete) &&
            todoItems.map((item, index) =>
              item.isDelete === false && item.isShow === true ? (
                <TodoItems
                  key={index}
                  item={item}
                  onClickTodoItem={this.onClickTodoItem(item)}
                  onClickDeleteTodoItem={this.onClickDeleteTodoItem(item)}
                ></TodoItems>
              ) : (
                ""
              )
            )}
          {!todoItems.find((item) => !item.isDelete) && (
            <p className="m-0" style={{ padding: "10px 5px", fontSize: 24 }}>
              không có dữ liệu
            </p>
          )}
          {/* <TrafficLight currentColor={currentColor}></TrafficLight> */}
          {todoItems.find((item) => !item.isDelete) && (
            <FooterTodo
              todoItems={todoItems}
              clearItemComplete={this.clearItemComplete}
              showAll={this.showAll}
              showActive={this.showActive}
              showComplete={this.showComplete}
              btnActive={this.state.btnActive}
            ></FooterTodo>
          )}
        </div>
      </div>
    );
  }
}

export default App;
