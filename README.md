# Frememberatr Server (To be used in conjunction with Client)

Have you ever gotten someone a bad gift? Are you a frequent bad gift-giver? Does life leave
too little time to think of a good present for those you love? Well look no further -
Frememberatr (Friend - Remember - ‘ater’) is a mobile app whose main purpose is to let you
look up the information you need to make someone in your life very happy!

My project solves the problem of remembering the likes and dislikes of all the people in
your life. Rather than store all that information in the messy, disorganized database that is the
human brain, simply log on to your Frememberatr profile and look up what you need to know.
Each user makes their own profile and simply creates a collection log of things they like, and
things they don’t like.

First, install the server's dependencies. Navigate to the directory it's saved under and install all dependencies by using the terminal command 'npm i'.

Before starting the server, you will have to configure a database on MySQL. Check the knexfile.js and make sure it aligns with your personal set up on MySQL. Check that the username and password match your own configuration, and that you have created a database locally (called 'frememberatr'). Then, from the project directory run the terminal command 'npm run migrate' to add the necessary tables to your database which will store the data that the app generates from the users. After that, you may populate these tables with seed data by running the command 'npm run seed'.

Then, start it with the command 'npm start.'

Create a profile, build it out, and have your friends and family do the same. Never again will anyone need to ask what someone likes or dislikes.
