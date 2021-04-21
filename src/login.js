import { Link } from 'react-router-dom'
import React, {useState} from 'react'
import Home from './home.js'

const Login = ({contract, web3}) => {
    const [name, setName] = useState(null) // Name
    const [password, setPassword] = useState(null) // Password
    const [result, setResult] = useState(null)
    const [done, setDone] = useState(false)

    const handleSubmit = () => {
        contract.methods.authenticate(name, password).call().then((e) => {
            setResult(e)
        })
    }
            
    return (
        <>
            {done ?
                <>
                    {result === name?<Home name={name} web3={web3} contract={contract}/>:<h1>{result}</h1>}
                </>
                :
                <>
                    <h1>Login</h1>
                    <input type="text" placeholder="Enter the name" onChange={(e) => setName(e.target.value)}></input><br></br>
                    <input type="password" placeholder="Enter the password" onChange={(e) => setPassword(e.target.value)}></input><br></br>
                    <button onClick={() => {setDone(true);handleSubmit()}}>Login</button><br></br>
                    <label>New to our webiste</label><br></br>  
                    <Link to="/register">Register</Link><br></br>
                </>
            }
        </>  
    );
}
 
export default Login;
