import React, { useState, useEffect } from "react";
import axios from 'axios'

//Components
import Task from './components/Task'
import NewTask from "./components/NewTask";

//Bootstrap-React
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Table } from "react-bootstrap";



const App = () => {
  const [tasks, setTasks] = useState([])

  const getTasks = () => {
    axios.get('http://localhost:4000/tasks').then(response => {
      setTasks(response.data)
    })
  }

  const handleCreate = (data) => {
    axios.post(`http://localhost:4000/tasks`, data).then(response => {
      setTasks([...tasks, response.data])
    })
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/tasks/${id}`).then(response => {
      setTasks(tasks.filter(task => {
        return task._id !== response.data._id
      }))

    })
  }




  useEffect(() => {
    getTasks()
  }, [])

  return (
    <Container fluid>
      <Row className="my-row">
        <Col xs={2} className="vh-100">
          <Col className="category my-col">a</Col>
          <Col className="category my-col">b</Col>
          <Col className="category my-col">c</Col>
        </Col>
        <Col>
          <Row className="h-25 my-row">
            <Col xs={12} className="my-col">
              <Row className="h-100 my-row">
                <Col className="d-flex align-items-center my-col">
                  <Col className="h-50 my-col">A</Col>
                </Col>
                <Col className="my-col">b</Col>
                <Col>
                  <Col className="category h-25 my-col">a</Col>
                  <Col className="category my-col">b</Col>
                  <Col className="category h-25 my-col">c</Col>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="h-75 my-row">
            <Col xs={6} className="my-col">
              <NewTask handleCreate={handleCreate} />
              {tasks.map((task, idx) => {
                return (
                  <>
                    <Task task={task} key={idx} handleDelete={handleDelete} />
                  </>
                );
              })}
            </Col>
            <Col xs={6}>Under Right</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}



export default App;


