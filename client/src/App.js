import React, { Component } from 'react';
import {io} from "socket.io-client";
import "./App.css";
import Messages from './Messages';
let client = io("ws://localhost:5000")
class App extends Component {
    state = {
        userName: "",
        isLoggedIn: false,
        messages: [],
        textMsg: ""
    };

    joinRoom() {
        client.emit("joined",{userName:this.state.userName})
        client.on("message",(message)=>{
            this.setState({messages:message});
        });
        client.on("send",(message)=>{
            this.setState({messages:[...this.state.messages,message]});
        });

    }
    sendMsg() {
        client.emit("send",{ name:this.state.userName,message:this.state.textMsg });
        this.setState({textMsg:""});
    }
    render() {
        return (
            <div style={{"marginBottom":"3em"}}>
                <h1 className='heading'>Chat Room <span style={{"color":"lightblue"}}>{this.state.isLoggedIn === true?this.state.userName:""}</span></h1>
                {
                    this.state.isLoggedIn === false ?
                        (<div className='Login'>
                            <input type="text" onChange={(e) => this.setState({ userName: e.target.value })} value={this.state.userName}></input>
                            <button onClick={() => {this.setState({ isLoggedIn: true });this.joinRoom();}}>Login</button>
                        </div>) :
                        (<div className='Container'>
                            <div className='Messages'>
                                {this.state.messages.map((m,index) => {
                                    return <Messages key={index} name={m.name} message={m.message} align={m.name===this.state.userName ? "right":"left"}></Messages>
                                })}
                            </div>
                            <div className='Send'>
                                <input type="text" onChange={(e) => this.setState({ textMsg: e.target.value })} value={this.state.textMsg}></input>
                                <button onClick={() => this.sendMsg()}>Send</button>
                            </div>
                        </div>)

                }
            </div>
        );
    }
}

export default App;