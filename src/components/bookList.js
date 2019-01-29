import React from "react";
import Book from "./book";
import Form from "./form";


export default class BookList extends React.Component{
    
        constructor(props){
            super(props);
            //this.state = {books:[], authors:{}}
            this.state = {books:[]}
            this.deleteBook = this.deleteBook.bind(this);
            this.addBook = this.addBook.bind(this);
        }

        componentDidMount(){
            fetch("http://localhost:8000/api/books-authors")
            .then(response => response.json())
            .then(books =>{
                this.setState({books})
            });

            
            /*fetch("http://localhost:8000/api/books")
            .then(response => response.json())
            .then(books =>{
                this.setState({books})
            });

            fetch("http://localhost:8000/api/authors")
            .then(response => response.json())
            .then(authors =>{
                this.setState({authors})
            });*/
        }

        deleteBook(id){
            const currentBooks = this.state.books;
            const books = currentBooks.filter(book => book.id !== id);
            this.setState({books:books});
        }

        addBook(title, price){
            this.setState({
                books:this.state.books.concat({
                    id:Date.now(),
                    title,
                    price
                })
            })
        }
    
        render(){
            return (
                <ul className="book-list">
                    {this.state.books.map(book =>{
                        return (
                            <Book 
                            key={book.id} 
                            book={book}
                            deleteHandler={this.deleteBook}
                            />
                        );
                    })}
                    <Form addBookAction={this.addBook}/>	
                </ul>
            );
        }

        render2(){
            return (
                <ul className="book-list">
                    {this.state.books.map(book =>{
                        return (
                            <Book 
                            key={book.id} 
                            book={book}
                            author={this.state.authors[book.authorId]}
                            deleteHandler={this.deleteBook}
                            />
                        );
                    })}
                    <Form addBookAction={this.addBook}/>	
                </ul>
            );
        }
    
    }