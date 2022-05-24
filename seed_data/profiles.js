const bcrypt = require('bcryptjs');

const profileData =
[
    {
        id: 1,
        name: "John",
        about: "Hi there, my name is John and I enjoy playing frisbee. My go to drink order is bud light. I am a huge Green Bay Packers fan. I have lived my entire life in Wisconsin. Someday I hope to be able to move to Florida.",
        profilePicture: "http://localhost:1337/images/image1.jpg",
        username: "johntheman",
        password: "kangaroos",
    },
    {
        id: 2,
        name: "Adam",
        about: "What are YOU doing here? I've crushed seventeen men's skulls between me thighs! You can always trust the untrustworthy because you can always trust that they will be untrustworthy. Its the trustworthy you can't trust. There comes a time in most men's lives where they feel the need to raise the Black Flag. Why are pirates pirates? cuz they arrrrrr STOP BLOWING HOLES IN MY SHIP!!! To err is human but to arr is pirate!! If ye thinks he be ready to sail a beauty, ye better be willin' to sink with her.",
        profilePicture: "",
        username: "adamtheman",
        password: "kangaroos",
    },
    {
        id: 3,
        name: "Mike",
        about: "Have ya ever met a man with a real yardarm? Brwaack! Polly want a cracker? … Oh, wait. That's for Talk Like a PARROT Day. Why are pirates pirates? cuz they arrrrrr The existence of the sea means the existence of pirates. Damnation seize my soul if I give you quarters, or take any from you. Shiver me timbers.",
        profilePicture: "",
        username: "miketheman",
        password: "kangaroos",
    },
    {
        id: 4,
        name: "Steve",
        about: "You're drinking a Salty Dog? How'd you like to try the real thing? That's the finest pirate booty I've ever laid eyes on. What are YOU doing here? Come show me how ye bury yer treasure, lad! The rougher the seas, the smoother we sail. Ahoy! STOP BLOWING HOLES IN MY SHIP!!! Right from the Voyage og Noah, surviving was by sailing. Avast ye! and sail against the tides. My mom would not let me see the pirate movie because it was rated rrrrr.",
        profilePicture: "",
        username: "stevetheman",
        password: "kangaroos",
    },
    {
        id: 5,
        name: "Joe",
        about: "Have ya ever met a man with a real yardarm?  Ya know, darlin', I'm 97 percent chum free Me I'm Dishonest. And A Dishonest Man You Can Always Trust To Be Dishonest. Honestly Its The Honest Ones You Want To Watch Out For Because You Never Know When They Are Going To Do Something Completely Stupid! The average man will bristle if you say his father was dishonest, but he will brag a little if he discovers that his great- grandfather was a pirate.",
        profilePicture: "",
        username: "joetheman",
        password: "kangaroos",
    },
    {
        id: 6,
        name: "Stan",
        about: "Wanna shiver me timbers? “I've got a jar of dirt! I've got a jar of dirt, and guess what's inside it?” “Why is the rum always gone?” It's not everyday you get to do a pirate movie, you might as well go for it.",
        profilePicture: "",
        username: "stantheman",
        password: "kangaroos",
    },
    {
        id: 7,
        name: "Chris",
        about: "That's some treasure chest you've got there. So, tell me, why do they call ye, “Cap'n Feathersword?” “Yes, I do heartily repent. I repent I had not done more mischief; and that we did not cut the throats of them that took us, and I am extremely sorry that you aren't hanged as well as we. ” Land was created to provide a place for boats to visit.",
        profilePicture: "",
        username: "christheman",
        password: "kangaroos",
    },
    {
        id: 8,
        name: "Sebastian",
        about: "That's some treasure chest you've got there. C'mon, lad, shiver me timbers! If ye can't trust a pirate, ye damn well can't trust a merchant either! Well actualy piracy is a democracy with captains voted for by the crew. My mom would not let me see the pirate movie because it was rated rrrrr.",
        profilePicture: "",
        username: "sebastiantheman",
        password: "kangaroos",
    },
]

const hashedProfileData = []
profileData.forEach((profile) => {
    const hashedPassword = bcrypt.hashSync(profile.password, 10)
    const newProfile = {
        id: profile.id,
        name: profile.name,
        about: profile.about,
        profilePicture: profile.profilePicture,
        username: profile.username,
        password: hashedPassword
    }
    hashedProfileData.push(newProfile)
})

module.exports = hashedProfileData