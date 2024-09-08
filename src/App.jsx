import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'


function App() {
  const [count, setCount] = useState(0)
  useEffect(()=>{

 
 
    const fetchData = async () => {
      try {
        const result = await axios('http://localhost:5000/api/users')
        console.log(result,'result is showing ');
      } catch (err) {
        console.error(err); // Handle any errors
      }
    };

    fetchData(); // Call the async function
  },[])

  return (
    <>

      <h1>Hellow</h1>
    </>
  )
}

export default App
