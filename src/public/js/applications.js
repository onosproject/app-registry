// @ts-nocheck
async function getApplications(version) {
    return (await axios.get(`/api/applications?onosVersion=${version}`));
}
function buildOarHTML(versions) {
    let desiredVersion = $("#version-select").find(":selected").val();
    let html = "";
    for (let vkey in versions) {
        let version = versions[vkey];
        if (version.onosVersion === desiredVersion || desiredVersion === "") {
            html += `<a href=${version.oarURL}>v${vkey} - ONOS v${version.onosVersion}</a><br>`;
        }
    }
    return html;
}
function renderRow(app) {
    return (`
    <tr>
        <td><a href=${app.url}>${app.title}</a></td>
        <td>${app.category}</td>
        <td>${app.author}</td>
        <td>${buildOarHTML(app.versions)}</td>
        <td>${app.id}</td>
    </tr>
    `);
}

async function renderTable(res) {

        $("#apps-table").html(`
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
            .sort((a, b) => {
                return (a.title > b.title) ? 1 : -1;

            })
            .map(x => renderRow(x))
            .join()
        }
        `);
}

function renderDropdown(res) {
    let allVersions = [];
    res.data.forEach(app => {
        Object.values(app.versions).forEach(version => {
            allVersions.push(version.onosVersion);
        });
    });
    let menuVersions = _.uniq( allVersions).sort();

    $("#version-select").html(() => {

        return (
            [`<option value="">*</option>`] + menuVersions.map(x => `<option value="${x}">${x}</option>`).join("\n")
        );
    });
}

$(document).ready(function() {
    $("#version-select").val("");
    getApplications($("#version-select").find(":selected").val()).then(data => {
        renderTable(data);
        renderDropdown(data);
    });

    $("#version-select").on("change", () => {
        getApplications($("#version-select").find(":selected").val()).then(data => {
            renderTable(data);
        });
    });
} );
