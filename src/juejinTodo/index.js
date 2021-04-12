import React, { Component } from 'react'
// import React from 'react'
// const Component = React.Component
import { Button, Input, Empty, List, Typography, Divider } from 'antd';
import "./style.css"


  // 函数组件:函数式组件会默认接收一个 props 参数，然后返回一段 JSX
  function TodoItem(props) {
    return <li>Hello, {props.content}</li>;
  }
  // 类组件:通过继承自 React.Component 的类来代表一个组件
  // class TodoItem extends React.Component {
  // 类组件中，我们需要在 render 方法里面返回需要渲染的 JSX
  //   render() {
  //      return <li>Hello, {this.props.content}</li>;
  //   }
  // }

  function ClickButton() {
    function handleClick() {
      console.log('按钮被点击了');
    }
    return (
      // {
      //   /* React 中的事件要使用驼峰式命名：onClick，而不是全小写：onclick
      //     在 JSX 中，你传递的是一个事件处理函数，而不是一个字符串 */
      //   }
      <Button onClick={handleClick}>点我</Button>
    )
  }

  function Link() {
    function handleClick(event) {
      // 阻止默认事件
      event.preventDefault();
      console.log('链接被点击了，但是它不会跳转页面，因为默认行为被禁用了');
    }

    return (
      <a onClick={handleClick} href="https://tuture.co">点我</a>
    )
  }

  class Todo extends Component {
    // 通过在类组件中添加 constructor 方法，并在其中定义和初始化 State：
    //组件创建时调用，如果你不需要初始化 State ，即不需要 this.state = { ... } 这个过程，那么你不需要定义这个方法
    constructor(props) {
      super(props);

      this.state = {
        nowTodo: "",
        todoList: []
      };
    }
    handleChange(e) {
      this.setState({
        nowTodo: e.target.value
      });
    }
    handleSubmit(e) {
      e.preventDefault(e);
      const newTodoList = this.state.todoList.concat(this.state.nowTodo);
      this.setState({
        todoList: newTodoList,
        nowTodo: ""
      });
    }
    renderUserMessage() {
      if (this.state.todoList.length !== 0) {
        return (
          <div>
            {/* 请注意：我们这里在 `map` 遍历时用了箭头函数简洁返回写法，直接用圆括号`()` 包裹需要返回的 `TodoItem` 组件，后面也是如此 */}
            {/* 这里的 key 值不会作为 props 传递给子组件，React 会在编译组件时将 key 值从 props 中排除，即最终我们的第一个 TodoItem 组件的 props : props = { content: "图雀" }而不是props = { content: "图雀", key: 0 } */}
            {/* {this.state.todoList.map((todo, index) => (
            <TodoItem content={todo} key={index} index={index} />
          ))} */}
            <Divider orientation="left">ToDo</Divider>
            <List
              size="large"
              bordered
              dataSource={this.state.todoList}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </div>
        );
      } else {
        return (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
          >
          </Empty>
        );
      }
    }
    //当组件挂载到 DOM 节点中之后会调用的一个方法，我们通常在这里发起一些异步操作，用于获取服务器端的数据
    componentDidMount() {
      this.timer = setTimeout(() => {
        // 更新state:https://juejin.cn/post/6844904020809629710#heading-24
        this.setState({
          todoList: []
        });
      }, 2000);
    }
    // 页面卸载
    componentWillUnmount() {
      clearTimeout(this.timer);
    }
    // render() 方法是挂载时用来渲染内容的方法，每个类组件都需要一个 render 方法
    render() {
      const { Title } = Typography;
      return (
        <div>
          <Title level={2} className="center">ToDoList</Title>
          <form onSubmit={e => this.handleSubmit(e)} className="flex">
            <Input type="text" onChange={e => this.handleChange(e)} />
            <button type="submit">提交</button>
          </form>
          {/* <TodoItem content={this.state.todoList[0]} />
        <TodoItem content={this.state.todoList[1]} /> */}
          {this.renderUserMessage()}
          <ClickButton />
          <Link />
          {/* {this.state.todoList.map((todo, index) => (
            <TodoItem content={todo} key={index} index={index} />
          ))} */}
        </div>
      )
    }
  }
  // https://juejin.cn/post/6844904020809629710
  export default Todo;