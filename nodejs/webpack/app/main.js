// react
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';

render(<Greeter />, document.getElementById('root'));

// old
// var greeter = require('./Greeter.js');
// document.getElementById('root').appendChild(greeter());