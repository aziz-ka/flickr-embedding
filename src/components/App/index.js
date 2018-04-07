import React, { Component } from 'react';
import io from 'socket.io-client';

import './index.css';


const socket = io(process.env.REACT_APP_API_URL);

class App extends Component {
  state = {
    photo: null
  }

  get dateFormatted() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return new Date(this.state.photo.datetaken).toLocaleDateString('en-US', options);
  }

  componentDidMount = () => socket.on('display_photo_details', photo => this.setState({ photo }))

  renderPhotoDetails = () => {
    if (!this.state.photo) return null;

    const { datetaken, ownername, views } = this.state.photo;

    return (
      <ul className='card px-2 py-3'>
        <li><strong>Owner:</strong> { ownername }</li>
        <li><strong>Date: </strong>{ this.dateFormatted }</li>
        <li><strong>Number of views:</strong> { views }</li>
      </ul>
    );
  }

  render = () => (
    <main className='container-fluid py-3'>
      <iframe className='iframe col' src={process.env.REACT_APP_IFRAME_URL} />
      <section className='row'>
        <div className='col mt-3'>{ this.renderPhotoDetails() }</div>
      </section>
    </main>
  )
}


export default App;
