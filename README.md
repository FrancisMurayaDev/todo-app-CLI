# 🚀 Building a CLI Todo App with Node.js, Prisma, and PostgreSQL! 📝

Just wrapped up an exciting Command Line Interface (CLI) Todo App using Node.js, Commander.js, Prisma, and PostgreSQL! This project deepened my understanding of backend logic beyond traditional web applications.

🔥 Key Features:

✅ Add todos with a title, description, and status (todo, inprogress, complete)

✅ Update, delete, and read todos right from the terminal

✅ Uses Prisma ORM for seamless database interactions

✅ Prisma Studio for an intuitive visual database editor

✅ Simple and efficient command-line experience

⚙️ Some handy commands to use:
📌 Add a new task:

```
node index.js addTodo -t "Learn Node.js" -d "Study CLI apps" -s todo
```
📌 Read all tasks:

```
node index.js readTodos
```

📌 Update a task’s status:

```
node index.js updateTodo -i <todo_id> -s inprogress
```

📌 Delete a specific task:

```
node index.js deleteTodo -i <todo_id>
```

📌 Delete all todos (with confirmation prompt):

```
node index.js deleteAllTodos
```

📌 See all available commands:

```
node index.js --help
```

📌 Open Prisma Studio (GUI to view & manage the database):

```
npx prisma studio
```


With Prisma Studio, I can visually inspect, edit, and manage todos in the database without writing queries manually—making debugging and testing a breeze!


This project has been a game-changer for me in Node.js CLI development, Prisma ORM, and PostgreSQL database management. Excited to keep building and learning!
