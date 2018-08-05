import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Messaging Patterns</h1>
        </header>

        <ActionCss animation="letter-fly 3s linear 0s 1 forwards"
                    buttonName="Fire and Forget" marginTopButton="30px"
                    marginTopLetter="40px" letterText="m"/>
        <div className="rectangleSender" style={{marginTop: '30px'}}>Sender</div>
        <div className="rectangleReceiver" style={{marginTop: '30px'}}>Receiver</div>
        <div className="line" style={{marginTop: '50px', width: '400px'}}></div>

        <ActionCss animation="letter-fly 3s alternate 2 forwards"
                    buttonName="Receive and Reply" marginTopButton="120px"
                    marginTopLetter="130px" letterText="r"/>
        <div className="rectangleSender" style={{marginTop: '120px'}}>Sender</div>
        <div className="rectangleReceiver" style={{marginTop: '120px'}}>Receiver</div>
        <div className="line" style={{marginTop: '140px', width: '400px'}}></div>

        <Action animation="message-fly 1s linear 0s 1 forwards"
                buttonName="Publish" marginTopButton="260px"
                marginTopLetter="272px" letterText="m"/>



      </div>
    );
  }
}
class Action extends React.Component{
    constructor(props) {
        super(props);
        this.onClickSubscribe = this.onClickSubscribe.bind(this);
        this.onClickSend = this.onClickSend.bind(this);
        this.state = {
            isLetter1Hidden: true,
            isLetter2Hidden: true,
            subsLinesVisibility: 'hidden',
            animation: '',
            isPublishButtonHidden: true,
        };
    }
    onClickSubscribe(event) {
        this.setState({
          subsLinesVisibility : 'visible',
          animation : 'draw 2s linear forwards',
          isPublishButtonHidden : !this.state.isPublishButtonHidden,
        })
    }
    onClickSend(event) {
        this.setState({
          isLetter1Hidden : !this.state.isLetter1Hidden,
        });
        setTimeout(function()
              {this.setState({
                    isLetter2Hidden: !this.state.isLetter2Hidden,
                    isLetter1Hidden:!this.state.isLetter1Hidden,
              })}.bind(this), 1500);
    }
    render(){
        return(
          <div>
          <button hidden={this.state.isPublishButtonHidden} className="sendButton" onClick={this.onClickSend} style={{marginTop: this.props.marginTopButton}}>Publish</button>
          <div className="eventChannel">Event Channel</div>
          <div className="line" style={{marginTop: '282px', width: '47px'}}></div>
          <div className="rectangleSender" style={{marginTop: '260px'}}>Publisher</div>
          <div className="rectangleReceiver" style={{marginTop: '210px'}}>Subscriber 1</div>
          <div className="rectangleReceiver" style={{marginTop: '260px'}}>Subscriber 2</div>
          <div className="rectangleReceiver" style={{marginTop: '310px'}}>Subscriber 3</div>
          <button className="subButton" onClick={this.onClickSubscribe} style={{marginTop: '270px'}}>Subscribe</button>
          <div hidden={this.state.isLetter1Hidden} className="letter" style={{animation: this.props.animation, marginTop: this.props.marginTopLetter}}>{this.props.letterText}</div>
          <div hidden={this.state.isLetter2Hidden} className="letter" style={{marginLeft: '845px', marginTop: '220px'}}>{this.props.letterText}</div>
          <div hidden={this.state.isLetter2Hidden} className="letter" style={{marginLeft: '845px', marginTop: '270px'}}>{this.props.letterText}</div>
          <div hidden={this.state.isLetter2Hidden} className="letter" style={{marginLeft: '845px', marginTop: '320px'}}>{this.props.letterText}</div>
          <svg className="pubsubsvg">
            <line className="linesub" style={{visibility: this.state.subsLinesVisibility, animation: this.state.animation }} x1="260" y1="0" x2="0" y2="50"/>
            <line className="linesub" style={{visibility: this.state.subsLinesVisibility, animation: this.state.animation }} x1="260" y1="60" x2="0" y2="60"/>
            <line className="linesub" style={{visibility: this.state.subsLinesVisibility, animation: this.state.animation }} x1="260" y1="120" x2="0" y2="70"/>
          </svg>
          </div>
        )
    }
};

class ActionCss extends React.Component{
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            isLetterHidden: true,
        };
    }
    onClick(event) {
        this.setState({
          isLetterHidden : !this.state.isLetterHidden,
        })
    }
    render(){
        return(
          <div>
            <button className="sendButton" onClick={this.onClick} style={{marginTop: this.props.marginTopButton}}>{this.props.buttonName}</button>
            <div hidden={this.state.isLetterHidden} className="letter" style={{animation: this.props.animation, marginTop: this.props.marginTopLetter}}>{this.props.letterText}</div>
          </div>
        )
    }
};

export default App;
