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
    // console.log(node_data);
    node_data.forEach(element => {
        // console.log(element.title.text);
        const nodeText = element.title.text;
        const nodeDate = element.title.date;
        const nodeContentText = element.title.content.text;
        const nodeContentImg = element.title.content.img;
        const textTemplate = `<div class="node-container"><h3>${nodeText}, ${nodeDate}</h3></div><div class="content-container">${nodeContentText}</div>`;
        $('#data').append(textTemplate);
    });
    $('.node-container').on("click", nodeContainerButton);
}

function addStatus(node_data) {
    const currentDate = new Date;
    const dummyDate = Date.parse('25 Jan 2024 00:00:00 GMT+0800');
    console.log(currentDate);
    console.log(Date.parse(currentDate));
    console.log(dummyDate);
    const statusTemplate = `<div id="status" class="status-container"></div>`
    $('#data').append(statusTemplate);
    const totalDays = node_data.length
    const finalDate = node_data[totalDays-1].date;
    console.log(Date.parse(finalDate));
    console.log(Date.parse(currentDate));
    console.log(Date.parse(finalDate)-Date.parse(currentDate));
    // const statusTextSummary = `<<h3>${daysRemaining} Days Remaining</h3>`;
    $('#status').append()
    node_data.forEach(element => {
        const count = element.node + 1;
        const statusBox = `<div class="box-${count}"></div>`;
        $('#status').append(statusBox);
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