class DataSource extends React.Component {
  constructor() {
    super();

    // Fetch taxis
    firebase.database().ref('/taxis/').on('value', (snapshot) => {
      this.setState({
        initialized: true,
        taxiList: snapshot.val()
      });
    });

    firebase.database().ref('/persons/').on('value', (snapshot) => {
      this.setState({
        personList: snapshot.val()
      });
    });

    this.state = {
      taxis: 0,
      taxiList: {},
      personList: {},
      initialized: false
    };
  }

  render() {
    return (
      <div>
        <Sidebar {...this.state} />
        <Map {...this.state} />
      </div>
    );
  }
}

class Map extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (!this.props.initialized) {
      return (
        <div id="map">
          <p className="message">Fetching taxis in use...</p>
        </div>
      );
    }
    else {
      let taxiList = [];
      for (let key in this.props.taxiList) {
        taxiList.push(
          <Taxi key={key} {...this.props.taxiList[key]} />
        );
      }

      let personList = [];
      for (let key in this.props.personList) {
        personList.push(
          <Person key={key} {...this.props.personList[key]} />
        );
      }

      return (
        <div id="map">
          <div className="buffer">
            {personList}
            {taxiList}
          </div>
        </div>
      );
    }
  }
}

class Person extends React.Component {
  constructor() {
    super();
  }

  render() {
    const style = {
      top: this.props.coordinates.x + '%',
      left: this.props.coordinates.y + '%',
    };

    return (
      <div className="person" style={style}>
        <img src={'assets/person.png'} alt="Person" />
      </div>
    );
  }
}

class Taxi extends React.Component {
  constructor() {
    super();
  }

  render() {
    const style = {
      top: this.props.coordinates.x + '%',
      left: this.props.coordinates.y + '%',
    };

    let className = 'taxi';
    if (this.props.direction == 'E') className += ' east';
    else if (this.props.direction == 'N') className += ' north';
    else if (this.props.direction == 'S') className += ' south';

    return (
      <div className={className} style={style}>
        <img src={'assets/taxi.png'} alt="Taxi" />
      </div>
    );
  }
}

class Sidebar extends React.Component {
  constructor() {
    super();
    this.addTaxi = this.addTaxi.bind(this);
    this.removeTaxi = this.removeTaxi.bind(this);
    this.addPerson = this.addPerson.bind(this);
    this.removePerson = this.removePerson.bind(this);
  }

  addTaxi() {
    const directions = ['S', 'N', 'E', 'W'];
    let newKey = firebase.database().ref().child('taxis').push().key;
    let taxi = {};
    const axis = Math.floor(Math.random() * 2);
    taxi['/taxis/' + newKey] = {
      axis: axis,
      coordinates: {
        x: Math.floor(Math.random() * 101),
        y: Math.floor(Math.random() * 101)
      },
      direction: (axis == 1)? directions[Math.floor(Math.random() * 2)] : directions[Math.floor(Math.random() * 2) + 2]
    };
    firebase.database().ref().update(taxi);
  }

  removeTaxi() {
    if (!this.props.taxiList) return;
    let keys = Object.keys(this.props.taxiList);
    let chosenKey = keys[Math.floor(Math.random() * keys.length)];
    firebase.database().ref('taxis/' + chosenKey).remove();
  }

  addPerson() {
    let newKey = firebase.database().ref().child('persons').push().key;
    let person = {};
    person['/persons/' + newKey] = {
      coordinates: {
        x: Math.floor(Math.random() * 101),
        y: Math.floor(Math.random() * 101)
      }
    };
    firebase.database().ref().update(person);
  }

  removePerson() {
    if (!this.props.personList) return;
    let keys = Object.keys(this.props.personList);
    let chosenKey = keys[Math.floor(Math.random() * keys.length)];
    firebase.database().ref('persons/' + chosenKey).remove();
  }

  render() {
    if (!this.props.initialized) {
      return (
        <div id="sidebar">
          <ul>
            <li><h1>Taxiify</h1></li>
          </ul>
        </div>
      );
    }
    else {
      let taxiCount;
      let personCount;
      if (this.props.taxiList) taxiCount = Object.keys(this.props.taxiList).length;
      else taxiCount = 0;
      if (this.props.personList) personCount = Object.keys(this.props.personList).length;
      else personCount = 0;

      return (
        <div id="sidebar">
          <ul>
            <li className="left"><h1>Taxiify</h1></li>
            <li className="left">Taxis: <strong>{taxiCount}</strong></li>
            <li className="left">Persons: <strong>{personCount}</strong></li>
            <li><a onClick={this.addTaxi}>Add Taxi</a></li>
            <li><a onClick={this.removeTaxi}>Remove Taxi</a></li>
            <li><a onClick={this.addPerson}>Add Person</a></li>
            <li><a onClick={this.removePerson}>Remove Person</a></li>
          </ul>
        </div>
      );
    }
  }
}

ReactDOM.render(
  <DataSource />,
  document.getElementById('root')
);
