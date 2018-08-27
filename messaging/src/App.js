import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Messaging Patterns</h1>
        </header>
        <p></p>
        <h1 className="Title">Fire and Forget</h1>
        <div className="Description">The sending application sends the message to the message channel. Once that send is complete,
        the sender can go on to other work while the messaging system transmits the message in the background.
        There is a chance of losing the message in the channel. Example: <strong>UDP</strong>. </div>

        <FireAndForget animation="letter-fly 4s linear 0s 1 forwards"
                    buttonName="Fire and Forget" marginTopButton="30px"
                    marginTopLetter="42px" letterText="m" marginTopLine='52px'/>

        <h1 className="Title">Store and Forward</h1>
        <div className="Description">Message is stored on sender side before
        being transfered via outgoing channel so that availability of the channel can be checked before sending a message to reciever.
        If the destination address isnt available, then the message is stored and will be sent later.
        This improves the probability of the message to be delivered. In the other case, if the destination is available at that time, then the message
        is immediately sent. </div>

        <StoreAndForward buttonName="Store and Forward" marginTopButton="30px"
                    marginTopLetter="42px" letterText="m" marginTopLine='52px'/>

        <h1 className="Title">Receive and Reply</h1>
        <div className="Description">Blablabla </div>

        <ReceiveAndReply
                    buttonName="Receive and Reply" marginTopButton="30px"
                    marginTopLetter="42px" marginTopLine='52px'/>

        <h1 className="Title">Publisher Subscriber</h1>
        <div className="Description">Blablabla </div>
        <PublisherSubscriber/>

      </div>
    );
  }
}

class FireAndForget extends React.Component{
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            isLetterHidden: true,
            senderAction: 'Sender',
        };
    }
    onClick(event) {
        this.setState({
          isLetterHidden : !this.state.isLetterHidden,
          senderAction: 'Send',
          senderColour: '#e87474'
        });
        setTimeout(function()
              {this.setState({
                    senderAction: 'Do Work',
                    senderColour: '#84aced'
              })}.bind(this), 500);
        setTimeout(function()
              {this.setState({
                    senderAction: 'Sender',
                    senderColour: '#D7D8D8',
                    isLetterHidden : !this.state.isLetterHidden,
              })}.bind(this), 4000);
    }
    render(){
        return(
          <div style={{height: '100px'}}>
            <button className="sendButton" onClick={this.onClick} style={{marginTop: this.props.marginTopButton}}>{this.props.buttonName}</button>
            <div hidden={this.state.isLetterHidden} className="letter" style={{animation: this.props.animation, marginTop: this.props.marginTopLetter}}>{this.props.letterText}</div>
            <div className="eventChannel" style={{marginTop: '40px'}}>Message Channel</div>
            <div className="rectangleSender" style={{marginTop: this.props.marginTopButton, backgroundColor: this.state.senderColour}}>{this.state.senderAction}</div>
            <div className="rectangleReceiver" style={{marginTop: this.props.marginTopButton}}>Receiver</div>
            <div className="line" style={{marginTop: this.props.marginTopLine, width: '400px'}}></div>
          </div>
        )
    }
};

class StoreAndForward extends React.Component{
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            isLetterHidden: true,
            senderAction: 'Sender',
            subsLinesVisibility : 'hidden',
            lineAnimation : '',
            animation : 'letter-fly-to-storage 1s linear 0s 1 forwards'
        };
    }
    onClick(event) {
        this.setState({
          isLetterHidden : false,
          senderAction: 'Send',
          senderColour: '#e87474'
        });
        setTimeout(function()
              {this.setState({
                   senderAction: 'Send',
                   senderColour: '#D7D8D8'
              })}.bind(this), 500);
        setTimeout(function()
              {this.setState({
                    subsLinesVisibility : 'visible',
                    lineAnimation : 'draw 2s linear forwards',
              })}.bind(this), 1000);
        setTimeout(function()
              {this.setState({
                    subsLinesVisibility : 'hidden',
                    lineAnimation : '',
                    animation: 'letter-fly-forward 2s linear 0s 1 forwards',
              })}.bind(this), 3000);
        setTimeout(function()
              {this.setState({
                animation: 'letter-fly-to-storage 1s linear 0s 1 forwards',
                    isLetterHidden : true,
              })}.bind(this), 5000);
    }
    render(){
        return(
          <div style={{height: '100px'}}>
            <button className="sendButton" onClick={this.onClick} style={{marginTop: this.props.marginTopButton}}>{this.props.buttonName}</button>
            <div hidden={this.state.isLetterHidden} className="letter" style={{animation: this.state.animation, marginTop: this.props.marginTopLetter}}>{this.props.letterText}</div>
            <div className="eventChannel" style={{marginTop: '40px', marginLeft: '700px'}}>Message Channel</div>
            <div className="rectangleSender" style={{marginTop: this.props.marginTopButton, backgroundColor: this.state.senderColour}}>{this.state.senderAction}</div>
            <div className="rectangleReceiver" style={{marginTop: this.props.marginTopButton}}>Receiver</div>
            <div className="rectangleStorage" style={{marginTop: '40px'}}>Storage</div>
            <div className="line" style={{marginTop: this.props.marginTopLine, width: '400px'}}></div>

            <svg style ={{marginLeft: '630px'}}>
              <line className="linesub" style={{visibility: this.state.subsLinesVisibility, animation: this.state.lineAnimation, stroke: 'red' }} x1="0" y1="52" x2="270" y2="52"/>
            </svg>
          </div>
        )
    }
};

class PublisherSubscriber extends React.Component{
    constructor(props) {
        super(props);
        this.onClickSubscribe = this.onClickSubscribe.bind(this);
        this.onClickPublish = this.onClickPublish.bind(this);
        this.state = {
            isMessage1Hidden : true,
            isMessage2Hidden : true,
            subsLinesVisibility : 'hidden',
            lineAnimation : '',
            isPublishButtonHidden : true,
            isSubscribeButtonHidden : false,
        };
    }
    onClickSubscribe(event) {
        this.setState({
          subsLinesVisibility : 'visible',
          lineAnimation : 'draw 2s linear forwards',
          isPublishButtonHidden : false,
          isSubscribeButtonHidden : true,
        })
    }
    onClickPublish(event) {
        this.setState({
          isMessage1Hidden : false,
          isMessage2Hidden : true,
        });
        setTimeout(function()
              {this.setState({
                    isMessage2Hidden: false,
                    isMessage1Hidden: true,
              })}.bind(this), 1500);
    }
    render(){
        return(
          <div style={{height: '100px'}}>
          <button hidden={this.state.isPublishButtonHidden} className="sendButton" onClick={this.onClickPublish} style={{marginTop: '50px'}}>Publish</button>
          <div className="eventChannel" style={{ marginTop: '60px'}}>Event Channel</div>
          <div className="line" style={{marginTop: '72px', width: '47px'}}></div>
          <div className="rectangleSender" style={{marginTop: '50px'}}>Publisher</div>
          <div className="rectangleReceiver" style={{marginTop: '0px'}}>Subscriber 1</div>
          <div className="rectangleReceiver" style={{marginTop: '50px'}}>Subscriber 2</div>
          <div className="rectangleReceiver" style={{marginTop: '100px'}}>Subscriber 3</div>
          <button hidden={this.state.isSubscribeButtonHidden} className="subButton" onClick={this.onClickSubscribe} style={{marginTop: '60px'}}>Subscribe</button>
          <div hidden={this.state.isMessage1Hidden} className="letter" style={{animation: "message-fly 1s linear 0s 1 forwards", marginTop: '62px'}}>m</div>
          <div hidden={this.state.isMessage2Hidden} className="letter" style={{marginLeft: '845px', marginTop: '10px'}}>m</div>
          <div hidden={this.state.isMessage2Hidden} className="letter" style={{marginLeft: '845px', marginTop: '60px'}}>m</div>
          <div hidden={this.state.isMessage2Hidden} className="letter" style={{marginLeft: '845px', marginTop: '110px'}}>m</div>
          <svg className="pubsubsvg">
            <line className="linesub" style={{visibility: this.state.subsLinesVisibility, animation: this.state.lineAnimation }} x1="260" y1="0" x2="0" y2="50"/>
            <line className="linesub" style={{visibility: this.state.subsLinesVisibility, animation: this.state.lineAnimation }} x1="260" y1="60" x2="0" y2="60"/>
            <line className="linesub" style={{visibility: this.state.subsLinesVisibility, animation: this.state.lineAnimation }} x1="260" y1="120" x2="0" y2="70"/>
          </svg>
          </div>
        )
    }
};

class ReceiveAndReply extends React.Component{
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            isRequestLetterHidden: true,
            isResponseLetterHidden: true,
        };
    }
    onClick(event) {
        this.setState({
          isRequestLetterHidden : false,
        });
        setTimeout(function()
              {this.setState({
                    isRequestLetterHidden: true,
                    isResponseLetterHidden: false,
              })}.bind(this), 2500);
    }
    render(){
        return(
          <div style={{height: '100px'}}>
            <button className="sendButton" onClick={this.onClick} style={{marginTop: this.props.marginTopButton}}>{this.props.buttonName}</button>
            <div hidden={this.state.isRequestLetterHidden} className="letter" style={{animation: "letter-fly 2s linear 0s 1 forwards", marginTop: this.props.marginTopLetter}}>req</div>
            <div hidden={this.state.isResponseLetterHidden} className="letter" style={{animation: "letter-fly-back 2s linear 0s 1 forwards", marginTop: this.props.marginTopLetter}}>resp</div>
            <div className="rectangleSender" style={{marginTop: this.props.marginTopButton}}>Sender</div>
            <div className="rectangleReceiver" style={{marginTop: this.props.marginTopButton}}>Receiver</div>
            <div className="line" style={{marginTop: this.props.marginTopLine, width: '400px'}}></div>
          </div>
        )
    }
};

export default App;
