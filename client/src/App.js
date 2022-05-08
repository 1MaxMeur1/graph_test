import React, {useState, useEffect} from 'react'
import './App.css';
import {useQuery, useMutation} from '@apollo/client'
import {GET_ALL_USERS, GET_ONE_USER} from './query/user'
import {CREATE_USER} from './mutations/user'

function App() {
  const {data, loading, error, refetch} = useQuery(GET_ALL_USERS) //{pollInerval: 500} - ms
  const {data: oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  })
  const [newUser] = useMutation(CREATE_USER)
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)

  console.log(oneUser)

  useEffect(() => {
    if(!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])

  const addUser = (e) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          username, age
        }
      }
    }).then(({data}) => {
      console.log(data)
      setUsername('')
      setAge(0)
    })
  }

  const getAll = e => {
    e.preventDefault()
    refetch()
  }

  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
      <form>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Input your name..' />
        <input value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder='Input your age..' />
        <div className="btns">
          <button onClick={(e) => addUser(e)}>Create</button>
          <button onClick={e => getAll(e)}>Get</button>
        </div>
      </form>
      <div className="users">
        {
          users.map( user => 
          <div key={user.id} className='user'>{user.id}, {user.username}, {user.age}</div>
        )
        }
      </div>
    </div>
  );
}

export default App;
