import React from 'react'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom';





class BooksApp extends React.Component {

  state={
    books:[]
  }


  componentDidMount(){
    BooksAPI.getAll().then((Books)=>{this.setState({books:Books})})
  }


  shelfChange=async (book,shelf)=>{
  await BooksAPI.update(book,shelf)
  BooksAPI.getAll().then((Books)=>{this.setState({books:Books})})
  }


  render() {
    return (

      <div className="app">
         <Route exact path='/' render={()=>(<ListBooks shelfChange={this.shelfChange} books={this.state.books}/>)}/>
          <Route path='/SearchBooks' render={()=>(<SearchBooks shelfChange={this.shelfChange} books={this.state.books}/>)}/>
      </div>
        )
     }
}

export default BooksApp
