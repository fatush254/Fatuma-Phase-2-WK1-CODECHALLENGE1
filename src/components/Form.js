import React, { useState, useEffect } from 'react';
import "./Form.css";

function Form() {
  // Get transactions from local storage or initialize an empty array
  const storedTransactions = localStorage.getItem("transactions");
  const initialTransactions = storedTransactions ? JSON.parse(storedTransactions) : [];
  
  // State variables for transactions, form data, search term, sort criteria, and sort order
  const [transactions, setTransactions] = useState(initialTransactions);
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setTransactions([...transactions, formData]);
    setFormData({
      date: "",
      description: "",
      category: "",
      amount: ""
    });
  };

  // Function to handle input changes
  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Function to filter transactions based on search term
  const filterTransactions = () => {
    return transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

 // Function to sort transactions based on selected criteria
const sortTransactions = () => {
  const filtered = filterTransactions(); // Filter transactions based on search term
  if (sortCriteria) {
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortCriteria].localeCompare(b[sortCriteria]);
      } else {
        return b[sortCriteria].localeCompare(a[sortCriteria]);
      }
    });
    return sorted;
  }
  return filtered; // Return filtered transactions if no criteria selected
};


  // Effect to update local storage whenever transactions state changes
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // JSX to render the form and transactions table
  return (
    <div>
      <div className="search-container">
        <form className="search-box">
          <div className="search-input-box">
            <input
              type="text"
              placeholder="Search your Recent Transactions"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="search-icon"></i>
          </div>
        </form>
        <div class="sorter">
          Sort by:
          <button onClick={() => {setSortCriteria("category"); setSortOrder("asc")}}>Category (A-Z)</button>
          <button onClick={() => {setSortCriteria("category"); setSortOrder("desc")}}>Category (Z-A)</button>
          <button onClick={() => {setSortCriteria("description"); setSortOrder("asc")}}>Description (A-Z)</button>
          <button onClick={() => {setSortCriteria("description"); setSortOrder("desc")}}>Description (Z-A)</button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} id="form">
        <div id="form">
          <label>Date:</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleInput}
          />

          <input
            type="text"
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInput}
          />

          <input
            type="text"
            id="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleInput}
          />

          <input
            type="text"
            id="amount"
            placeholder='Amount'
            value={formData.amount}
            onChange={handleInput}
          />
        </div>
        <input type="submit" value="Add Transaction" id="submit" />
      </form>

      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {sortTransactions().map(({ date, description, category, amount }, index) => (
              <tr key={index}>
                <td>{date}</td>
                <td>{description}</td>
                <td>{category}</td>
                <td>{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Form;