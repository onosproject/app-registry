// @ts-nocheck
async function getApplications(){
    return (await axios.get('/api/applications'))
}
function buildOarHTML(versions){
    let html = ''
    for(let vkey in versions){
        let version = versions[vkey]
        html += `<a href=${version.oarURL}>${vkey}</a>\n`
    }
    return html
}
function renderRow(app){
    return (`
    <tr>
        <td><a href=${app.url}>${app.title}</a></td>
        <td>${app.category}</td>
        <td>${app.author}</td>
        <td>${buildOarHTML(app.versions)}</td>
        <td>${app.id}</td>
    </tr>
    `)
}

async function renderTable(response){
    await getApplications().then(res => {
        $('#apps-table').html(`
        <thead>
        <tr>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Author</th>
            <th scope="col">OAR</th>
            <th scope="col">id</th>
        </tr>
        </thead>
        ${res.data
            .sort((a,b) => {
                return (a.title > b.title) ? 1 : -1

            })
            .map(x => renderRow(x))
            .join()
        }
        `)
    })
}

$(document).ready(function() {
   renderTable()
} );

