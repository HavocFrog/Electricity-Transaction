import React from 'react'
import { useState} from 'react'
import { Link } from 'react-router-dom'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Auction from './auction.js'
import Fixing from './fixing.js'


const Home = ({name, contract, web3}) => {
    const [homeAddress, setHomeAddress] = useState(null)
    const [money, setMoney] = useState(null)
    const [energy, setEnergy] = useState(null)
    const [fix, setFix] = useState(false)
    const [auct, setAuct] = useState(false)
    const [account, setAccount] = useState(null)

    if(name != null){
        contract.methods.getHomeAddress(name).call().then((e) => {
            setHomeAddress(e)
        })
        contract.methods.getBalance(name).call().then((e) => {
            setMoney(e)
        })
        contract.methods.getEnergy(name).call().then((e) => {
            setEnergy(e)
        })
        web3.eth.requestAccounts().then((accounts) => {
            setAccount(accounts[0])
        })
    }
    return (
        <div> 
            {!auct && !fix && 
                <div>
                    <h1>Hello {name}</h1>
                    <h1>Your place of stay is {homeAddress}</h1>
                    <h1>You have balance amount of Rs.{money}</h1>
                    <h1>Your energy balance is {energy} KWhr</h1>
                    <Link to='/fixing'><button onClick={() => {setFix(true);setAuct(false)}} style={{height: '35px', width : '140px'}} size="lg">Lend</button></Link>
                    <span style={{wordSpacing: '15px'}}>    </span>
                    <Link to='/auction'><button onClick={() => {setFix(false);setAuct(true)}} style={{height: '35px', width : '140px'}} size="lg">Borrow</button></Link>
                </div>
            }
            <Switch>
                {auct && <Route path="/auction"><Auction web3={web3} contract={contract} name={name} account={account}/></Route>}
                {fix && <Route path="/fixing"><Fixing web3={web3} contract={contract} name={name} account={account}/></Route>}
            </Switch>
        </div>
    );
}
 
export default Home;