// var data_arr = [];

// let osData = {};
// let ramData = {};
// let diskData = {};

// async function run() {
//     event.preventDefault();
//     loadIP_Search();
// }


// function loadIP_Search() {
//     let range_ip = document.getElementById("ipRangeInput").value;
//     var tableBody = document.getElementById("tableBody");
//     if (tableBody.innerHTML !== "") {
//         tableBody.innerHTML = "";
//     }
//     var range = range_ip.split("-");
//     var start_ip = range[0];
//     var end_ip = range[1];
//     var start_ip_arr = start_ip.split(".");
//     var end_ip_arr = end_ip.split(".");
//     var start_ip_num = parseInt(start_ip_arr[3]);
//     var end_ip_num = parseInt(end_ip_arr[3]);
//     if(end_ip_arr<1 || end_ip_num >255 ) {
//         alert("Vui long nhap trong khoang 1-255")
//         return
//     } 
//     console.log("Start IP: " + start_ip_num);
//     console.log("End IP: " + end_ip_num);
//     for (let i = 1; i <= 4; i++) {
//         fetch(`src/data/40${i}.json`)
//             .then(response => response.json())
//             .then(data => {
//                 function renderHtmlForRowTools(path,type) {
//                     path = '"' + path + '"'
//                     console.log("OOO: " + path)
//                     path = path.replace(/\\/g, "//")
//                     console.log(path)
//                     let tempHtml = [
//                         "<button onclick='update(" +path +")'><i class='fas fa-download'></i></button>",
//                         "<button onclick='stop(" +path + ")'><i class='fas fa-download'></i></button>",
//                         "<button onclick='restart(" + path + ")'><i class='fas fa-download'></i></button>",
//                     ]
//                     return tempHtml[type];
//                 }

//                 for (let j = 0; j < data.length; j++) {
//                     data_arr.push(data[j]);
//                     let ip_arr = data[j].ip;
//                     console.log("IP: " + ip_arr);
//                     let _ip_arr = ip_arr.split(".");
//                     let ip_num = parseInt(_ip_arr[3]);
//                     console.log("Checking IP: " + ip_num);
//                     if (ip_num >= start_ip_num && ip_num <= end_ip_num) {
//                         const row = document.createElement('tr');
//                         row.classList.add('highlight-row');

//                         row.innerHTML = `
//                             <td>${data[j].id}</td>
//                             <td>${data[j].name}</td>
//                             <td>${data[j].ip}</td>
//                             <td>${data[j].room}</td>
//                             <td>${data[j].os}</td>
//                             <td>${renderHtmlForRowTools(data[j].path, 2)}</td> 
//                             <td>${renderHtmlForRowTools(data[j].path, 1)}</td> 
//                             <td>${renderHtmlForRowTools(data[j].path,0)}</td>
//                             `;

//                         tableBody.appendChild(row);
//                     }

//                 }
//             });

//     }
// }

// async function stop(path) {
//     console.log(path)
//     event.preventDefault();
//     await fetch("src/remote/stop.py", {
//         method: "PUT",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             'path' : path,
//         })
//     })
//         .then(response => {
//             return response.text()
//         })
//         .then(data => {
//             console.log(data)
//             if (data === "SC") {
//                 alert("Tắt thành công " + " cho máy ")
//             } else {
//                 alert("Tắt thất bại " + " cho máy ")
//             }
//         })
// }

// async function update(path) {
//     event.preventDefault();
//     await fetch("src/remote/update.py", {
//         method: "PUT",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             'path'  : path,
//         })
//     })
//         .then(response => {
//             return response.text()
//         })
//         .then(data => {
//             console.log(data)
//             if (data === "SC") {
//                 alert("Cập nhật thành công " + " cho máy " + path)
//             } else {
//                 alert("Cập nhật thất bại " + " cho máy " + path)
//             }
//         })
// }

// async function restart(path) {
//     console.log(path);
//     event.preventDefault();
//     await fetch("src/remote/restart.py", {
//         method: "PUT",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             'path' : path,
//         })
//     })
//         .then(response => {
//             return response.text()
//         })
//         .then(data => {
//             console.log(data)
//             if (data === "SC") {
//                 alert("Khởi động thành công " + " cho máy " + path)
//             } else {
//                 alert("Khởi động thất bại " + " cho máy " + path)
//             }
//         })
// }


var data_arr = [];

let osData = {};
let ramData = {};
let diskData = {};

async function run() {
    event.preventDefault();
    loadIP_Search();
}

function ipToNumber(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
}

function isIPInRange(ip, startIP, endIP) {
    const ipArr = ip.split('.').map(Number);
    const startArr = startIP.split('.').map(Number);
    const endArr = endIP.split('.').map(Number);
    
    for (let i = 0; i < 4; i++) {
        if (ipArr[i] < startArr[i] || ipArr[i] > endArr[i]) {
            return false;
        }
    }
    return true;
}

function loadIP_Search() {
    let range_ip = document.getElementById("ipRangeInput").value;
    var tableBody = document.getElementById("tableBody");
    if (tableBody.innerHTML !== "") {
        tableBody.innerHTML = "";
    }
    var range = range_ip.split("-");
    var start_ip = range[0].trim();
    var end_ip = range[1].trim();

    var start_ip_num = ipToNumber(start_ip);
    var end_ip_num = ipToNumber(end_ip);


    console.log("Start IP: " + start_ip);
    console.log("End IP: " + end_ip);

    let found = false;

    for (let i = 1; i <= 4; i++) {
        fetch(`src/data/40${i}.json`)
            .then(response => response.json())
            .then(data => {
                function renderHtmlForRowTools(path, type) {
                    path = '"' + path + '"';
                    console.log("OOO: " + path);
                    path = path.replace(/\\/g, "//");
                    console.log(path);
                    let tempHtml = [
                        "<button onclick='update(" + path + ")'><i class='fas fa-download'></i></button>",
                        "<button onclick='stop(" + path + ")'><i class='fas fa-download'></i></button>",
                        "<button onclick='restart(" + path + ")'><i class='fas fa-download'></i></button>",
                    ];
                    return tempHtml[type];
                }

                for (let j = 0; j < data.length; j++) {
                    data_arr.push(data[j]);
                    let ip_arr = data[j].ip;
                    console.log("IP: " + ip_arr);
                    
                    if (isIPInRange(ip_arr, start_ip, end_ip)) {
                        found = true;
                        const row = document.createElement('tr');
                        row.classList.add('highlight-row');

                        row.innerHTML = `
                            <td>${data[j].id}</td>
                            <td>${data[j].name}</td>
                            <td>${data[j].ip}</td>
                            <td>${data[j].room}</td>
                            <td>${data[j].os}</td>
                            <td>${renderHtmlForRowTools(data[j].path, 2)}</td> 
                            <td>${renderHtmlForRowTools(data[j].path, 1)}</td> 
                            <td>${renderHtmlForRowTools(data[j].path, 0)}</td>
                        `;

                        tableBody.appendChild(row);
                    }
                }

                if (!found) {
                    alert("Không tìm thấy dãy IP trên.");
                }
            });
    }
}

async function stop(path) {
    console.log(path);
    event.preventDefault();
    await fetch("src/remote/stop.py", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'path': path,
        })
    })
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log(data);
            if (data === "SC") {
                alert("Tắt thành công cho máy " + path);
            } else {
                alert("Tắt thất bại cho máy " + path);
            }
        });
}

async function update(path) {
    event.preventDefault();
    await fetch("src/remote/update.py", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'path': path,
        })
    })
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log(data);
            if (data === "SC") {
                alert("Cập nhật thành công cho máy " + path);
            } else {
                alert("Cập nhật thất bại cho máy " + path);
            }
        });
}

async function restart(path) {
    console.log(path);
    event.preventDefault();
    await fetch("src/remote/restart.py", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'path': path,
        })
    })
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log(data);
            if (data === "SC") {
                alert("Khởi động thành công cho máy " + path);
            } else {
                alert("Khởi động thất bại cho máy " + path);
            }
        });
}
