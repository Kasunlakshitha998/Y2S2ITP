import React, { useEffect, useState } from 'react';
import Navbar from "./NavBarFinance";
import axios from "axios";
import DisplayExpense from "./displayExpense";
import './FinanceCSS/DisplayDatabase.css';
import AddExpenseForm from "./AddExpenseForm";


const displayEXPENSESURL = "http://localhost:8080/expenses/";
const addEXPENSESURL = "http://localhost:8080/expenses/add";

const fetchHandler = async () => {
 const response = await axios.get(displayEXPENSESURL);
 return response.data;
}

function ExpendituresHome() {
 const [expenses, setExpenses] = useState([]);
 const [greeting, setGreeting] = useState("");
 const [showForm, setShowForm] = useState(false);
 
  
 useEffect(() => {
    fetchHandler().then((data) =>{
      const latestExpenses = data;
      setExpenses(latestExpenses);
    });

    const hour = new Date().getHours();
    if (hour >= 3 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 16) {
      setGreeting("Good Afternoon");
    } else if (hour>=16 && hour <18) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
 }, []);

 const handleAddExpense = async (expenseData) => {
  try {
    const response = await axios.post(addEXPENSESURL, expenseData);
    if (response.status === 201) {
      setShowForm(false);
      fetchHandler().then((data) => setExpenses(data));
    }
  } catch (error) {
    console.error("Error adding expense:", error);
  }
};


 return (
    <div>
      <Navbar />
      <div className = "welcomemsg">
        <h1 >{greeting}<br></br>This Is Expenditure Management</h1>
       
      </div>
      
      <div className='new-rec-button'>
        <button onClick={()=> setShowForm(true)}>Add New Expense</button>
        <button>Calculate Expense</button>
      </div>
      {showForm && (
        <AddExpenseForm
        onCancel={()=>setShowForm(false)}
        onAdd={handleAddExpense}
        />
      )}
      <div>
        <table className="expense-table">
          <thead>
            <tr className="header-row">
              <th>Expense ID</th>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Description</th>
              <th>Receipt No</th>
              <th>Name</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, i) => (
              <DisplayExpense key={i} expense={expense} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
 );
}

export default ExpendituresHome;
