import React from 'react'

const Result = ({ name, id, profileImg, partnerStatus, liveStatus, title, game, startTime, emotes }) => {
    // if(name === errMsg){
    //     return (
    //         <section className="results">
    //             <p className="results__err-msg">{errMsg}</p>
    //         </section>
    //     )
    // }else{
        
    // }
    const streamlink = `https://www.twitch.tv/${name}`

    return (
        <section className="results">
            <header className="results__header">
                <img src={profileImg} alt="profile" />
                <div className="name">
                    <h1>{name}</h1>
                    {partnerStatus === 'partner' ? <img src={profileImg} alt="partner-badge" id="partner-badge"/> : ''}
                </div>
            </header>

            <section className="results__live-status">
                {liveStatus === true ? 

                <div className="live-card">
                    <h2>{title}</h2>
                    <p>{game}</p>
                    <p>{startTime}</p>
                    <a target="_blank" href={streamlink}>Watch Now</a>
                </div>

                : <p>{name} is currently offline!</p>}
            </section>

            <section className="results__emotes">
                {emotes.length > 0 ? 
                
                emotes.map(emote => {
                    return (
                        <div className="emotes-container" key={emote.id}>
                            <img src={emote.emoteImg} alt="emote"/>
                            <p>{emote.name}</p>
                        </div>
                    ) 
                })
                
                : <h1>No Emotes</h1>}
            </section>
        </section>
    )
}

export default Result
