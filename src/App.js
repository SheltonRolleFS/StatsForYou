function App() {
  return (
    <>
      <div className="container">
        <section className="user-input">
          <div className="user-input__entry">
            <label htmlFor="channelName">Channel Name</label>
            <input type="text" id="channelName" placeholder="Enter channel name here..."/>
          </div>
          <button>Search</button>
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
