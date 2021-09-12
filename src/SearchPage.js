import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Card from './Card'
class SearchPage extends Component {
    _isMounted = false;

    state = { 
        query:'',
        results: []
    }
    handleSearch = (query) => {
        BooksAPI.search(query)
            .then((results) => {
                // console.log(results);
                if(!results.error)
                    this.setState({results:results});
                else
                    this.setState({results:[]});
            })
    }
    updateQuery = (query) => {
        if(query){
        this.setState({query:query.trim().toLowerCase()});
        this.handleSearch(query)
        } else {
            this.setState({results:[]});
        }
    }
    add = (book_id,shelf) => {
        this.props.add(book_id,shelf);
    }

    render() {
        return (
            (
                <div className="search-books">
                  <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                      {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
      
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                      */}
                      <input 
                      type="text" 
                      onChange={(event) =>this.updateQuery(event.target.value)} 
                      placeholder="Search by title or author"
                      
                      />

                    </div>
                  </div>
                  <div className="search-books-results">
                    <ol className="books-grid">
                    {this.state.results.map(book => {
                        // console.log(book)
                            return (
                                <li key={book.id}>
                                    <Card 
                                    parent="search"
                                    add={this.add}
                                    id = {book.id}
                                    update = {this.update}
                                    shelf={book.shelf} 
                                    title={book.title} 
                                    authors = {book.authors} 
                                    image={book.imageLinks.smallThumbnail}/>
                                </li>
                           )
                        } 
                    )}


                    </ol>
                  </div>
                </div>
              )
        )
    }
}

export default SearchPage;