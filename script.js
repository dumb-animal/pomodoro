class Timer {
  constructor() {
    this.sessionTime = 20;
    this.breakTime = 5;

    this.isStarted = false;
    this.isSession = true;
    this.isChanged = true;

    this.breakElement = document.getElementById("break-time");
    this.sessionElement = document.getElementById("session-time");
    this.timerElement = document.getElementById("timer");
    this.labelElement = document.getElementById("label");
    this.buttonElement = document.getElementById("btn");
  }

  changeSessionTime(time) {
    if (!this.isStarted) {
      this.sessionTime += time;
      if (this.sessionTime <= 0) this.sessionTime = 1;
      this.changed();
    }
  }

  changeBreakTime(time) {
    if (!this.isStarted) {
      this.breakTime += time;
      if (this.breakTime <= 0) this.breakTime = 1;
      this.changed();
    }
  }

  start() {
    if (!this.isStarted) {
      this.interval = setInterval(this.counting.bind(this), 1000);
      if (this.isChanged) {
        this.leftTime = this.sessionTime * 60;
        this.isChanged = false;
      }
      this.timerElement.innerText = this.leftTime;
    } else {
      clearInterval(this.interval);
    }
    this.isStarted = !this.isStarted;
    this.render();
  }

  counting() {
    this.leftTime -= 1;
    if (this.leftTime <= 0) {
      this.leftTime = this.isSession
        ? this.breakTime * 60
        : this.sessionTime * 60;
      this.isSession = !this.isSession;
    }
    this.render();
  }

  render() {
    if (this.isSession) this.labelElement.innerText = "Time Left:";
    else this.labelElement.innerText = "Break!";

    if (this.isStarted) this.buttonElement.innerText = "STOP";
    else this.buttonElement.innerText = "START";

    this.timerElement.innerText = this.leftTime;
  }

  changed() {
    this.isChanged = true;
    this.isSession = true;

    this.sessionElement.innerText = this.sessionTime;
    this.breakElement.innerText = this.breakTime;
    this.timerElement.innerText = this.sessionTime;
    this.labelElement.innerText = "Time Left:";
  }
}

const timer = new Timer();
