import React,{useState, useEffect} from 'react'
import axios from 'axios';
import TipTap from './components/TipTap';
import GlobalStyle from './components/GlobalStyles';

/*
for replacing json
function escapeDoubleQuotes(string) {
  return string.replace(/"/g, '\\"');
}

*/

function App() {

  // useEffect(() =>{
  //   const fetchData = async () => {
  //     const result = await axios.get('http://localhost:8000/api/blog/posts');
  //     console.log(result.data)
  //     setData(result.data);
  //     console.log(result.data);
  //   }
  //   fetchData();
  // },[content])

  return (
    <div className="App">
      <GlobalStyle />
      <TipTap className='editor'/>
    </div>
  );
}

export default App;