var mongodb = require('../info/mongodb')
var User = require('../models/users')


async function test_insert_data() {
    await mongodb.waitForDbConnection();

    let user1 = new User({
        email: "test@gmail.com",
        password: "onlyfortesting",
        name: "Test",
        salt: Date.now()
    });
    await user1.save();

    let user2 = new User({
        email: "test02@gmail.com",
        password: "onlyfortesting02",
        name: "Test02",
        salt: Date.now()
    });

    await user2.save();
    console.log("Save data success");
}
test_insert_data();


async function test_update_data() {
    await mongodb.waitForDbConnection();

    await User.updateOne(
        {email: "test@gmail.com"}, 
        {$set: {email: "test01@gmail.com", password: "onlyfortesting01", name: "Test01"}}
    )
    
    console.log("Update data success"); 
} 
test_update_data();


async function test_delete_data() {
    await mongodb.waitForDbConnection();

    await User.deleteOne({email: "test02@gmail.com"});
    
    console.log("Delete data success"); 
} 
test_delete_data();