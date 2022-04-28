import { name, version } from "../info.ts";
import { red } from "./color/colors.ts";

const lowerCaseName = name.toLowerCase();

export function offLine() {
  throw new Error(
    `${red(
      "error"
    )} something went wrong, maybe you're offline, check your connection.`
  ).message;
}

export async function update(): Promise<void> {
  // * get the version of the repo in github
  const response = (await fetch(
    `https://api.github.com/repos/crewdevio/${name}/releases/latest`
  ).catch(() => offLine())) as Response;

  // * get the latest release
  const repoVersion = (await response.json()) as { tag_name: string };

  const isCanary = Deno.args[1] === "--canary";

  if (repoVersion.tag_name !== version || isCanary) {
    setTimeout(async () => {
      await exec(
        `deno install -f -r -A --import-map=https://deno.land/x/${lowerCaseName}/import_map.json -n ${lowerCaseName} --no-check https://deno.land/x/${lowerCaseName}/cli.ts`
      );

      console.log(
        red(`${name} ${red(repoVersion.tag_name)} is now installed.`)
      );
    }, 1000);
  } else {
    console.log(
      red(`you have the last version ${name} ${repoVersion.tag_name}`)
    );
  }
}

function installTools(args: string[]) {
  return Deno.run({ cmd: args, stdout: "piped" });
}

/**
 * install script from database.json
 */
export default async function exec(command: string): Promise<boolean> {
  const args = command.split(" ");
  const app: Deno.Process = installTools(args);
  const response = (await app.status()).success;

  if (!response) {
    `${red("error")}: something went wrong in the installation`;
    app.close();
  }

  app.close();

  return response;
}
