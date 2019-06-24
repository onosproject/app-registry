import chai from "chai"
import chaiHttp from "chai-http"
import * as fs from "fs"
import path from "path"
import { IApplication } from "../types/application"
chai.use(chaiHttp)
const should = chai.should()
import { doesNotReject } from "assert"
import app from "../app"
import { validateJSON } from "../scripts/validatejson"

const allApps: IApplication[] = JSON.parse(fs.readFileSync(path.join(__dirname, "../apps/all.json"), "utf8"))

describe("api/applications", () => {
  beforeEach((done) => {
    done()
  })

  describe("GET all", () => {
    it("it should GET all the books", (done) => {
      chai.request(app)
        .get("/api/applications")
        .end((err: Error, res: any) => {
          res.should.have.status(200)
          res.body.should.be.a("array")
          validateResponse(res)
          done()
        })
    })
  })

  allApps.forEach((onosApp) => {
    describe(`GET id=${onosApp.id}`, () => {
      it("should return valid id", (done) => {
        chai.request(app)
          .get(`/api/applications?id=${onosApp.id}`)
          .end((err: Error, res: any) => {
            res.should.have.status(200)
            res.body.should.be.a("array")
            res.body.length.should.be.eql(1)
            validateResponse(res)
            done()
          })
      })
    })
  })

  describe(`Test invalid app id`, () => {
    it("should return 400 error", (done) => {
      chai.request(app)
        .get(`/api/applications?id=sdklfjdskljfsldkjflk`)
        .end((err: Error, res: any) => {
          res.should.have.status(400)
          done()
        })
    })
  })
  describe(`Test version filtering`, () => {
    it("should return list of apps", (done) => {
      chai.request(app)
        .get(`/api/applications?onosVersion=2.1.0`)
        .end((err: Error, res: any) => {
          res.should.have.status(200)
          res.body.should.be.a("array")
          validateResponse(res)
          done()
        })
    })
  })

  describe(`Test invalid version`, () => {
    it("should return 400 error", (done) => {
      chai.request(app)
        .get(`/api/applications?onosVersion=sdklfjdskljfsldkjflk`)
        .end((err: Error, res: any) => {
          res.should.have.status(400)
          done()
        })
    })
  })

  describe(`Test /applications html page`, () => {
    it("should return html page", (done) => {
      chai.request(app)
        .get(`/applications`)
        .end((err: Error, res: any) => {
          res.should.have.status(200)
          done()
        })
    })
  })

})

function validateResponse(res: any) {
  res.body.forEach((element: IApplication) => {
    validateJSON(element)
  })
}
