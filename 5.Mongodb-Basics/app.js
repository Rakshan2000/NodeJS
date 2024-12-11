const mongoose = require("mongoose");

mongoose
.connect("mongodb+srv://ckrakshan11:ckrakshan11@cluster0.f8tj9.mongodb.net/")
.then(()=>console.log("database connected successfully"))
.catch((e) => console.log(e));

const schema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number,
    isActive : Boolean,
    tags : [String],
    createdAt : {type : Date, default : Date.now}
})

//Create user Model

const User = mongoose.model('User',schema);

async function runQueryExamples() {
    try{

        //create new document

        //Type 1
        // -------------------------------
        const newUser = await User.create({
            name : 'Prof. Shyam',
            email : 'ShyamPokemon@gmail.com',
            age : '65',
            isActive : false,
            tags : ['Professor']
        });

        //Type 2
        // const newUser = new User({
        //     name : 'Rohan C K',
        //     email : 'ckrohan11@gmail.com',
        //     age : '34',
        //     isActive : true,
        //     tags : ['Programmer']
        // })
        // await newUser.save();

        console.log('Created new user',newUser);

        // const allUsers = await User.find();
        // console.log(allUsers);

        //Find user by paticular feild

        // const getUserOfActiveFalse = await User.find({isActive : false});
        // console.log(getUserOfActiveFalse);

        const getUserById = await User.findById(newUser._id);
        console.log(getUserById,"GetUserByID");

    }catch(e){
        console.log('Error ->',e);
    }finally{
        await mongoose.connection.close();
    }
}

runQueryExamples();