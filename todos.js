import { PrismaClient } from "@prisma/client";
import chalk from "chalk";
import readline from "readline";

const prisma = new PrismaClient();
const validStatuses = ["todo", "inprogress", "complete"];

export async function addTodo(options) {
  const { title, description, status } = options;

  if (!title || !description || !status) {
    console.log(chalk.red("Error: All fields are required!"));
    return;
  }

  if (!validStatuses.includes(status.toLowerCase())) {
    console.log(
      chalk.red('Error: Status must be "todo", "inprogress", or "complete"!'),
    );
    return;
  }

  const newTodo = await prisma.todo.create({
    data: { title, description, status },
  });
  console.log(
    chalk.green(
      `Todo added: ${newTodo.title} - ${newTodo.description} [${newTodo.status}]`,
    ),
  );
}

export async function updateTodo(options) {
  const { id, title, description, status } = options;

  if (!id) {
    console.log(chalk.red("Error: Todo ID is required!"));
    return;
  }

  if (status && !validStatuses.includes(status.toLowerCase())) {
    console.log(chalk.red("Error: Invalid status!"));
    return;
  }

  await prisma.todo.update({
    where: { id },
    data: { title, description, status },
  });
  console.log(chalk.yellow("Todo updated!"));
}

export async function readTodos(options) {
  if (options.id) {
    const todo = await prisma.todo.findUnique({ where: { id: options.id } });
    if (!todo) {
      console.log(chalk.red("Todo not found!"));
      return;
    }
    console.log(
      chalk.blue(`${todo.title} - ${todo.description} [${todo.status}]`),
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

export async function deleteTodo(options) {
  await prisma.todo.delete({ where: { id: options.id } });
  console.log(chalk.red("Todo deleted!"));
}

export async function deleteAllTodos() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(chalk.red("Are you sure? (yes/no): "), async (answer) => {
    if (answer.toLowerCase() === "yes") {
      await prisma.todo.deleteMany();
      console.log(chalk.red("All todos deleted!"));
    } else {
      console.log(chalk.blue("Operation cancelled."));
    }
    rl.close();
  });
}
