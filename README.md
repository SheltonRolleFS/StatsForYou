# What is StatsForYou?

StatsForYou was a school assignment I did during my time in college and is one of my first completed web applications. It's a very simple application that could've definitely used more love in the design process, but the main purpose of this application was to familiarize myself with ReactJS and with getting data from API's. For this application, I used the Twitch API to gather data about streamers and display that data to the user.

# First Steps

Firstly, I created a new react app following the ReactJS Documentation
`npx create-react-app app`

After running this and creating the application, I removed all of the template files and code and moved all my files outside of the app folder and into the root folder of the repository.

## Adding SASS to the application

The first step to adding sass was installing the node-sass package

`npm install --save node-sass`

Once sass was installed, I needed to remove all the CSS files and import the index.scss file into my index.js file. 

#### Why only import one file?

So the way I organized my SASS file system, was I had a seperate SASS file for each component and some resets, base styles and variables. I always found this to be much easier when I'm trying to find styling for a specific part of my site. To do this, I simply imported all of my other sass files into my index.scss file.

`@import './variables'`

# The TwitchAPI

Before starting this project, I was still relatively new to API's. I had maybe worked with one or two public api's that didn't require any authentication. It was just a simple "fetch this link and *boom* free data". The TwitchAPI helped me gain a better understanding of reading API documentation, understanding authentication and how to deal with handling data from API's. The amount of data shown to the user may make it seem like there isn't much data to get from the TwitchAPI, but that couldn't be any farther from the truth. The TwitchAPI has a wide range of data about a streamers channel such as their schedule, current live status, emotes and a whole lot more. There is even a package called tmi.js that lets developers created bots that streamers and their viewers can interact with.

You can read up on the Twitch API [Here](https://dev.twitch.tv/docs/api/) if you'd like.
