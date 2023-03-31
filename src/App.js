import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frame from './pages/Frame/Frame';
import Home from './pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/frame" element={<Frame />} />
          <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// import React, { Component } from 'react';
// import './App.css';
// import Input from './components/Input/Input';
// import Messages from './components/Messages/Messages';
// import {randomName,randomColor} from "./utils/helpers"


// class App extends Component {
//   state = {
//     messages: [],
//     member: {
//       username: randomName(),
//       color: randomColor(),
//     }
//   }

//   constructor() {
//     super();
//     this.drone = new window.Scaledrone("17LZcg2KJeuyuc6t", {
//       data: this.state.member
//     });
//     this.drone.on('open', error => {
//       if (error) {
//         return console.error(error);
//       }
//       const member = {...this.state.member};
//       member.id = this.drone.clientId;
//       this.setState({member});
//     });
//     const room = this.drone.subscribe("observable-room");
//     room.on('data', (data, member) => {
//       const messages = this.state.messages;
//       messages.push({member, text: data});
//       this.setState({messages});
//       console.log(messages);
//     });
//   }

//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <h1>My Chat App</h1>
//         </div>
//         <Messages
//           messages={this.state.messages}
//           currentMember={this.state.member}
//         />
//         <Input
//           onSendMessage={this.onSendMessage}
//         />
//       </div>
//     );
//   }

//   onSendMessage = (message) => {
//     this.drone.publish({
//       room: "observable-room",
//       message
//     });
//   }

// }

// export default App;
