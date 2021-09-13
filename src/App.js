import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import Shelf from "./Shelf"
import {Route, Link} from 'react-router-dom'
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    
    books: [],
    currentlyReading:[],
    read:[],
    wantToRead:[]
  }
  componentDidMount() {
      BooksAPI.getAll().then((books) => {
        this.setState({books: books})
        for(let book of books) {
            if(book.shelf === 'currentlyReading')
                this.setState((current) => ({
                    currentlyReading: current.currentlyReading.concat([book.id])
            })) 
            else if(book.shelf === 'wantToRead'){
                this.setState((current) => ({
                    wantToRead: current.wantToRead.concat([book.id])
            }))}
            else { 

                this.setState((current) => ({
                    read: current.read.concat([book.id])
                }))            
            }}
      })
  }
  update = (bookid,shelf) => {
      var book_ = {}
      const books = this.state.books
      for(let book of books) {
          if (book.id === bookid) {
              book_ = book;
          }
      }
       book_.shelf = shelf;
      BooksAPI.update(book_,shelf)
      .then((books) => {
        this.setState((prev) => ({
            books: prev.books.filter(b => b.id !== book_.id).concat(book_),
            currentlyReading: books.currentlyReading,
            wantToRead:books.wantToRead,
            read:books.read
        }))
        })
    }
    add = (book_id,shelf) => {
        BooksAPI.get(book_id).then((book) => {

            if(shelf === "wantToRead") {
            this.setState((current) => ({
                wantToRead: current.wantToRead.concat([book.id]),
                books:current.books.concat(book)
            }))
            } else if(shelf === "currentlyReading") {
                this.setState((current) => ({
                    currentlyReading: current.currentlyReading.concat([book.id]),
                    books:current.books.concat(book)
                })) 
            } else if(shelf === "read") {
                this.setState((current) => ({
                    read: current.read.concat([book.id]),
                    books:current.books.concat(book)
                })) 
            }
            this.update(book_id,shelf)
        })
    }
    get = (id) => {
        BooksAPI.get(id).then((book) => {
            return book.shelf
        })
    }


  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div> 
                  <div className="list-books-content">
                    <div>
                      <Shelf update={this.update} books={this.state.books} currently={this.state.currentlyReading} title="Currently Reading" shelf ="currentlyReading"/>
                      <Shelf update={this.update} books={this.state.books} currently={this.state.wantToRead} title="Want to Read" shelf ="wantToRead"/>
                      <Shelf update={this.update} books={this.state.books} currently={this.state.read} title="Read" shelf = "read"/>
                    </div>
                  </div>
                  <Link to='/search'>
                  <div className="open-search">
                     <button type="button">Add a book</button>
                  </div>
                  </Link>
            </div>
        )} />
        <Route path='/search' render={() => (
            <SearchPage add={this.add} books={this.state.books} get = {this.get}/>
        )} 
        />

      </div>
    )
  }
}

export default BooksApp
