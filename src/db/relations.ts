import Character from "./models/character"
import Classes from "./models/classes"
import Race from "./models/races"
import Source from "./models/sources"
import User from "./models/user"

export const initRelations = () => {
    Character.hasMany(Classes) //each character can have many classes (looking at you, multi classing)
    Classes.belongsToMany(Character, {through: "Chars_Class"}) //each class can be assigned to multiple chars
    
    Character.hasOne(Race)
    Race.belongsToMany(Classes, {through: "Chars_Race"})

    Character.hasOne(User)
    User.hasMany(Character)

    Classes.belongsTo(Source)
    Source.hasMany(Classes)

    Race.belongsTo(Source)
    Source.hasMany(Race)


// Material.belongsTo(User)
// User.hasMany(Material)

// EventM.belongsTo(User)
// User.hasMany(EventM)

// EventM.belongsTo(Class, {targetKey: "class_id"})
// Class.hasMany(EventM)

// Class.belongsToMany(User, {through: "Students_Classes"})
// User.belongsToMany(Class, {through: "Students_Classes"})

// Homework.belongsTo(EventM)
// EventM.hasMany(Homework)

// Class.hasMany(Section)
// Section.belongsTo(Class)

// Todo.belongsTo(User)
// User.hasMany(Todo)
}