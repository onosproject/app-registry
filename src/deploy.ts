import bodyParser from "body-parser"
import * as cp from "child_process"
import express from "express"
import shell from "shelljs"
import signale from "signale"
import { argv } from "yargs"

const testMode = Boolean(argv.test)
const port = process.env.DEPLOY_PORT || 8081

let app: cp.ChildProcess

const launchApp = () => {
    app = cp.fork("./build/app.js", [String(testMode)])
    signale.info("Started app")
}

const killApp = () => {
// tslint:disable-next-line: no-unused-expression
    app && app.kill("SIGINT")
    signale.info("Killed app")
}

const productionServer = () => {
// tslint:disable-next-line: no-shadowed-variable
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.post("/payload", async (req, res) => {
        res.json({ status: "Push received" })
        signale.info("GIT PUSH DETECTED")
        const branch = req.body.ref
        const changelogString = req.body.commits
            ? req.body.commits
                  .map(
                      (x: any) =>
                          `<${x.url}|${x.message}> - ${x.committer.username}`,
                  )
                  .join("\n")
            : ""
        signale.info("Git push from branch " + branch)

        if (branch && branch.includes("master")) {
            try {
                signale.info("MASTER BRANCH DETECTED")
                signale.await("Pulling from git...")
                shell.exec("git pull")
                signale.await("Installing dependencies...")
                shell.exec("npm install")
                signale.await("Auditing dependencies...")
                shell.exec("npm audit fix")
                signale.await("Building project...")
                shell.exec("npm run build")
                signale.success("App ready for deployment")
                killApp()
                launchApp()
            } catch (err) {
                signale.error(err)
            }
        }
    })

    app.listen(port, () => {
        launchApp()
        signale.info(`Autodeploy server running on port ${port}`)
    })
}

productionServer()

process.on("SIGINT", () => {
    killApp()
    process.exit()
})
