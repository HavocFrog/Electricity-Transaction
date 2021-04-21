import {useState} from 'react'
import './App.css';

const Auction = ({contract, name, web3, account}) => {
    const [names, setNames] = useState(null) 
    const [costs, setCosts] = useState(null) 
    const [energys, setEnergys] = useState(null) 
    const [done, setDone] = useState(false)
    const [result, setResult] = useState(null)
    var users = []
    contract.methods.auctionNames().call().then((e) => {
        setNames(e)
    })

    contract.methods.auctionCost().call().then((e) => {
        setCosts(e)
    })

    contract.methods.auctionEnergy().call().then((e) => {
        setEnergys(e)
        setDone(true)
    })
    
    if(done && names !== null && costs !== null && energys != null){
        for(var i=0;i<names.length;i++){
            if(names[i] !== name && costs[i] != 0 && energys[i] != 0){
                const user = {
                    "Name" : names[i],
                    "Cost" : costs[i],
                    "Energy": energys[i]
                }
                users.push(user)
            }
        }
    }

    const handleSubmit = (sender) => {
        const receiverName = name
        return contract.methods.transaction(sender.Name, receiverName, sender.Energy, sender.Cost,names.indexOf(sender.Name)).send({from:account})
        .then((e) => {
            setResult("Transaction Successful")
        }).catch((e) => {
            setResult("Transaction Unsuccessful")
        })
    }

    return (
        <div>
            <h1>{result}</h1>
            <div className="flex-container">    
                {(users === null || users.length === 0)
                    ?
                    <h1 style={{textAlign:"center"}}>Nothing to display as no one has Aucted</h1>
                    :
                    users.map((user) => 
                        <div key={user.Name}>
                            <h1>{user.Name}</h1>
                            <h1>Rs.{user.Cost} per Kwhr</h1>
                            <h1>{user.Energy} Kwhr</h1>
                            <button onClick={() => handleSubmit(user)}>Transact</button>
                        </div>
                )}
            </div>
        </div>            
    );
}
 
export default Auction;