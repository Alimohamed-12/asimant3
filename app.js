
// 1. Create an API that adds a new user to your users stored in a JSON file. (ensure that the email of the new user doesn’t exist before)(1
// Grades)
// o URL: POST /user
// query: ?name="ahmed"&age=20
// parms:user/:id


const expressModule=require("express");
const fs=require('node:fs/promises');
const path=require('node:path')

const app=expressModule();
const port=3000;
const fileURLToPath=path.resolve('json.js')

app.use(expressModule.json(),(req ,res , next)=>{
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
}); 

async function getUsers(){
  const data=await fs.readFile(fileURLToPath,{encoding:'utf8'})
  return JSON.parse(data);
}

 async function saveUsers(users){
  return await fs.writeFile(fileURLToPath, JSON.stringify(users, null, 2), { encoding: 'utf8' });
}

app.post("/user", async (req, res) => {
  const {name , email} = req.body;
  const users = await getUsers();
  const userExists = users.find(user => user.email === email);

  if (userExists) {
    return res.status(400).json({ error: "User with this email already exists" });
  }  
  
  const newUser = { id:Date.now().toString(), name, email };
  users.push(newUser);
  await saveUsers(users);
  res.json({ message: "User added" , user : newUser });
});

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.status(200).json(users);
  // return res.sendFile(fileURLToPath);
});

app.patch("/user/:userId", async (req, res) => {
   const {userId} =req.params;               
    const {name , email}= req.body;
    const users = await getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    if(email && users.some(user => user.email === email && user.id !== userId)) {
      return res.status(400).json({ error: "Email already exists has owner" });
    }
    if(name) users[userIndex].name = name;
    if(email) users[userIndex].email = email;
    await saveUsers(users);
    res.json({ message: "User updated" , user : users[userIndex] });
});

 app.delete("/user/:userId", async (req, res) => {
  const {userId} = req.params;
  const users = await getUsers();
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(userIndex, 1);
  await saveUsers(users);
  res.json({ message: "User deleted" });
});



app.get('/user/getByName', async (req, res) => {
const { name } = req.query;
const users = await getUsers();
const user = users.find(user => user.name === name);
if (!user) {
  return res.status(404).json({ error: "User not found" });
}
res.json({message:"user found",user});
});

app.get("/user/filter",async (req,res)=>{
const { minAge}= req.query;
const users =await getUsers();
const filteredUsers = users.filter(user => parseInt(user.age) <= parseInt(minAge));

if (filteredUsers.length === 0) {
  return res.status(404).json({ error: "No users found with the specified age criteria" });
}
res.json({message:"filtered users",users:filteredUsers});

})

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
