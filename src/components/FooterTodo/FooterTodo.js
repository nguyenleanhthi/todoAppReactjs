import React, { Component } from "react";
import "./FooterTodo.css";
class FooterTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const {
      todoItems,
      clearItemComplete,
      showAll,
      showActive,
      showComplete,
      btnActive,
    } = this.props;
    const { all, active, complete } = btnActive;
    return (
      <div className="footer">
        <ul>
          <li className="left">
            <p>
              {todoItems.filter((item) =>
                !item.isDelete ? !item.isComplete : false
              ).length + " "}
              items left
            </p>
          </li>
          <li className="middle">
            <a
              href="#/"
              className={all.isActive ? "active" : ""}
              onClick={showAll}
            >
              All
            </a>
            <a
              href="#/active"
              className={active.isActive ? "active" : ""}
              onClick={showActive}
            >
              Active
            </a>
            <a
              href="#/Complete"
              className={complete.isActive ? "active" : ""}
              onClick={showComplete}
            >
              Completed
            </a>
          </li>
          <li className="right">
            <button onClick={clearItemComplete}>Clear complete</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default FooterTodo;
