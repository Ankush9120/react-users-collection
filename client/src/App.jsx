import MyRouter from './components/MyRouter'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext , useReducer } from 'react';

// Reducer Function

const initialState = null ;
const reducer = (state,action) =>{
  if(action.type === 'USER'){
    return action.payload
  }
  return state
}

// Context Api

export const UserContext = createContext()

const App = ()=> {
    
  const [state, dispatch] = useReducer(reducer,initialState)

  return (
    <div className='myContainer'>
      <UserContext.Provider value={{state,dispatch}}>
        <MyRouter />
      </UserContext.Provider>
      <span>
        <ToastContainer autoClose={2000} theme="colored" />
      </span>
    </div>
  )
}

export default App