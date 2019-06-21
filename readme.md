# App Registry

  - Hosts API and Portal for ONOS and µONOS applications
 
# QuickStart
```
git clone https://github/com/onosproject/app-regsitry
npm install
npm start
```

# API Doc
**GET** `/api/applications` - Returns a list of all applications

Query strings:
| Name      | Description | Example | Optional |
| ----------- | ----------- | ----------- | ------- |
| id      | App ID  | org.onosproject.drivers.arista | true |
| version   | Compatible ONOS version number        | 2.1.0 | true |

On Success:
`200 OK` 
```
[  
   {  
      "category":"Drivers",
      "title":"Arista Drivers",
      "url":"http://onosproject.org",
      "maintainer":"ONF",
      "repo":"https://github.com/opennetworkinglab/onos",
      "readme":"https://github.com/opennetworkinglab/onos/tree/master/drivers/arista/README.md",
      "versions":{  
         "2.0.0":{  
            "version":"2.0.0",
            "oarURL":"http://repo1.maven.org/maven2/org/onosproject/onos-drivers-arista-oar/2.0.0/onos-drivers-arista-oar-2.0.0.oar"
         },
         "2.1.0":{  
            "version":"2.1.0",
            "oarURL":"http://repo1.maven.org/maven2/org/onosproject/onos-drivers-arista-oar/2.1.0/onos-drivers-arista-oar-2.1.0.oar"
         }
      },
      "id":"org.onosproject.drivers.arista",
      "author":"ONOS Community"
   },
   {  
      "category":"Drivers",
      "title":"Polatis Device Drivers",
      "url":"http://www.polatis.com",
      "maintainer":"ONF",
      "repo":"https://github.com/opennetworkinglab/onos",
      "readme":"https://github.com/opennetworkinglab/onos/tree/master/drivers/polatis/netconf/README.md",
      "versions":{  
         "2.0.0":{  
            "version":"2.0.0",
            "oarURL":"http://repo1.maven.org/maven2/org/onosproject/onos-drivers-polatis-netconf-oar/2.0.0/onos-drivers-polatis-netconf-oar-2.0.0.oar"
         },
         "2.1.0":{  
            "version":"2.1.0",
            "oarURL":"http://repo1.maven.org/maven2/org/onosproject/onos-drivers-polatis-netconf-oar/2.1.0/onos-drivers-polatis-netconf-oar-2.1.0.oar"
         }
      },
      "id":"org.onosproject.drivers.polatis.netconf",
      "author":"ONOS Community"
   }
]
```

On no query match:
`400 BAD REQUEST`
```
{
"error": "No applications found supporting version {version}"
}
```
or
```
{
"error": "No applications found for id {id}"
}
```

Unknown error:
`500 INTERNAL SERVER ERROR`

