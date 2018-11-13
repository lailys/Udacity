import React, {Component} from 'react'
import Shelves from './Shelves'
import { Link } from 'react-router-dom';




const titles=[
  {
    "id":"Currently Reading",
    "key":"currentlyReading"
  },
  {
    "id":"Want To Read",
    "key":"wantToRead"
  },
  {
    "id":"Read",
    "key":"read"
  }
]



class ListBooks extends Component{


  render(){

  return(

    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">

           <Shelves titles={titles} book={this.props.books} shelfChange={this.props.shelfChange} />

      </div>
      <div className="open-search">
        <Link to='/SearchBooks'>Add a book</Link>
      </div>
    </div>

  )
 }
}

export default ListBooks
