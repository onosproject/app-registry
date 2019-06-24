
const fs = require('fs')
const path = require('path')
const signale = require('signale')

const testFolder = path.join(__dirname, "../jsons")
const existingFolder = path.join(__dirname, "../apps")

const allApps = []

fs.readdir(testFolder, (err, files) => {
    let passed = true
    if (err) { throw err }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
        const j = JSON.parse(fs.readFileSync(`${testFolder}/${files[i]}`, "utf8"))

        let v = j.versions['1.15.0']
        try{
            const otherApp = JSON.parse(fs.readFileSync(`${existingFolder}/${files[i]}`, "utf8"))
            if(otherApp.maintainter){
                otherApp.maintainer = otherApp.maintainter
                delete otherApp.maintainter
            }
            console.log(otherApp)
            otherApp.versions['1.15.0'] = v
            fs.writeFileSync(`${existingFolder}/${files[i]}`, JSON.stringify(otherApp, null, 4))
        }catch(err){
            console.log(err)
            fs.writeFileSync(`${existingFolder}/${files[i]}`, JSON.stringify(j, null, 4))
        }

    }
    if (passed) {
        signale.complete(`All ${files.length} files completed validation`)
    } else {
        signale.fatal("Files did not complete validation")
    }
})
