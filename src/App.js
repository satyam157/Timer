import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ProgressBar from "react-customizable-progressbar";
// import { ExampleProps } from './Examples'

class TimerInput extends React.Component {
  render() {
    return (
      <div className="lol">
        <h3>::: Input your desired time :::</h3>
        <input
          type="number"
          placeholder={"60 minutes"}
          value={this.props.text}
          onChange={this.props.handleChange}
          required
        />
      </div>
    );
  }
}

class Timer extends React.Component {
  render() {
    return (
      <div>
        <h1 style={{ fontSize: 100, marginLeft: 100 }}>
          {this.props.value}:{this.props.seconds}
        </h1>
      </div>
    );
  }
}

class StartButton extends React.Component {
  render() {
    return (
      <div>
        <h1>
          <button
            className="btn btn-lg btn-success"
            disabled={!this.props.value}
            onClick={this.props.startCountDown}
          >
            Begin Session
          </button>
        </h1>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: "00",
      value: "00",
      isClicked: false,
    };
    // this.secondsRemaining;
    // this.intervalHandle;
    this.handleChange = this.handleChange.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.tick = this.tick.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  tick() {
    var min = Math.floor(this.secondsRemaining / 60);
    var sec = this.secondsRemaining - min * 60;

    this.setState({
      value: min,
      seconds: sec,
    });

    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds,
      });
    }

    if (min < 10) {
      this.setState({
        value: "0" + min,
      });
    }

    if ((min === 0) & (sec === 0)) {
      clearInterval(this.intervalHandle);
    }

    this.secondsRemaining--;
  }

  startCountDown() {
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.value;
    this.secondsRemaining = time * 60;
    this.setState({
      isClicked: true,
    });
  }

  render() {
    const clicked = this.state.isClicked;
    if (clicked) {
      return (
        <div
          className="full-bg-size-component"
          style={{
            backgroundImage:
              'url("https://www.jesusislife.in/wp-content/uploads/2019/05/Savin-NY-Website-Background-Web.jpg")',
          }}
        >
          <div className="App">
            <div className="row">
              <div className="col-md-8"></div>
              <div className="col-md-8">
                <div className="timer-wrapper">
                  <CountdownCircleTimer
                    isPlaying
                    size={500}
                    duration={3600}
                    initialRemainingTime={this.state.value * 60}
                    rotation={"counterclockwise"}
                    colors={[["#006400", 0.33], ["#0000CD", 0.33], ["#00008B"]]}
                    onComplete={() => [true, 1000]}
                  >
                    {({ remainingTime }) => {
                      const minutes = Math.floor(remainingTime / 60);
                      const seconds = remainingTime % 60;
                      if (minutes < 10) {
                        if (seconds < 10) return `0${minutes}:0${seconds}`;
                      }
                      if (seconds < 10) return `${minutes}:0${seconds}`;
                      if (minutes < 10) return `0${minutes}:${seconds}`;
                      return `${minutes}:${seconds}`;
                    }}
                  </CountdownCircleTimer>
                </div>
                <StartButton
                  startCountDown={this.startCountDown}
                  value={this.state.value}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="full-bg-size-component"
          style={{
            backgroundImage:
              'url("https://www.jesusislife.in/wp-content/uploads/2019/05/Savin-NY-Website-Background-Web.jpg")',
          }}
        >
          <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-8">
              <TimerInput
                value={this.state.value}
                handleChange={this.handleChange}
              />
              {/* <Timer value={this.state.value} seconds={this.state.seconds} /> */}
              <div className="timer-wrapper">
                <CountdownCircleTimer
                  // isPlaying={'false'}
                  size={500}
                  // ariaLabel={'Turin ai'}
                  duration={3600}
                  // initialRemainingTime={}
                  rotation={"counterclockwise"}
                  colors={[["#FF0000", 0.33], ["#FF0000", 0.33], ["#A30000"]]}
                  onComplete={() => [true, 1000]}
                  fontSize={100}
                >
                  {() => {
                    const minutes = 60;
                    const seconds = 0;
                    return `${minutes}:0${seconds}`;
                  }}
                </CountdownCircleTimer>
              </div>
              <StartButton
                startCountDown={this.startCountDown}
                value={this.state.value}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
