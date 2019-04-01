const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true
})

const CharacterSchema = new mongoose.Schema({
    "charBio": {
        "class": String,
        "level": Number,
        "background": String,
        "playerName": String,
        "faction": String,
        "race": String,
        "alignment": String,
        "experiencePoints": Number,
        "DCINumber": Number,
        "characterName": String
    },
    "uuid": String,
    "inspiration": String,
    "proficiencyBonus": Number,
    "savingThrows": {
        "strength": { "proficient": Boolean, "plus": Number },
        "dexterity": { "proficient": Boolean, "plus": Number },
        "constitution": { "proficient": Boolean, "plus": Number },
        "intelligence": { "proficient": Boolean, "plus": Number },
        "wisdom": { "proficient": Boolean, "plus": Number },
        "charisma": { "proficient": Boolean, "plus": Number }
    },
    "skills": {
        "acrobatics": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "animalHandling": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "arcana": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "athletics": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "deception": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "history": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "insight": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "intimidation": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "investigation": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "medicine": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "nature": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "perception": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "performance": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "persuasion": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "religion": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "sleightOfHand": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "stealth": { "proficient": Boolean, "plus": Number, "augmentedBy": String },
        "survival": { "proficient": Boolean, "plus": Number, "augmentedBy": String }
    },
    "baseStats": {
        "strength": { "base": Number, "modifier": Number, "label": String },
        "dexterity": { "base": Number, "modifier": Number, "label": String },
        "constitution": { "base": Number, "modifier": Number, "label": String },
        "intelligence": { "base": Number, "modifier": Number, "label": String },
        "wisdom": { "base": Number, "modifier": Number, "label": String },
        "charisma": { "base": Number, "modifier": Number, "label": String }
    },
    "gameState": {
        "armorClass": Number,
        "initiative": Number,
        "speed": Number,
        "hitPointMaximum": Number,
        "currentHitPoints": Number,
        "temporaryHitPoints": Number,
        "hitDice": Number,
        "deathSaves": {
            "successes": Number,
            "failures": Number
        }
    },
    "personalityTraits": Array,
    "ideals": Array,
    "bonds": Array,
    "flaws": Array,
    "attacksAndSpellcasting": {
        "spells": [
            {
                "name": String,
                "attackBonus": Number,
                "damageType": String
            }
        ],
        "list": Array
    },
    "passiveWisdomPerception": Number,
    "otherProficienciesAndLanguages": Array,
    "equipment": {
        "money": {
            "cp": Number,
            "sp": Number,
            "ep": Number,
            "gp": Number,
            "pp": Number
        },
        "list": Array
    },
    "featuresAndTraits": Array,
    "charCharacteristics": {
        "age": Number,
        "height": String,
        "weight": Number,
        "eyes": String,
        "skin": String,
        "hair": String
    },
    "characterAppearanceURI": String,
    "alliesAndOrganizations": {
        "factionRank": String,
        "faction": String,
        "list": Array
    },
    "characterBackstory": Array,
    "additionalFeaturesAndTraits": Array,
    "treasure": {
        "totalNonConsumableMagicItems": Number,
        "list": Array
    }
}, {
        collection: 'characters'
    })

const Character = mongoose.model('Character', CharacterSchema)

exports.handler = uuid => {
    try {
        return await Character.find({ uuid: uuid }).sort('-date')
    }
    catch (err) {
        console.error("There was an error retrieving queries", err)
    }
}