import React, { Component } from "react";
import "./TodoItems.css";
import classnames from "classnames";
import PropTypes from "prop-types";

import checkImg from "../../images/check.svg";
import checkCompleteImg from "../../images/checked.svg";
import deleteTodoItem from "../../images/delete.svg";

class TodoItems extends Component {
  render() {
    console.log(this.props);
    const { item, onClickTodoItem, onClickDeleteTodoItem } = this.props;
    let classNameTodoItems = classnames("TodoItems");
    let url = checkImg;
    if (item.isComplete) {
      classNameTodoItems = classnames(classNameTodoItems, "TodoItems-complete");
      url = checkCompleteImg;
    }

    return (
      <div className={classNameTodoItems}>
        <img onClick={onClickTodoItem} src={url} width={32} />
        <p>{item.title}</p>
        <img
          className="delete-todo-item"
          src={deleteTodoItem}
          onClick={onClickDeleteTodoItem}
          width={32}
        />
      </div>
    );
  }
}

TodoItems.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    isComplete: PropTypes.bool,
  }),
  onClickTodoItem: PropTypes.func.isRequired,
};

export default TodoItems;
