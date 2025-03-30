import { Command } from "commander";

const program = new Command();
program.name ("todo-cli-app")
program.version ("1.0.0")
program.description ("Todo app using CLI, prisma and postgres")

program.command("addTodo").action(
  function () {
    console.log('ADDING A TODO!')
  }
)

program.parse(process.argv);