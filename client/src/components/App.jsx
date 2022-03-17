import React, { Component } from 'react';
import Login from './Login.jsx';
import axios from 'axios';
class App extends Component {

  constructor(props) {
    super(props);

    // Here we initialize our components state
    this.state = {
      //Data to hold all rooms
      allRooms: [],
      //  allBooked: [],

      // Data to hold new booking
      roomNumber: 0,
      name: '',
      phoneNumber: 0,
      email: '',
      booked: false,
      showBookingForm: false
    };
    // this.onClick = this.onClick.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlephoneNumber = this.handlephoneNumber.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleBook = this.handleBook.bind(this);
    this.handleBookingClick = this.handleBookingClick.bind(this);
    this.handleVacate = this.handleVacate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getAllRooms = this.getAllRooms.bind(this);



  }
  componentDidMount() {
    this.getAllRooms();
  }

  getAllRooms() {
    axios.get("/api/allrooms")
      .then((response) => {
        console.log('Res rooms = ', response.data);
        this.setState({
          allRooms: response.data
        })
      })
      .then((error) => {
        console.log('error', error);
      })
  }

  handleName(event) {
    console.log(event.target.value);
    this.setState({
      name: event.target.value
    })
  }
  handlephoneNumber(event) {
    console.log(event.target.value);
    this.setState({
      phoneNumber: event.target.value
    })
  }
  handleEmail(event) {
    console.log(event.target.value);
    this.setState({
      email: event.target.value
    })
  }
  handleBook() {
    const { name, phoneNumber, email } = this.state;
    axios.put("/api/book", {
      name: name,
      phoneNum: phoneNumber,
      email: email,
      roomNumber: this.state.roomNumber
    })
      .then((response) => {
        // alert(JSON.stringify(response.data.affectedRows));
        if (response.data.affectedRows === 0) {
          alert("Cannot book");
        }
        // console.log("RESPONSE ==== ", response.data.affectedRows);
      })
      .then((error) => {
        console.log('error', error);
      })
    this.getAllRooms();
  }
  handleVacate(roomNumber) {
    this.setState({
      showBookingForm: false,
    });

    const { name, phoneNumber, email } = this.state;
    axios.put("/api/vacate", {
      roomNumber: roomNumber
    })
      .then((response) => {
        // alert(JSON.stringify(response.data.affectedRows));
        if (response.data.affectedRows === 0) {
          alert("Cannot Vacate");
        }
        // console.log("RESPONSE ==== ", response.data.affectedRows);
      })
      .then((error) => {
        //  alert(error);
        console.log('error', error);
      })
    this.getAllRooms();
  }
  handleBookingClick(roomNum) {
    this.setState({
      showBookingForm: true,
      roomNumber: roomNum
    });
  }
  handleClick(roomNumber, booked) {
    if (booked === 1) {
      this.handleVacate(roomNumber);
    } else {
      this.handleBookingClick(roomNumber);
    }
  }
  renderForm() {
    return (
      <div>
        <form id="add-app" >
          { }
          &nbsp;&nbsp;
          <label> Name : </label>
          <input type="text" name="name" placeholder="name" onChange={(event) => { this.handleName(event) }} />&nbsp;&nbsp;
          <label> phoneNumber </label>
          <input type="text" name="phoneNumber" placeholder="phoneNumber" onChange={(event) => { this.handlephoneNumber(event) }} />&nbsp;&nbsp;
          <label> Email: </label>
          <input type="text" name="Email" placeholder="Email" onChange={(event) => { this.handleEmail(event) }} /> &nbsp;&nbsp;
          <button onClick={this.handleBook}>Book</button>
        </form>
      </div>
    );
  }

  render() {
    // We get the state for showing the form from our components state
    const { showBookingForm, allRooms } = this.state;

    return (
      <div className='manage-app'>
        <div className="txn-table">
          <div className="txn-header txn-row">
            <div className="txn-data">Room Number</div>
            <div className="txn-data">Occupation</div>
            <div className="txn-data">Customer Name</div>
            <div className="txn-data">Phone number</div>
            <div className="txn-data">Email</div>
          </div>
          {allRooms.map(room => {
            return (
              <div className="txn-row">
                <div className="txn-data">
                  {room.roomNumber}
                </div>
                <div className="txn-data">
                  {room.booked == 1 ? (
                    <button className="button" onClick={() => this.handleVacate(room.roomNumber)}>Vacate</button>
                  ) : (
                    <button className="button" onClick={() => this.handleBookingClick(room.roomNumber)}>Book</button>
                  )}
                </div>
                <div className="txn-data">{room.name}</div>
                <div className="txn-data">{room.phoneNum != 0 ? room.phoneNum : ""}</div>
                <div className="txn-data">{room.email}</div>
              </div>);
          })}
        </div>
        <div>
          {showBookingForm && this.renderForm()}
        </div>
      </div>
    );
  }
}

export default App;
