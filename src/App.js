import { useState } from 'react'

/* eslint-disable react/jsx-no-target-blank */
import Result from './components/Results'

function App() {

  const errMsg = 'There is no user with that username, please try again.'
  const [channel, setChannel] = useState('')
  const [user, setUser] = useState({})

  const fetchData = (channel) => {
    let requestedUser = {}
    // Check that a channel was entered before clicking the search button, if one wasn't, display an error
    if(!channel){

      alert('Please enter a channel name before clicking search!')

    }else{
      // Run a fetch to get an oauth token to access the API with
      const oauthURL = 'https://id.twitch.tv/oauth2/token?client_id=chgdyewi4tcvg7mp34uoxrjq9t6h9m&client_secret=iiy9ht38arnuh5ywfbhltmd36c8cs7&grant_type=client_credentials'
      fetch(oauthURL, {method: 'POST'})
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
          const data = resJSON.data[0]
          // requestedUser = {
          //   'username': data.display_name,
          //   'id': data.id,
          //   'profileImg': data.profile_image_url,
          //   'partnerStatus': data.broadcaster_type
          // }
          requestedUser.username = data.display_name
          requestedUser.id = data.id
          requestedUser.profileImg = data.profile_image_url
          requestedUser.partnerStatus = data.broadcaster_type
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
            setUser(errMsg)

            const entry = document.querySelector('#channelName')
            entry.value = ''
          }else{
            // If the username does exist, gather the rest of the channel information ( The live status and the list of custom emotes )


            // Run a fetch to get the users livestream status
            fetch(`https://api.twitch.tv/helix/search/channels?query=${requestedUser.username}`, opts)
            .then(res => res.json())
            .then(resJSON => {
              // This response gives us an array container 20 channels that match the channel name given, using the ID gathered in the previous fetch, loop through each array item and compare id's to find the channel we are looking for
              for(let i = 0; i < resJSON.data.length; i++){
                let streamer = resJSON.data[i]
                if(streamer.id === requestedUser.id){

                  // If the id matches, add the needed information to the requestedUser object above
                  if(streamer.is_live){
                    requestedUser.is_live = true
                    requestedUser.title = streamer.title
                    requestedUser.game = streamer.game_name
                    requestedUser.startTime = streamer.started_at
                  }else{
                    requestedUser.is_live = false
                  }

                }
              }

            })

            // Run a fetch to get a list of the users custom emotes
            fetch(`https://api.twitch.tv/helix/chat/emotes?broadcaster_id=${requestedUser.id}`, opts)
            .then(res => res.json())
            .then(resJSON => {
              // This response gives us an array container the name and an image of all the custom emotes for the searched channel

              // Create an array containing only the name and image for each emote then add this array to the requestedUser object
              const emotesList = []
              
              for(let i = 0; i < resJSON.data.length; i++){
                let currentEmote = resJSON.data[i]

                let emote = {
                  'name': currentEmote.name,
                  'emoteImg': currentEmote.images.url_4x
                }

                emotesList.push(emote)
              }

              requestedUser.emotes = emotesList

            })

          }

        })

      })
    }

    return requestedUser

  }

  const onClick = async (channel) => {
    const userData = await fetchData(channel)
    console.log('Here is the user data')
    console.log(userData)

    setUser({userData})
    console.log('Here is the user state ')
    console.log(user)
  }

  

  return (
    <>
      <div className="container">
        <section className="user-input">
          <div className="user-input__entry">
            <label htmlFor="channelName">Channel Name</label>
            <input type="text" id="channelName" placeholder="Enter channel name here..." onChange={(evt) => setChannel(evt.target.value)}/>
          </div>
          <button onClick={() => onClick(channel)}>Search</button>
        </section>


        <section className="about">
          <h2>What is Stats4You?</h2>
          <p>
              Stats4You is a website made to provide you information on your 
              favorite Twitch streamers. Using the TwitchAPI, and the username of a 
              streamer of your choosing, we gather relative information such as whether
              the streamer is currently live, information on their stream if they are 
              live, and a list of all of their emotes. 
          </p>
          <p>You can check out the Twitch API documentation <a href="https://dev.twitch.tv/docs/api/" target="_blank" rel="noreferrer">HERE</a></p>
        </section>
      </div>
    </>
  );
}

export default App;
