

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
//     if(end_ip_arr<1 || end_ip_num >255) {
//         alert("Vui long nhap trong khoang 1-255")
//         return
//     } 
//     console.log("Start IP: " + start_ip_num);
//     console.log("End IP: " + end_ip_num);
//     for (let i = 1; i <= 3; i++) {
//         fetch(`src/data/40${i}.json`)
//             .then(response => response.json())
//             .then(data => {
//                 for (let j = 0; j < data.length; j++) {
//                     let ip_arr = data[j].ip;
//                     console.log("IP: " + ip_arr);
//                     let _ip_arr = ip_arr.split(".");
//                     let ip_num = parseInt(_ip_arr[3]);
//                     console.log("Checking IP: " + ip_num);
//                     if (ip_num >= start_ip_num && ip_num <= end_ip_num) {
//                         console.log("IP " + ip_num + " is in range. Adding to computerData.");
                    
//                         fetch("src/remote/scan.py",{
//                                     method: "PUT",
//                                     headers: {
//                                         'Content-Type': 'application/json'
//                                     },
//                                     body: JSON.stringify({
//                                         "path": data[j].path
//                                     })
//                                 })
//                                 .then(responseo => responseo.text())
//                                 .then(ipdata =>{
//                                     console.log(data[j].path);
//                                     let dataStatus = "Tắt";
//                                     if(ipdata != "None") dataStatus = "Mở" 
//                                     var row = document.createElement("tr");
//                         row.classList.add("highlight-row");
//                                     row.innerHTML = `
//                                                     <td>${data[j].id}</td>
//                                                     <td>${dataStatus}</td>
//                                                     <td>${data[j].room}</td>
//                                                     <td>${data[j].name}</td>
//                                                     <td>${data[j].ip}</td>
//                                                     `;
//                                     tableBody.appendChild(row);
//                                 })                            
//                                 .catch((error) => {
//                                     console.error('Error:', error);
//                                 });
                    
//                     }
//                 }
//             });
//     }
// }
// function run() {
//     event.preventDefault();
//     loadIP_Search();
// }


function loadIP_Search() {
    let range_ip = document.getElementById("ipRangeInput").value;
    var tableBody = document.getElementById("tableBody");
    if (tableBody.innerHTML !== "") {
        tableBody.innerHTML = "";
    }
    var range = range_ip.split("-");
    var start_ip = range[0];
    var end_ip = range[1];
    var start_ip_arr = start_ip.split(".").map(Number);
    var end_ip_arr = end_ip.split(".").map(Number);

    // Hàm so sánh IP để kiểm tra xem IP có nằm trong khoảng hay không
    function ipInRange(ip, start_ip, end_ip) {
        for (let i = 0; i < 4; i++) {
            if (ip[i] < start_ip[i] || ip[i] > end_ip[i]) {
                alert("Khong quet duoc day nay");
                return false;
            }
        }
        return true;
    }

    for (let i = 1; i <= 3; i++) {
        fetch(`src/data/40${i}.json`)
            .then(response => response.json())
            .then(data => {
                for (let j = 0; j < data.length; j++) {
                    let ip_arr = data[j].ip.split(".").map(Number);
                    if (ipInRange(ip_arr, start_ip_arr, end_ip_arr)) {
                        fetch("src/remote/scan.py", {
                            method: "PUT",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "path": data[j].path
                            })
                        })
                        .then(responseo => responseo.text())
                        .then(ipdata => {
                            let dataStatus = "Tắt";
                            if (ipdata != "None") dataStatus = "Mở";
                            var row = document.createElement("tr");
                            row.classList.add("highlight-row");
                            row.innerHTML = `
                                <td>${data[j].id}</td>
                                <td>${dataStatus}</td>
                                <td>${data[j].room}</td>
                                <td>${data[j].name}</td>
                                <td>${data[j].ip}</td>
                            `;
                            tableBody.appendChild(row);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    }
                }
            });
    }
}

function run() {
    event.preventDefault();
    loadIP_Search();
}
