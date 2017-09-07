import React from 'react';
import ReactDOM from 'react-dom';
import 'milligram'
import './index.css';
import App from './App';
import { Container, Row, Col } from 'reactstrap';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
