// DOM Manipulation

const htmlMap = `
<header class="it-header">
  <h1>Phillipines 2024</h1>
</header>
<div id="data" class="main-container">

</div>
`;

function clearPage() {
    // console.log('clearPage');
    $('#app').empty();
}

function nodeContainerButton() {
    $(this).next().toggle();
}

function addContent(node_data) {
    const currentDate = new Date;
    currentDate.setHours(0, 0, 0, 0);
    node_data.forEach(element => {
        const nodeText = element.title.text;
        const nodeDate = element.title.date;
        const nodeContentText = element.title.content.text;
        if (Date.parse(element.date) === Date.parse(currentDate)) {
            const textTemplate = `<div class="node-container current"><h3>${nodeText}, ${nodeDate}</h3></div><div class="content-container">${nodeContentText}</div>`;
            $('#data').append(textTemplate);
        } else {
            const textTemplate = `<div class="node-container"><h3>${nodeText}, ${nodeDate}</h3></div><div class="content-container">${nodeContentText}</div>`;
            $('#data').append(textTemplate);
        }
    });
    $('.node-container').on("click", nodeContainerButton);
}

function addStatus(node_data) {
    const currentDate = new Date;
    currentDate.setHours(0, 0, 0, 0);
    // console.log(Date.parse(currentDate));
    // console.log(Date.parse(node_data[2].date))
    const totalDays = node_data.length
    const finalDate = node_data[totalDays-1].date;
    const calcDaysRemaining = Math.floor((Date.parse(finalDate)-Date.parse(currentDate))/86400000);
    const statusSummary = `<h3 class="status-summary">${calcDaysRemaining} Days Remaining</h3>`;
    $('#data').append(statusSummary);

    const statusTemplate = `<div id="status" class="status-container"></div>`
    $('#data').append(statusTemplate);

    node_data.forEach(element => {
        const count = element.node + 1;
        if (Date.parse(element.date) < Date.parse(currentDate)) {
            // console.log("this date is in the past");
            const statusBox = `<div class="box-past-${count}"></div>`;
            $('#status').append(statusBox);
        }
        if (Date.parse(element.date) === Date.parse(currentDate)) {
            // console.log("yes!");
            const statusBox = `<div class="box-present-${count}"></div>`;
            $('#status').append(statusBox);
        }
        if (Date.parse(element.date) > Date.parse(currentDate)) {
            // console.log("this date is in the future");
            const statusBox = `<div class="box-future-${count}"></div>`;
            $('#status').append(statusBox);
        }
    })
}

function buildLayout(state) {
    if (state === "itinerary") {
        document.querySelector('#app').innerHTML = htmlMap;
    }
}

function render(state, node_data) {
    clearPage();
    buildLayout(state.page);
    addStatus(node_data);
    addContent(node_data);
  }

// State Manipulation

const initialState = { random: "ph2024", page: "itinerary" };

function getState() {
    return JSON.parse(localStorage.getItem("ph2024"));
}

// Initialise

render(getState() || initialState, nodes);