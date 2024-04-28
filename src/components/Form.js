import React from 'react'
import "./Form.css"

function Form() {
  return (
    <div>
    <form>
        <div id="form">
        <label>Date:</label>
        <input type="date"></input>
        <input type="text" placeholder="Description"></input>
        <input placeholder="Category"></input>
        <input placeholder='Amount'></input>
        </div>
        <input type="submit" value="Add Transactions"></input>

    </form>
    </div>
  )
}

export default Form