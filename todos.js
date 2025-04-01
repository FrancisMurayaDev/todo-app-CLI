import { PrismaClient } from "@prisma/client";
import chalk from "chalk";
import readline from "readline";

const prisma = new PrismaClient();
const validStatuses = ["todo", "inprogress", "complete"];

export async function addTodo({ title, description, status }) {
  if (!title || !description || !status) {
    console.log(chalk.bgRed("Error: All fields are required!"));
    return;
  }

  if (!validStatuses.includes(status.toLowerCase())) {
    console.log(
      chalk.bgRed('Error: Status must be "todo", "inprogress", or "complete"!'),
    );
    return;
  }

  const newTodo = await prisma.todo.create({
    data: { title, description, status: status.toUpperCase() },
  });
  console.log(
    chalk.bgGreen(
      `Todo added: ${newTodo.title} - ${newTodo.description} [${newTodo.status}]`,
    ),
  );
}

export async function updateTodo({ id, title, description, status }) {
  if (!id) {
    console.log(chalk.bgRed("Error: Todo ID is required!"));
    return;
  }

  if (status && !validStatuses.includes(status.toLowerCase())) {
    console.log(chalk.bgRed("Error: Invalid status!"));
    return;
  }

  await prisma.todo.update({
    where: { id },
    data: {
      title,
      description,
      status: status ? status.toUpperCase() : undefined,
    },
  });
  console.log(chalk.bgYellow("Todo updated!"));
}

export async function readTodos({ id }) {
  if (id) {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      console.log(chalk.bgRed("Todo not found!"));
      return;
    }
    console.log(
      chalk.bgBlue(`${todo.title} - ${todo.description} [${todo.status}]`),
    );
  } else {
    const todos = await prisma.todo.findMany();
    todos.forEach((todo) => {
      console.log(
        `${chalk.magenta(todo.id)} - ${todo.title} - ${todo.description} [${todo.status}]`,
      );
    });
  }
}

export async function deleteTodo({ id }) {
  if (!id) {
    console.log(chalk.bgRed("Error: Todo ID is required!"));
    return;
  }
  await prisma.todo.delete({ where: { id } });
  console.log(chalk.bgRed("Todo deleted!"));
}

export async function deleteAllTodos() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(chalk.bgRed("Are you sure? (yes/no): "), async (answer) => {
    if (answer.toLowerCase() === "yes") {
      await prisma.todo.deleteMany();
      console.log(chalk.bgRedBrighted("All todos deleted!"));
    } else {
      console.log(chalk.bgBlue("Operation cancelled."));
    }
    rl.close();
  });
}
