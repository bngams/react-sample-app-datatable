import logo from './logo.svg';
import './App.css';
import { AppContext } from './AppContext';
import { useEffect, useRef, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import UserTable from './components/UserTable';
import axios from 'axios';


let users = [
  {
    id: 1,
    name: 'Charlie',
    job: 'Janitor',
  },
  {
    id: 2,
    name: 'Mac',
    job: 'Bouncer',
  },
  {
    id: 3,
    name: 'Dee',
    job: 'Aspring actress',
  },
  {
    id: 4,
    name: 'Dennis',
    job: 'Bartender',
  },
];

function App() {
  // states
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState(users);
  const [newUser, setNewUser] = useState({ id: '', name: '', job: ''});

  // refs
  const idRef = useRef();
  const nameRef = useRef();
  const jobRef = useRef();

  // componentDidMount()
  // render => return
  // componentDidUnmount()

  // like componentDidMount()
  // useEffect(function, dependencies) => if dependency change replay function
  useEffect(() => {
    // Using js fetch
    // loadUsersWithFetch();

    // Using Axios
    loadUsersWithAxios();
  }, [])

  const loadUsersWithFetch = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json()) // promise
        .then(data => setRows(data))
        .catch(err => console.log(err));
  }

  const loadUsersWithAxios = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {setRows(res.data); setIsLoading(false)})
  } 

  const deleteRow = (id) => {
    setRows(rows.filter(user => user.id != id));
  }

  const addRow = (user) => {
    setRows([...rows, user]);
  }

  const updateNewUser = (properties) => {
    setNewUser(Object.assign({ id: newUser.id, name: newUser.name, job: newUser.job}, properties))
  }

  const handleSubmitWithHtmlEvent = (event) => {
    event.preventDefault(); // avoid page reload
    const form = event.target; // we get form object
    const user = {
      id: form.elements.id.value,
      name: form.elements.name.value,
      job: form.elements.job.value,
    }
    // debug tools
    // console.log(user);
    // debugger
    addRow(user);
  }

  const handleSubmitWithRefs = (event) => {
    event.preventDefault(); // avoid page reload
    console.log(idRef.current.querySelector('input#id').value);
    console.log(idRef.current.value);
  }

  return (
    <AppContext.Provider value={{rowsFromContext: rows, otherValue: 1}}>
      {
        isLoading ? <CircularProgress /> :
        <div className="App">
          <h2>Table</h2> 
          {/* Shortcut */}
          <UserTable {...{rows, deleteRow}} />     
          {/* classic syntax */}
          {/* <UserTable rows={rows} deleteRow={deleteRow} /> */}

          <h2>Form method 1 - with html event</h2>
          <form className="user-form" onSubmit={handleSubmitWithHtmlEvent}>
            <TextField id="id" label="Id" variant="outlined"/>
            <TextField id="name" label="Name" variant="outlined" />
            <TextField id="job" label="Job" variant="outlined" />
            <Button type="submit" variant="contained">Add</Button>
          </form>

          <h2>Form method 2 - with refs (like html event)</h2>
          <form className="user-form" onSubmit={handleSubmitWithRefs}>
            <TextField id="id" label="Id" variant="outlined" ref={idRef}/>
            <TextField id="name" label="Name" variant="outlined"  ref={nameRef}/>
            <TextField id="job" label="Job" variant="outlined"  ref={jobRef}/>
            <Button type="submit" variant="contained">Add</Button>
          </form>

          <h2>Form method 3 - with states</h2>
          <form className="user-form" onSubmit={handleSubmitWithRefs}>
            <TextField id="id" label="Id" variant="outlined" value={newUser.id} onChange={(e) => updateNewUser({id: e.target.value}) }/>
            <TextField id="name" label="Name" variant="outlined"  value={newUser.name} onChange={(e) => updateNewUser({name: e.target.value}) }/>
            <TextField id="job" label="Job" variant="outlined"  value={newUser.job} onChange={(e) => updateNewUser({job: e.target.value}) }/>
            <Button type="submit" variant="contained">Add</Button>
          </form>

          <h2>More ways to use forms</h2>
          <p>See <a href="https://react-hook-form.com/">react-hook-form</a> & <a href="https://github.com/jquense/yup">Yup</a></p>
        </div>  
      }
    </AppContext.Provider>
  );
}

export default App;
