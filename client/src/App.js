import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApplyTable from './Components/ApplyTable/ApplyTable';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className="App">
      <Container>
        <h1>Job Apply Status</h1>
        <ApplyTable />
      </Container>
    </div>
  );
}

export default App;
