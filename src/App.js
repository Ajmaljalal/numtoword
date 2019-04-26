import React from 'react';
import './App.css';
import converter from './converter'


class App extends React.Component {

  state = {
    word: ''
  }

  handleChange = (e) => {
    if(typeof Number(e.target.value) !== 'number') return;
    this.setState({
      word: converter(e.target.value && Number(e.target.value))
    })    
  }
  render (){
    return (
      <div className="App">
        <div 
          style={{
            border: '1px dashed green',
            width: '50%',
            margin: '20px auto',
            height: '70%',
            padding: '20px',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: '5px',
            background: 'purple'

          }}
        >
          <h2>Type a valid number between 0 and 1,000,000,000,000,000 (15 zeros)</h2>
          <input
            style ={{
              padding: '15px 10px',
              minWidth: '80%',
              fontSize: '18px',
              borderRadius: '5px',
              border: '1px solid gray',
              marginTop: '50px',
              textAlign: 'center'
            }}
           type='text'
           value={this.state.value}
           name='word'
           onChange={this.handleChange}
           placeHolder='Type your number here'
           />
          <h2
            style={{
              color: 'white'
            }}
          >{this.state.word}</h2>
        </div>
  
      </div>
    );
  }
}

export default App;
