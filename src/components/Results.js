import React from 'react'
import partnerBadge from '../assets/partner-badge.png'

const Result = ({ name, description, profileImg, offlineImg, partnerStatus, liveStatus, title, game, emotes, errMsg }) => {
    
    if(name === errMsg){
        return (
            <section className="results">
                <p className="results__err-msg">{errMsg}</p>
            </section>
        )
    }else{
        const streamlink = `https://www.twitch.tv/${name}`

        return (
            <section className="results">
                <header className="results__header">
                    <img src={profileImg} alt="profile" />
                    <div className="name">
                        <h1>{name}</h1>
                        {partnerStatus === 'partner' ? <img src={partnerBadge} alt="partner-badge." id="partner-badge"/> : ''}
                    </div>
                    <p>{description}</p>
                </header>

                <section className="results__live-status">
                    {liveStatus === true ? 

                    <div className="live-card">
                        <h2>{title}</h2>
                        <p>{game}</p>
                        <a target="_blank" href={streamlink} rel="noreferrer">Watch Now</a>
                    </div>

                        :
                        <div>
                            <img src={offlineImg} alt="offline banner" />
                            <p>{name} is currently offline!</p>
                        </div>}
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
                    
                    : <p>This user doesn't seem to have any custom emotes of their own!</p>}
                </section>
            </section>
        )   
    }
}

export default Result
