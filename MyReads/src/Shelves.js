import React from 'react'
import Books from './Books'



function Shelves(props) {


  return(

<div>

    {props.titles.map((title)=>(
      <div className="bookshelf" key={title.key}>
          <h2 className="bookshelf-title">{title.id}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">

            {props.book.filter(book=>book.shelf===title.key).map(book=>(
              <li key={book.id}>
                <Books book={book} shelfChange={props.shelfChange}/>
              </li>
            ))}

            </ol>
          </div>
        </div>

      ))}

 </div>

  )



}






export default Shelves
