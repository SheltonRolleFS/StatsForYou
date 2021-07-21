import React from 'react'

const Result = ({ name, errMsg }) => {
    // if(name === errMsg){
    //     return (
    //         <section className="results">
    //             <p className="results__err-msg">{errMsg}</p>
    //         </section>
    //     )
    // }else{
        
    // }

    return (
        <section className="results">
            <h1>{name}</h1>
        </section>
    )
}

export default Result
