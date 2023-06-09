import {Component } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      monsters: [],
      searchField: '',

    }
  }

  // mounting is the first time a component gets loaded to the dom
  // https://swapi.dev/api/people/
  // https://jsonplaceholder.typicode.com/users
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users) => this.setState(()=>{
        return {monsters:users}
      },
      () =>{ console.log(this.state);
      })
      )
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    
    this.setState(()=>{
      return {searchField}
    })
    }


  render() {

    const {monsters, searchField} = this.state;
    const {onSearchChange} = this;

    const filteredMonsters = monsters.filter((monster)=>{ return monster.name.toLowerCase().includes(searchField) })

    return (
      <div className="App">
        <h1 className="app-title">Monsters Directory</h1>
        <SearchBox 
          className='search-box'
          onChangeHandler={onSearchChange} 
          placeholder='Search Monsters'
        />

        <CardList monsters={filteredMonsters}/>
      </div>
    );
}

  
}

export default App;
