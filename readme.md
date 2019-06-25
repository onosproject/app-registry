[![Build Status](https://travis-ci.org/onosproject/app-registry.svg?branch=master)](https://travis-ci.org/onosproject/app-registry)

# App Registry

  - Hosts API and Portal for ONOS and µONOS applications
  - View applications at http://api.onosproject.org:8080/applications
 
# QuickStart
```
git clone https://github.com/onosproject/app-registry
cd app-registry
npm install
npm start
```

# API Doc
**GET** `/api/applications` - Returns a list of all applications

Query strings:

| Name      | Description | Example | Optional |
| ----------- | ----------- | ----------- | ------- |
| id      | App ID  | org.onosproject.drivers.arista | true |
| onosVersion   | Compatible ONOS version number        | 2.1.0 | true |

On Success:
`200 OK` 
```js
[
    {
        "category": "Security",
        "title": "Access Control Lists",
        "url": "http://onosproject.org",
        "maintainer": "ONF",
        "repo": "https://github.com/opennetworkinglab/onos",
        "readme": "https://github.com/opennetworkinglab/onos/tree/master/apps/acl/README.md",
        "versions": {
            "2.0.0": {
                "oarURL": "http://repo1.maven.org/maven2/org/onosproject/onos-apps-acl-oar/2.0.0/onos-apps-acl-oar-2.0.0.oar",
                "onosVersion": "2.0.0"
            },
            "2.1.0": {
                "oarURL": "http://repo1.maven.org/maven2/org/onosproject/onos-apps-acl-oar/2.1.0/onos-apps-acl-oar-2.1.0.oar",
                "onosVersion": "2.1.0"
            }
        },
        "id": "org.onosproject.acl",
        "author": "ONOS Community"
    },
    {
        "category": "Monitoring",
        "title": "Artemis",
        "url": "http://onosproject.org",
        "maintainer": "ONF",
        "repo": "https://github.com/opennetworkinglab/onos",
        "readme": "https://github.com/opennetworkinglab/onos/tree/master/apps/artemis/README.md",
        "versions": {
            "2.0.0": {
                "oarURL": "http://repo1.maven.org/maven2/org/onosproject/onos-apps-artemis-oar/2.0.0/onos-apps-artemis-oar-2.0.0.oar",
                "onosVersion": "2.0.0"
            },
            "2.1.0": {
                "oarURL": "http://repo1.maven.org/maven2/org/onosproject/onos-apps-artemis-oar/2.1.0/onos-apps-artemis-oar-2.1.0.oar",
                "onosVersion": "2.1.0"
            }
        },
        "id": "org.onosproject.artemis",
        "author": "ONOS Community"
    }
]
```

On no query match:
`400 BAD REQUEST`
```js
{
"error": "No applications found supporting version {version}"
}
```
or
```js
{
"error": "No applications found for id {id}"
}
```

Unknown error:
`500 INTERNAL SERVER ERROR`

