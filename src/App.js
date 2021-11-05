import { useState } from 'react'

/* eslint-disable react/jsx-no-target-blank */
import Result from './components/Results'

function App() {

  const errMsg = 'There is no user with that username, please try again.'
  const [channel, setChannel] = useState('')
  const [username, setUsername] = useState('')
  const [description, setDescription] = useState('')
  const [profileImg, setProfileImg] = useState('')
  const [offlineImg, setOfflineImg] = useState('')
  const [partnerStatus, setPartnerStatus] = useState(false)
  const [liveStatus, setLiveStatus] = useState(false)
  const [title, setTitle] = useState('')
  const [game, setGame] = useState('')
  const [emotes, setEmotes] = useState([])


  const fetchData = async (channel) => {
    // Check that a channel was entered before clicking the search button, if one wasn't, display an error
    if(!channel){

      alert('Please enter a channel name before clicking search!')

    }else{
      // Run a fetch to get an oauth token to access the API with
      const oauthURL = 'https://id.twitch.tv/oauth2/token?client_id=chgdyewi4tcvg7mp34uoxrjq9t6h9m&client_secret=iiy9ht38arnuh5ywfbhltmd36c8cs7&grant_type=client_credentials'
      await fetch(oauthURL, {method: 'POST'})
      .then(res => res.json())
      .then(data => {
        const token = data.access_token
        const clientId = 'chgdyewi4tcvg7mp34uoxrjq9t6h9m'
        const opts = {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${token}`,
                'Client-Id': clientId
            }
        }

        /* 
          Using the oauth token, gather the following pieces of information about the channel that the user searched for: 
          - Channel Display Name
          - Channel ID
          - Channel Profile Image
          - Whether the channel is a Twitch Partner or not (we will use this to determine whether or not to display a partner badge next to the users name)
          - Whether the channel is currently live or not. If the channel is live, gather the following additional information:
            - The livestream title
            - The current game category for the livestream
            - The duration of the livestream
          - A list of all the channels personal emotes
        */
        fetch(`https://api.twitch.tv/helix/users?login=${channel}`, opts)
        .then(res => res.json())
        .then(resJSON => {
          /*
            This response should give us:
            - The display name
            - The channel id
            - The profile image url
            - The channels partner status
          */

          // Check that the username that the user entered actually exists, if not, display an error
          if(resJSON.data.length <= 0){
            // If the username does exist, an array will be returned with its information, so if the array returned is empty then the username does not exist
            setUsername(errMsg)

            const entry = document.querySelector('#channelName')
            entry.value = ''
          }else{
            const data = resJSON.data[0]
            setUsername(data.display_name)
            setDescription(data.description)
            setProfileImg(data.profile_image_url)
            setOfflineImg(data.offline_image_url)
            setPartnerStatus(data.broadcaster_type)
            // If the username does exist, gather the rest of the channel information ( The live status and the list of custom emotes )


            // Run a fetch to get the users livestream status
            fetch(`https://api.twitch.tv/helix/search/channels?query=${data.display_name}`, opts)
            .then(res => res.json())
            .then(resJSON => {
              // This response gives us an array container 20 channels that match the channel name given, using the ID gathered in the previous fetch, loop through each array item and compare id's to find the channel we are looking for
              for(let i = 0; i < resJSON.data.length; i++){
                let streamer = resJSON.data[i]
                if(streamer.id === data.id){

                  // If the id matches, add the needed information to the requestedUser object above
                  if(streamer.is_live){
                    setLiveStatus(true)
                    setTitle(streamer.title)
                    setGame(streamer.game_name)
                  }else{
                    setLiveStatus(false)
                  }

                }
              }

            })

            // Run a fetch to get a list of the users custom emotes
            fetch(`https://api.twitch.tv/helix/chat/emotes?broadcaster_id=${data.id}`, opts)
            .then(res => res.json())
            .then(resJSON => {
              // This response gives us an array container the name and an image of all the custom emotes for the searched channel

              // Create an array containing only the name and image for each emote then add this array to the requestedUser object
              const emotesList = []
              
              for(let i = 0; i < resJSON.data.length; i++){
                let currentEmote = resJSON.data[i]
                const id = Math.floor(Math.random() * 10000) + 1

                let emote = {
                  'name': currentEmote.name,
                  'emoteImg': currentEmote.images.url_4x,
                  'id': id
                }

                emotesList.push(emote)
              }

              setEmotes(emotesList)

            })

          }

        })

      })
    }

    // Set the search input back to be empty
    const search = document.querySelector('#channelName');
    search.value = '';

  }

  return (
    <>
      <div id="top" className="intro">
        <div className="overlay">
          <div className="container">
            <header>
              <nav>
                <a href="https://dev.twitch.tv/docs/" target="_blank">TwitchAPI Documentation</a>
              </nav>
            </header>
            <section className="about">
              <h1>StatsForYou</h1>
              <p>
                  StatsForYou is a website made to provide you information on your 
                  favorite Twitch streamers. Using the TwitchAPI, and the username of a 
                  streamer of your choosing, we gather relative information such as whether
                  the streamer is currently live, information on their stream if they are 
                  live, and a list of all of their emotes. 
              </p>
            </section>
          </div>
        </div>
      </div>

      <section id="user">
        <div className="container">
          <section className="user-input">
            <label htmlFor="channelName">Channel Name</label>
            <input type="text" id="channelName" placeholder="eg. SONII" onChange={(evt) => setChannel(evt.target.value)}/>
            <button id="search-btn" onClick={() => fetchData(channel)}>Search</button>
          </section>

          {/* Check if a user was searched for and only display the results section if one was */}
          {username !== '' ? <Result name={username} description={description} profileImg={profileImg} offlineImg={offlineImg} partnerStatus={partnerStatus} liveStatus={liveStatus} title={title} game={game} emotes={emotes} errMsg={errMsg}/> : ''}
        </div>
      </section>
    </>
  );
}

export default App;
