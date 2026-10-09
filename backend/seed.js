const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Place = require("./models/Place");

dotenv.config();

const places = [
    {
        name: "Shri Krishna Janmabhoomi",
        category: "Temple",
        location: "Mathura",
        description:
            "A major spiritual destination believed to be associated with the birthplace of Lord Krishna.",
        history:
            "Shri Krishna Janmabhoomi is one of the most important religious destinations in Mathura and is deeply connected with the traditions surrounding Lord Krishna.",
        bestTime:
            "October to March and during major festivals such as Janmashtami.",
        image: "images/temples/krishna-janmabhoomi.jpg"
    },

    {
        name: "Banke Bihari Temple",
        category: "Temple",
        location: "Vrindavan",
        description:
            "One of the most famous Krishna temples in Vrindavan, known for its devotional atmosphere.",
        history:
            "The temple is dedicated to Banke Bihari, a beloved form of Lord Krishna worshipped in Vrindavan.",
        bestTime:
            "October to March and during Holi and Janmashtami.",
        image: "images/temples/banke-bihari.jpg"
    },

    {
        name: "Prem Mandir",
        category: "Temple",
        location: "Vrindavan",
        description:
            "A beautifully illuminated temple known for its detailed architecture and peaceful surroundings.",
        history:
            "Prem Mandir is a modern temple complex dedicated to Radha Krishna and Sita Ram.",
        bestTime:
            "Evening is especially beautiful when the temple is illuminated.",
        image: "images/temples/prem-mandir.jpg"
    },

    {
        name: "ISKCON Temple",
        category: "Temple",
        location: "Vrindavan",
        description:
            "A popular spiritual destination known for Krishna devotion, chanting and peaceful surroundings.",
        history:
            "The ISKCON temple in Vrindavan attracts devotees and visitors from around the world.",
        bestTime:
            "October to March.",
        image: "images/temples/iskcon.jpg"
    },

    {
        name: "Vishram Ghat",
        category: "Heritage",
        location: "Mathura",
        description:
            "A historic riverside ghat on the banks of the Yamuna, famous for evening aarti.",
        history:
            "Vishram Ghattraditionally associated with Lord Krishna and is an important pilgrimage location in Mathura.",
        bestTime:
            "Evening, especially during Yamuna Aarti.",
        image: "images/heritage/vishram-ghat.jpg"
    },

    {
        name: "Kusum Sarovar",
        category: "Heritage",
        location: "Govardhan",
        description:
            "A historic water reservoir surrounded by beautiful architectural structures.",
        history:
            "Kusum Sarovar is associated with the Braj region and is known for its peaceful surroundings and historic structures.",
        bestTime:
            "October to March.",
        image: "images/heritage/kusum-sarovar.jpg"
    },

    {
        name: "Govardhan Hill",
        category: "Heritage",
        location: "Govardhan",
        description:
            "A sacred hill deeply connected with the stories and traditions of Lord Krishna.",
        history:
            "Govardhan Hill holds great spiritual importance in Braj and is traditionally associated with Krishna's Govardhan Leela.",
        bestTime:
            "October to March.",
        image: "images/heritage/govardhan.jpg"
    },

    {
        name: "Barsana",
        category: "Heritage",
        location: "Barsana",
        description:
            "A historic Braj destination known for Radha traditions, temples and colourful festivals.",
        history:
            "Barsana is traditionally regarded as the birthplace of Radha and is an important destination in Braj culture.",
        bestTime:
            "Holi season and October to March.",
        image: "images/heritage/barsana.jpg"
    },

    {
        name: "Yamuna River",
        category: "Nature",
        location: "Mathura",
        description:
            "The sacred Yamuna provides peaceful riverside views and beautiful evening scenes.",
        history:
            "The Yamuna has played an important role in the religious and cultural traditions of Mathura and Braj.",
        bestTime:
            "Morning and evening.",
        image: "images/nature/yamuna.jpg"
    },

    {
        name: "Raman Reti",
        category: "Nature",
        location: "Gokul",
        description:
            "A peaceful natural area associated with the childhood stories of Lord Krishna.",
        history:
            "Raman Reti is traditionally associated with Krishna's childhood activities in the Braj region.",
        bestTime:
            "October to March.",
        image: "images/nature/raman-reti.jpg"
    },

    {
        name: "Gokul",
        category: "Nature",
        location: "Gokul",
        description:
            "A peaceful destination surrounded by the spiritual and natural beauty of Braj.",
        history:
            "nidhivan is traditionally connected with the childhood period of Lord Krishna.",
        bestTime:
            "October to March.",
        image: "images/nature/nidhivan.jpg"
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        await Place.deleteMany();

        await Place.insertMany(places);

        console.log("Places added successfully");

        process.exit();
    } catch (error) {
        console.error("Seed error:", error);
        process.exit(1);
    }
};

seedDatabase();