const bcrypt = require('bcryptjs');

const profileData =
[
    {
        id: 1,
        name: "John",
        about: "That's some treasure chest you've got there. So, tell me, why do they call ye, “Cap'n Feathersword?” “Yes, I do heartily repent. I repent I had not done more mischief; and that we did not cut the throats of them that took us, and I am extremely sorry that you aren't hanged as well as we. ” Land was created to provide a place for boats to visit.",
        profilePicture: "http://localhost:1337/images/John.jpg",
        username: "john",
        password: "seed",
    },
    {
        id: 2,
        name: "Adam",
        about: "What are YOU doing here? I've crushed seventeen men's skulls between me thighs! You can always trust the untrustworthy because you can always trust that they will be untrustworthy. Its the trustworthy you can't trust. There comes a time in most men's lives where they feel the need to raise the Black Flag. Why are pirates pirates? cuz they arrrrrr STOP BLOWING HOLES IN MY SHIP!!! To err is human but to arr is pirate!! If ye thinks he be ready to sail a beauty, ye better be willin' to sink with her.",
        profilePicture: "http://localhost:1337/images/Adam.jpg",
        username: "adam",
        password: "seed",
    },
    {
        id: 3,
        name: "Mike",
        about: "Have ya ever met a man with a real yardarm? Brwaack! Polly want a cracker? … Oh, wait. That's for Talk Like a PARROT Day. Why are pirates pirates? cuz they arrrrrr The existence of the sea means the existence of pirates. Damnation seize my soul if I give you quarters, or take any from you. Shiver me timbers.",
        profilePicture: "http://localhost:1337/images/Mike.jpg",
        username: "mike",
        password: "seed",
    },
    {
        id: 4,
        name: "Steve",
        about: "You're drinking a Salty Dog? How'd you like to try the real thing? That's the finest pirate booty I've ever laid eyes on. What are YOU doing here? Come show me how ye bury yer treasure, lad! The rougher the seas, the smoother we sail. Ahoy! STOP BLOWING HOLES IN MY SHIP!!! Right from the Voyage og Noah, surviving was by sailing. Avast ye! and sail against the tides. My mom would not let me see the pirate movie because it was rated rrrrr.",
        profilePicture: "http://localhost:1337/images/Steve.jpg",
        username: "steve",
        password: "seed",
    },
    {
        id: 5,
        name: "Stan",
        about: "Wanna shiver me timbers? “I've got a jar of dirt! I've got a jar of dirt, and guess what's inside it?” “Why is the rum always gone?” It's not everyday you get to do a pirate movie, you might as well go for it.",
        profilePicture: "http://localhost:1337/images/Stan.jpg",
        username: "stan",
        password: "seed",
    },
    {
        id: 6,
        name: "Chris",
        about: "That's some treasure chest you've got there. So, tell me, why do they call ye, “Cap'n Feathersword?” “Yes, I do heartily repent. I repent I had not done more mischief; and that we did not cut the throats of them that took us, and I am extremely sorry that you aren't hanged as well as we. ” Land was created to provide a place for boats to visit.",
        profilePicture: "http://localhost:1337/images/Chris.jpg",
        username: "chris",
        password: "seed",
    },
    {
        id: 7,
        name: "Audrey",
        about: "I'm baby godard microdosing waistcoat helvetica. Shoreditch deep v pug authentic vice portland edison bulb, hot chicken succulents snackwave farm-to-table. VHS freegan glossier skateboard cred, gastropub seitan kinfolk tattooed. Sustainable narwhal drinking vinegar, gentrify direct trade organic small batch subway tile godard church-key mixtape fashion axe. Poke salvia drinking vinegar banh mi chicharrones selvage, bushwick brooklyn ethical plaid man braid. Godard skateboard pour-over typewriter neutra tonx street art hoodie hot chicken.",
        profilePicture: "http://localhost:1337/images/Audrey.jpg",
        username: "audrey",
        password: "seed",
    },
    {
        id: 8,
        name: "Elizabeth",
        about: "Before they sold out everyday carry af humblebrag YOLO listicle. Messenger bag disrupt health goth iPhone tote bag ramps. Waistcoat tonx narwhal, YOLO pinterest kitsch art party aesthetic green juice sustainable microdosing. Brooklyn air plant praxis artisan, ugh authentic cronut. Intelligentsia gluten-free pitchfork butcher kogi. Butcher ethical dreamcatcher trust fund gochujang blue bottle DSA photo booth la croix.",
        profilePicture: "http://localhost:1337/images/Elizabeth.jpg",
        username: "elizabeth",
        password: "seed",
    },
    {
        id: 9,
        name: "Anabelle",
        about: "Kale chips helvetica post-ironic kogi. Slow-carb scenester leggings 90's synth pug mlkshk blog. Gentrify vaporware vinyl adaptogen keytar subway tile sriracha blog snackwave aesthetic succulents. Tattooed jean shorts vinyl 3 wolf moon.",
        profilePicture: "http://localhost:1337/images/Anabelle.jpg",
        username: "anabelle",
        password: "seed",
    },
    {
        id: 10,
        name: "Krystal",
        about: "Seitan ugh praxis leggings, +1 venmo gastropub organic af yr offal iPhone. Microdosing swag raclette distillery tote bag raw denim kale chips vice banh mi humblebrag mlkshk hot chicken pug affogato vexillologist. Air plant retro locavore stumptown adaptogen, trust fund polaroid food truck succulents. Iceland air plant microdosing, intelligentsia gochujang lo-fi gentrify vaporware affogato next level crucifix craft beer pug.",
        profilePicture: "http://localhost:1337/images/Krystal.jpg",
        username: "krystal",
        password: "seed",
    },
    {
        id: 11,
        name: "Casey",
        about: "90's schlitz hella, ramps viral cloud bread umami seitan. Succulents tumeric retro single-origin coffee fanny pack ugh green juice street art meh adaptogen kombucha meditation. Literally pickled next level shabby chic letterpress snackwave ugh selfies roof party pork belly hashtag small batch. Migas four loko forage, fixie lyft art party farm-to-table 90's paleo four dollar toast celiac williamsburg. Typewriter everyday carry VHS pour-over, normcore tousled gentrify art party YOLO lomo squid man bun. Kickstarter raclette retro typewriter, tumeric succulents tilde snackwave kogi unicorn iPhone lo-fi. Tonx distillery man bun asymmetrical.",
        profilePicture: "http://localhost:1337/images/Casey.jpg",
        username: "casey",
        password: "seed",
    },
    {
        id: 12,
        name: "Melody",
        about: "Fingerstache tofu tattooed raw denim migas post-ironic gluten-free iceland locavore organic godard YOLO. Woke venmo pabst 3 wolf moon lyft YOLO forage typewriter readymade fixie af leggings activated charcoal sartorial glossier. Green juice locavore slow-carb kinfolk street art. Bicycle rights flexitarian flannel umami slow-carb kogi, tousled kinfolk roof party echo park craft beer VHS.",
        profilePicture: "http://localhost:1337/images/Melody.jpg",
        username: "melody",
        password: "seed",
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