import { IApplication, IApplicationVersionListing } from "../types/application"
import signale from 'signale'
import { validateJSON } from './validatejson'
const fs = require('fs')
const path = require('path')
const testFolder = path.join(__dirname, '../apps')

let allApps: IApplication[] = []

fs.readdir(testFolder, (err: Error, files: string[]) => {
    let passed = true
    if (err) throw err
    for (let i = 0; i < files.length; i++) {
        let j: IApplication = JSON.parse(fs.readFileSync(`${testFolder}/${files[i]}`, 'utf8'))
        try {
            validateJSON(j)
        } catch (err) {
            signale.error(err)
            passed = false
        }
        allApps.push(j)
    }

    fs.open(`${testFolder}/all.json`, 'w', function (err: Error, dir: String) {
        if (err) throw err
        fs.writeFileSync(`${testFolder}/all.json`, JSON.stringify(allApps, null, 4))
    });
    if (passed) {
        signale.complete(`All ${files.length} files completed validation`)
    } else {
        signale.fatal('Files did not complete validation')
    }
})


