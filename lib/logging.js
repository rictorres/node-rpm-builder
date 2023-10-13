import chalk from "chalk";
import * as util from "util";

export default function() {
  let msg = util.format.apply(null, arguments);

  if (!process.stdout.isTTY) {
    msg = chalk.stripColor(msg);
  }

  process.stdout.write(msg + '\n');
}
