import React from 'react'
import "./Advice.css"

function Advice() {
    return (
        <div className="advice__section">
            <h1 className="title">Preventive Measures</h1>
        <div className="arrangment"> 
        <img className ="first" width = "120" height="120" src={require('./images/distance.png')} />
         
         <img className="second" width = "120" height="120" src={require('./images/medical-mask.png')} />
        
         <img className="third" width = "120" height="120" src={require('./images/sanitize.png')} />
         
         <img className="fourth" width = "120" height="120" src={require('./images/wash-your-hands.png')} />
         
        </div>


        </div>
    )
}

export default Advice

