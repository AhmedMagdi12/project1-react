import React, { Component } from "react";
import Card from "./Card";
class Shelf extends Component {
    // state = {
    //     current:this.props.currently
    // }
    update = (bookid,shelf) => {

        this.props.update(bookid,shelf);
    }

    render() {
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                    {this.props.books.map(book => {
                        if(this.props.currently.includes(book.id)) {
                            return (
                                <li key={book.id}>
                                    <Card 
                                    parent="shelf"
                                    id = {book.id}
                                    update = {this.update}
                                    shelf={book.shelf} 
                                    title={book.title} 
                                    authors = {book.authors !== undefined ? book.authors: null} 
                                    image={book.imageLinks !== undefined ? book.imageLinks.thumbnail: null}/>
                                </li>
                           )
                        } 
                    })}
                
              </ol>
            </div>
          </div>
        )
    }
}
    


export default Shelf;
