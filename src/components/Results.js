import React from 'react'

const Result = ({ data, errMsg }) => {
    if(data === errMsg){
        return (
            <section className="results">
                <p className="results__err-msg">{data}</p>
            </section>
        )
    }else{
        return (
            <section className="results">
                <h1>{data}</h1>
            </section>
        )
    }
}

export default Result
