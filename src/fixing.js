import {useState} from 'react'

const Fixing = ({contract, web3, name, account}) => {
    const [cost, setCost] = useState(null)
    const [energy, setEnergy] = useState(null)
    const [result, setResult] = useState(null)
    const [done, setDone] = useState(false)

    const handleSubmit = () => {
        return contract.methods.rateFixing(name, cost, energy).send({from:account})
        .then((e) => {
            setResult("Posted in Auction Page")
        }).catch((e) => {
            setResult("Unable to post in the auction page")
        })
    }

    return ( 
        <>
            {done?
                <div>
                    <h1>{result}</h1>
                </div>
                :
                <div>
                    <h1>Rate Fixing</h1>
                    <input type="text" placeholder="Enter the cost per Kwhr" onChange={(e)=>{setCost(e.target.value)}}></input><br></br>
                    <input type="text" placeholder="Enter the energy to be donated" onChange={(e)=>{setEnergy(e.target.value)}}></input><br></br>
                    <button onClick={() => {setDone(true);handleSubmit()}}>Fix</button><br></br>
                </div>
            }
        </>
    );
}
 
export default Fixing;