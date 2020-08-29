console.log('This is js page of our project 7');
// Utility function
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
// Initialising the paramsCount variable
let paramsCount = 0

let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = "none";

let requestJsonBox = document.getElementById('requestJsonBox');

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    parametersBox.style.display = "none";
    requestJsonBox.style.display = "block"
})

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    parametersBox.style.display = "block";
    requestJsonBox.style.display = "none"
})

let addParam = document.getElementById("addParam");
let params = document.getElementById('params');
addParam.addEventListener('click', () => {
    let string = `<div class="form-row my-2">
                      <label for="parameters" class="col-sm-2 col-form-label">Parameter ${paramsCount + 2}</label>
                      <div class="col-md-4">
                          <input type="text" class="form-control" id="parameterKey${paramsCount + 2}" placeholder="Enter Parameter ${paramsCount + 2} Key">
                      </div>
                      <div class="col-md-4">
                          <input type="text" class="form-control" id="parameterValue${paramsCount + 2}" placeholder="Enter Parameter ${paramsCount + 2} Value">
                      </div>
                      <button class="btn btn-primary deleteParam"> - </button>
                  </div>`
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    paramsCount++;

    let deleteParam = document.getElementsByClassName("deleteParam");
    for (let item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
})

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    if (contentType === 'params') {
        data = {};
        for (let i = 0; i < paramsCount + 1; i++) {
            let key = document.getElementById('parameterKey' + (i + 1)).value;
            let value = document.getElementById('parameterValue' + (i + 1)).value;
            data[key] = value;
        }
        data = JSON.stringify(data);

    }
    else {
        data = document.getElementById('requestJsonText').value;


    }

    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json ; charset=UTF-8'
            }
        }).then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    }
})