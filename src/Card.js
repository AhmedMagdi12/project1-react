import React, { Component, useEffect } from 'react';
class Card extends Component {
    state = {
        shelf:this.props.shelf
    }
    handleChange = (e) => {
            e.preventDefault();
            let val = e.target.value;
            if(this.props.parent === "shelf") {
                this.setState({shelf:val})
                this.props.update(this.props.id,e.target.value)
            }
            else {
                this.props.add(this.props.id,e.target.value)
            }
    } 
    render() {
        return (
            <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.image})`}}></div>
              <div className="book-shelf-changer">
                <select value={this.props.shelf} onChange={this.handleChange} >
                  <option >Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.title}</div>
            <div className="book-authors">{this.props.authors}</div>
          </div>            
        )
    }
}

export default Card;