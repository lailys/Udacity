import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import Books from './Books'
import { Link } from 'react-router-dom';
import {DebounceInput} from 'react-debounce-input'





class SearchBooks extends Component{

  state={
    query:'',
    matchingBooks:[],
    mybooks:[]
  }


  queryChange(word){
    this.setState({query:word})
    this.bookChange(word)
  }


  bookChange=(words)=>{
    if(words){
        BooksAPI.search(words).then((matchingBooks) => {
          if (matchingBooks.error) {
              this.setState({ matchingBooks: [] })
          } else {
              let results=matchingBooks
              results.map((result)=>result.shelf='none')
              this.setState({matchingBooks:results})
          }
     })
    }else {
        this.setState({matchingBooks:[]})
    }
  }



render(){
    return(

      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/' >Close</Link>
            <div className="search-books-input-wrapper">
                <DebounceInput
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                debounceTimeout={1000}
                onChange={(e) => this.queryChange(e.target.value)}
                />
            </div>
       </div>
     <div className="search-books-results">
     <ol className="books-grid">

         {this.state.matchingBooks.map((matchedBook)=>{
           this.props.books.map(book=>(
             book.id===matchedBook.id ?  matchedBook.shelf=book.shelf : ''
             ))
            return(

                <li key={matchedBook.id}>
                <Books key={matchedBook.id} book={matchedBook} shelfChange={this.props.shelfChange} />
                </li>
                  )
            })
            }

      </ol>
    </div>
  </div>
    )
    }
}
export default SearchBooks
