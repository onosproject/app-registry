import fs from "fs"
import path from "path"
import signale from "signale"
import { IApplication } from "../types/application"
import { validateJSON } from "./validatejson"
const testFolder = path.join(__dirname, "../apps")

const allApps: IApplication[] = []

fs.readdir(testFolder, (err, files: string[]) => {
    let passed = true
    if (err) { throw err }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
        const j: IApplication = JSON.parse(fs.readFileSync(`${testFolder}/${files[i]}`, "utf8"))
        try {
            validateJSON(j)
        } catch (err) {
            signale.error(err)
            passed = false
        }
        allApps.push(j)
    }

    fs.open(`${testFolder}/all.json`, "w", (error, fd) => {
        if (error) { throw error }
        fs.writeFileSync(`${testFolder}/all.json`, JSON.stringify(allApps, null, 4))
    })
    if (passed) {
        signale.complete(`All ${files.length} files completed validation`)
    } else {
        signale.fatal("Files did not complete validation")
    }
})
