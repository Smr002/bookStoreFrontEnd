import React, { Component } from 'react';
import { getAllAddCards, deleteAddCard, updateAddCard, updateBook, getBookByID } from '../api';
import "../cardShopping.css";

class CardShop extends Component {
    state = {
        cartItems: [],
        subtotal: 0,
        loading: true,
        error: null,
    };

    componentDidMount() {
        this.fetchCartItems();
    }

    // Fetch all cart items and calculate subtotal
    fetchCartItems = async () => {
        try {
            const cartItems = await getAllAddCards();
            const subtotal = this.calculateSubtotal(cartItems);
            this.setState({ cartItems, subtotal, loading: false });
        } catch (error) {
            this.setState({ error: 'Failed to load cart items', loading: false });
        }
    };

    // Calculate subtotal based on cart items
    calculateSubtotal = (items) => {
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    // Remove an item from the cart
    handleRemoveItem = async (id) => {
        try {
            await deleteAddCard(id);
            const updatedCartItems = this.state.cartItems.filter((item) => item._id !== id);
            const updatedSubtotal = this.calculateSubtotal(updatedCartItems);
            this.setState({ cartItems: updatedCartItems, subtotal: updatedSubtotal });
        } catch (error) {
            console.error('Error removing item:', error);
            this.setState({ error: 'Failed to remove item' });
        }
    };

    // Update quantity of an item in the cart
    handleUpdateQuantity = async (id, newQuantity) => {
        try {
            const updatedItem = await updateAddCard(id, { quantity: newQuantity });
            const updatedCartItems = this.state.cartItems.map((item) =>
                item._id === id ? updatedItem : item
            );
            const updatedSubtotal = this.calculateSubtotal(updatedCartItems);
            this.setState({ cartItems: updatedCartItems, subtotal: updatedSubtotal });
        } catch (error) {
            console.error('Error updating quantity:', error);
            this.setState({ error: 'Failed to update quantity' });
        }
    };


    handleAddSalesBook = async (id, quantity) => {
        try {
            // Find the cart item in the state by ID
            const item = this.state.cartItems.find((item) => item._id === id);
            if (!item) throw new Error("Item not found in cart");

            // Fetch the book from the database using its ID
            console.log("Fetching book from database with ID:", id);
            const book = await getBookByID(item.bookId);
            console.log("Fetched book:", book);

            if (book) {
                // Calculate the new noOfSells count
                const newNoOfSells = quantity + book.noOfSell;
                const newStock = book.stock - quantity;

                // Create the editBook object to update only the required fields
                const editBook = {
                    name: book.name,
                    stock: newStock,
                    author: book.author,
                    price: book.price,
                    noOfSell: newNoOfSells,  // Only updating the noOfSells field
                };
                console.log("Updating book noOfSells with new count:", editBook);

                // Update the book in the books collection with editBook
                const updatedBook = await updateBook(item.bookId, editBook);
                console.log("Updated book:", updatedBook);

                // Update the cartItems array in the state to reflect changes
                const updatedCartItems = this.state.cartItems.map((cartItem) =>
                    cartItem._id === id ? { ...cartItem, noOfSells: newNoOfSells } : cartItem
                );

                // Recalculate subtotal with the updated items
                const updatedSubtotal = this.calculateSubtotal(updatedCartItems);

                // Update the state
                this.setState({ cartItems: updatedCartItems, subtotal: updatedSubtotal });

                this.handleRemoveItem(item._id);
            } else {
                console.error("Book not found in the database");
                this.setState({ error: "Book not found in the database" });
            }
        } catch (error) {
            console.error("Error details:", error);
            this.setState({ error: "Failed to update the sales count in books collection" });
        }
    };






    // Handle checkout by updating all items' sales
    handleCheckout = () => {
        this.state.cartItems.forEach((item) => {
            console.log("Quantity of Card:"+item.quantity);
            this.handleAddSalesBook(item._id, item.quantity);
            
        });
        alert('Checkout completed!');
    };

    render() {
        const { cartItems, subtotal, loading, error } = this.state;

        return (
            <div className="cart-wrapper">
                <div className="cart-container">
                    <header className="cart-header">
                        <h1>Shopping Cart</h1>
                        <button className="close-button">&times;</button>
                    </header>

                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div className="cart-item" key={item._id}>
                                <img src={item.image || 'https://via.placeholder.com/60'} alt={item.name} className="product-image" />
                                <div className="item-details">
                                    <p className="item-name">{item.name}</p>
                                    <p className="item-author">by {item.author}</p>
                                    <p className="item-size">Quantity:
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => this.handleUpdateQuantity(item._id, parseInt(e.target.value))}
                                            className="quantity-input"
                                        />
                                    </p>
                                    <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <button className="remove-button" onClick={() => this.handleRemoveItem(item._id)}>&times;</button>
                            </div>
                        ))
                    ) : (
                        <p className="empty-cart-message">Your cart is empty.</p>
                    )}

                    <div className="cart-footer">
                        <div className="subtotal">
                            <span>Subtotal:</span>
                            <span className="subtotal-price">${subtotal.toFixed(2)}</span>
                        </div>
                        <button className="cart-button" onClick={() => alert('View Cart clicked!')}>View Cart</button>
                        <button className="cart-button" onClick={this.handleCheckout}>Checkout</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardShop;
