import React, {useState} from 'react'
import { Link } from 'react-router-dom'


const Register = ({contract, web3}) => {
    const [name, setName] = useState(null) // Name
    const [address, setAddress] = useState(null) // Home Address
    const [password, setPassword] = useState(null) // Password
    const [energy, setEnergy] = useState(null) // Energy
    const [money, setMoney] = useState(null) // Money 
    const [result, setResult] = useState(null)
    const [done, setDone] = useState(false)
    
    const handleSubmit = () => {
        web3.eth.requestAccounts().then((accounts) => {
            var account = accounts[0]
            return contract.methods.addUser(name, address, password, energy, money).send({from:account})
        }).then((e) => {
            setResult("Registration Successful")
        }).catch((e) => {
            setResult("Registration Unsuccessful")
        })
    }

    return (  
        <>
            {done?
            <>    
                <h1>{result}</h1>
                <h2>Go to login Page</h2><br></br>
                <Link to="/">Login</Link>
            </>
                :
            <>
                <h1>Registration Page</h1><br></br>
                <input type="text" placeholder="Enter the name" onChange={(e) => setName(e.target.value)}></input><br></br>
                <input type="text" placeholder="Enter the address" onChange={(e) => setAddress(e.target.value)}></input><br></br>
                <input type="text" placeholder="Enter the energy" onChange={(e) => setEnergy(e.target.value)}></input><br></br>
                <input type="text" placeholder="Enter the money" onChange={(e) => setMoney(e.target.value)}></input><br></br>
                <input type="password" placeholder="Enter the password" onChange={(e) => setPassword(e.target.value)}></input><br></br>
                <button onClick={() => {setDone(true);handleSubmit()}}>Register</button><br></br>
                <label>Already have an account</label><br></br>        
                <Link to="/">Login</Link>
            </>
            }
        </>
    );
}
 
export default Register;