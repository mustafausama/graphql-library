import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

class BookDetails extends Component {
  displayBooks() {
    var data = this.props.data;
    if (data.loading) return <div>Loading books...</div>;
    return data.books.map((book) => <li key={book.id}>{book.name}</li>);
  }

  displayBookDetails() {
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>
            {book.author.name} - {book.author.age}
          </p>
          <p>All books by this author</p>
          <ul className="other-books">
            {book.author.books.map((book) => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  }

  render() {
    return <div id="book-details">{this.displayBookDetails()}</div>;
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
