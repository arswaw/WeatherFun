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

    async function character() {
        try {
            return await Character.create({
                charBio: {
                    class: "Sorcerer",
                    level: 1,
                    background: "None",
                    playerName: "Alex",
                    faction: "Alliance",
                    race: "Human (Alternate)",
                    alignment: "Chaotic Good",
                    experiencePoints: 10000,
                    DCINumber: 0,
                    characterName: "Arswaw"
                },
                inspiration: "",
                proficiencyBonus: 0,
                savingThrows: {
                    strength: { proficient: false, plus: 0 },
                    dexterity: { proficient: false, plus: 0 },
                    constitution: { proficient: false, plus: 0 },
                    intelligence: { proficient: false, plus: 0 },
                    wisdom: { proficient: false, plus: 0 },
                    charisma: { proficient: false, plus: 0 }
                },
                skills: {
                    acrobatics: { proficient: false, plus: 0, augmentedBy: "dexterity" },
                    animalHandling: { proficient: false, plus: 0, augmentedBy: "wisdom" },
                    arcana: { proficient: false, plus: 0, augmentedBy: "int" },
                    athletics: { proficient: false, plus: 0, augmentedBy: "strength" },
                    deception: { proficient: false, plus: 0, augmentedBy: "charisma" },
                    history: { proficient: false, plus: 0, augmentedBy: "intelligence" },
                    insight: { proficient: false, plus: 0, augmentedBy: "wisdom" },
                    intimidation: { proficient: false, plus: 0, augmentedBy: "charisma" },
                    investigation: { proficient: false, plus: 0, augmentedBy: "intelligence" },
                    medicine: { proficient: false, plus: 0, augmentedBy: "wisdom" },
                    nature: { proficient: false, plus: 0, augmentedBy: "intelligence" },
                    perception: { proficient: false, plus: 0, augmentedBy: "wisdom" },
                    performance: { proficient: false, plus: 0, augmentedBy: "charisma" },
                    persuasion: { proficient: false, plus: 0, augmentedBy: "charisma" },
                    religion: { proficient: false, plus: 0, augmentedBy: "intelligence" },
                    sleightOfHand: { proficient: false, plus: 0, augmentedBy: "dexterity" },
                    stealth: { proficient: false, plus: 0, augmentedBy: "dexterity" },
                    survival: { proficient: false, plus: 0, augmentedBy: "wisdom" }
                },
                baseStats: {
                    strength: { base: 14, modifier: 3, label: "Strength" },
                    dexterity: { base: 16, modifier: 1, label: "Dexterity" },
                    constitution: { base: 8, modifier: 2, label: "Constitution" },
                    intelligence: { base: 12, modifier: 4, label: "Intelligence" },
                    wisdom: { base: 10, modifier: 1, label: "Wisdom" },
                    charisma: { base: 24, modifier: 2, label: "Charisma" }
                },
                gameState: {
                    armorClass: 1,
                    initiative: 0,
                    speed: 0,
                    hitPointMaximum: 0,
                    currentHitPoints: 0,
                    temporaryHitPoints: 0,
                    hitDice: 0,
                    deathSaves: {
                        successes: 0,
                        failures: 0
                    }
                },
                personalityTraits: [],
                ideals: [],
                bonds: [],
                flaws: [],
                attacksAndSpellcasting: {
                    spells: [
                        {
                            name: "",
                            attackBonus: 0,
                            damageType: ""
                        }
                    ],
                    list: []
                },
                passiveWisdomPerception: 0,
                otherProficienciesAndLanguages: [],
                equipment: {
                    money: {
                        cp: 0,
                        sp: 0,
                        ep: 0,
                        gp: 0,
                        pp: 0
                    },
                    list: []
                },
                featuresAndTraits: [],
                charCharacteristics: {
                    age: 0,
                    height: "",
                    weight: 0,
                    eyes: "",
                    skin: "",
                    hair: ""
                },
                characterAppearanceURI: "",
                alliesAndOrganizations: {
                    factionRank: "",
                    faction: "",
                    list: []
                },
                characterBackstory: [],
                additionalFeaturesAndTraits: [],
                treasure: {
                    totalNonConsumableMagicItems: 0,
                    list: []
                }
            })
        }
        catch (err) {
            console.error("There was an error retrieving queries", err)
        }
    }

character().then(() => {
    console.info("200 OK!")
})