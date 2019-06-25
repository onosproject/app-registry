// @ts-nocheck
async function getApplications(version){
    return (await axios.get(`/api/applications?onosVersion=${version}`))
}
function buildOarHTML(versions){
    let html = ''
    for(let vkey in versions){
        let version = versions[vkey]
        html += `<a href=${version.oarURL}>v${vkey} - ONOS v${version.onosVersion}</a><br>`
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

async function renderTable(){
    await getApplications($('#version-select').find(':selected').text()).then(res => {
        $('#apps-table').html(`
        <thead>
        <tr>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Author</th>
            <th scope="col">Downloads</th>
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
    $('#version-select').on('change', () => {
        renderTable()
    })
   renderTable()
} );

