
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Place = require("./models/Place");

dotenv.config();

const places = [
    {
        name: "Shri Krishna Janmabhoomi",
        category: "Temple",
        location: "Janmabhoomi Road, Mathura",
        description: "Shri Krishna Janmabhoomi is one of the most important pilgrimage destinations in Mathura. The temple complex is traditionally associated with the birthplace of Lord Krishna and attracts devotees throughout the year.",
        history: "According to Hindu tradition, Lord Krishna was born in Mathura at the site associated with Shri Krishna Janmabhoomi. The complex has great religious significance and is especially visited during Janmashtami.",
        bestTime: "October to March. Janmashtami is a major festival, but the area can be very crowded.",
        timings: "Opening hours vary by season and temple schedule. Morning and evening darshan sessions are generally available; confirm current timings before visiting.",
        image: "images/temples/krishna-janmabhoomi.jpg"
    },
    {
        name: "Banke Bihari Temple",
        category: "Temple",
        location: "Banke Bihari Temple Road, Vrindavan, Mathura",
        description: "Banke Bihari Temple is one of Vrindavan's most famous Krishna temples. Visitors come to experience its devotional atmosphere, traditional worship and distinctive darshan rituals.",
        history: "The temple is dedicated to Banke Bihari, a beloved form of Lord Krishna. Its worship traditions are closely associated with the devotional heritage of Vrindavan.",
        bestTime: "October to March. Holi and Janmashtami are popular occasions, but visitor crowds can be substantial.",
        timings: "Darshan generally takes place in separate morning and evening sessions. Exact timings vary by season and festival; check the temple's current schedule.",
        image: "images/temples/banke-bihari.jpg"
    },
    {
        name: "Prem Mandir",
        category: "Temple",
        location: "Raman Reti, Vrindavan, Mathura",
        description: "Prem Mandir is known for its elaborate white marble architecture, detailed carvings and beautifully illuminated surroundings. Its gardens and evening lighting make it a popular destination.",
        history: "Prem Mandir is a modern temple dedicated to Radha Krishna and Sita Ram. It was established by Jagadguru Shri Kripalu Ji Maharaj and is an important devotional attraction in Vrindavan.",
        bestTime: "October to March. Visit in the evening to enjoy the illumination and the temple's exterior.",
        timings: "The temple generally has morning and evening visiting hours. Lighting schedules and closing times may change, so confirm before visiting.",
        image: "images/temples/prem-mandir.jpg"
    },
    {
        name: "ISKCON Temple",
        category: "Temple",
        location: "Bhaktivedanta Swami Marg, Raman Reti, Vrindavan,Mathura",
        description: "The ISKCON Krishna-Balaram Mandir is known for devotional singing, worship ceremonies and a peaceful spiritual atmosphere. Visitors can experience the temple's religious traditions and architecture.",
        history: "The temple was established by the International Society for Krishna Consciousness and is dedicated to Krishna and Balaram. It is an important centre of Krishna devotion for visitors from India and abroad.",
        bestTime: "October to March. Morning worship and major Krishna festivals are popular times to visit.",
        timings: "The temple generally opens early in the morning and has evening worship sessions. Individual shrine schedules may differ; check current darshan timings.",
        image: "images/temples/iskcon.jpg"
    },
    {
        name: "Vishram Ghat",
        category: "Heritage",
        location: "Banks of the Yamuna River, Mathura",
        description: "Vishram Ghat is a historic riverside ghat known for its steps leading to the Yamuna, devotional activities and evening aarti. It is one of the best-known ghats in Mathura.",
        history: "Vishram Ghat is traditionally associated with Lord Krishna resting here after defeating Kansa. It holds an important place in Mathura's religious traditions and pilgrimage routes.",
        bestTime: "October to March. Early morning and sunset are particularly pleasant, with evening aarti attracting visitors.",
        timings: "The riverside ghat is generally accessible throughout the day. Yamuna Aarti takes place around sunset, with the exact time varying by season.",
        image: "images/heritage/vishram-ghat.jpg"
    },
    {
        name: "Kusum Sarovar",
        category: "Heritage",
        location: "Govardhan Road, near Govardhan, Mathura",
        description: "Kusum Sarovar is a historic water reservoir surrounded by sandstone structures, chhatris and landscaped surroundings. It is valued for its architecture, heritage and peaceful setting.",
        history: "Kusum Sarovar is associated with the devotional traditions of Radha and Krishna in Braj. Its historic structures and reservoir reflect the region's cultural and architectural heritage.",
        bestTime: "October to March. Morning and late afternoon offer pleasant conditions for sightseeing and photography.",
        timings: "Generally visited during daylight hours. Confirm local access arrangements before travelling.",
        image: "images/heritage/kusum-sarovar.jpg"
    },
    {
        name: "Govardhan Hill",
        category: "Heritage",
        location: "Govardhan, Mathura",
        description: "Govardhan Hill is a sacred destination in Braj known for its pilgrimage route, temples and religious traditions. Devotees often undertake Govardhan Parikrama around the hill.",
        history: "According to Hindu tradition, Lord Krishna lifted Govardhan Hill to protect the residents of Braj from heavy rain. This story gives the hill its enduring religious significance.",
        bestTime: "October to March. Govardhan Puja and other major festivals attract large numbers of pilgrims.",
        timings: "The parikrama route is generally accessible throughout the day, but daylight hours are preferable for sightseeing. Allow several hours to complete the traditional route.",
        image: "images/heritage/govardhan.jpg"
    },
    {
        name: "Barsana",
        category: "Heritage",
        location: "Barsana, Mathura",
        description: "Barsana is a historic Braj destination known for its Radha Rani Temple, traditional architecture, surrounding hills and colourful Lathmar Holi celebrations.",
        history: "Barsana is traditionally regarded as the birthplace of Radha and is closely connected with the devotional culture of Braj. Its temples and festivals attract pilgrims throughout the year.",
        bestTime: "October to March. The Holi season is especially popular, although the area becomes very crowded.",
        timings: "The Radha Rani Temple generally has morning and evening darshan sessions. Timings vary by season and festival; verify the current schedule before visiting.",
        image: "images/heritage/barsana.jpg"
    },
    {
        name: "Yamuna River",
        category: "Nature",
        location: "Yamuna riverfront, Mathura",
        description: "The Yamuna River is an important natural and spiritual landmark in Mathura. Its riverfront and ghats offer scenic views, opportunities for quiet reflection and evening devotional activities.",
        history: "The Yamuna holds an important place in Hindu tradition and is closely associated with the stories of Lord Krishna and the cultural heritage of Mathura and Braj.",
        bestTime: "October to March. Early morning and sunset are suitable for riverside visits and photography.",
        timings: "The riverfront is generally accessible during daylight hours, although access varies by ghat. Boat services and aarti schedules depend on local conditions.",
        image: "images/nature/yamuna.jpg"
    },
    {
        name: "Raman Reti",
        category: "Nature",
        location: "Raman Reti, Gokul, Mathura",
        description: "Raman Reti is a peaceful sandy pilgrimage area surrounded by greenery and religious sites. Visitors come for its calm atmosphere and its association with the childhood traditions of Lord Krishna.",
        history: "Raman Reti is traditionally associated with the childhood pastimes of Lord Krishna in the Braj region. It remains a place of religious interest and quiet reflection.",
        bestTime: "October to March, preferably during the cooler morning or late afternoon hours.",
        timings: "Visiting hours depend on the site's local arrangements and nearby temple schedules. Confirm current opening times before travelling.",
        image: "images/nature/raman-reti.jpg"
    },
    {
        name: "Gokul",
        category: "Nature",
        location: "Gokul, Mathura",
        description: "Gokul is a Braj destination known for its peaceful surroundings, religious landmarks and traditional connection with the early life of Lord Krishna. Visitors can explore its temples, lanes and nearby riverfront.",
        history: "According to Hindu tradition, Gokul is associated with the childhood of Lord Krishna, who was raised by Nanda and Yashoda. The town remains an important destination in Braj pilgrimage traditions.",
        bestTime: "October to March. Early mornings are suitable for exploring the town and visiting nearby religious sites.",
        timings: "Gokul is a town rather than a single attraction, so opening hours vary by temple and site. Check individual destinations for current visiting times.",
        image: "images/nature/gokul.jpg"
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        await Place.deleteMany({});
        await Place.insertMany(places);

        console.log(`${places.length} places added successfully.`);
        process.exit(0);
    } catch (error) {
        console.error("Seed error:", error);
        process.exit(1);
    }
};

seedDatabase();
