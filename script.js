//https://docs.google.com/spreadsheets/d/1XJgihZfm-od1FnMyqfvUrEOlM7QzrkS51KVpjwVPGO4/edit?usp=sharing


const url = 'https://docs.google.com/spreadsheets/d/';
const ssID = '1XJgihZfm-od1FnMyqfvUrEOlM7QzrkS51KVpjwVPGO4';
const query1 = '/gviz/tq?';
const q2 = 'tqx=out:json';
let ssName = '';
let query = '';
let endpoint = ``;
// Account List
ssName = 'sheet=Account';
query = encodeURIComponent('select A,C ORDER By C');
endpoint = `${url}${ssID}${query1}&${q2}&${ssName}&tq=${query}`;
const accountList = document.getElementById('account');

fetch(endpoint)
    .then(res => res.text())
    .then(data => {
        const temp = data.substring(47).slice(0, -2);
        const json = JSON.parse(temp);
        //console.log(json.table.rows);
        const accountRows = json.table.rows;
        accountRows.forEach((row) => {
            let option = document.createElement('option');
            //ID
            console.log(row.c[0].v);
            option.value = row.c[0].v;
            //NAME
            console.log(row.c[1].v);
            option.text = row.c[1].v;

            accountList.appendChild(option);
        })
    })

const output = document.querySelector('.output');
const title = document.querySelector('.title');
function getRecords() {
    output.innerHTML = '';
    console.log('Selection Change');
    var x = accountList.selectedIndex;
    console.log(x);
    var y = accountList.options;
    var value = y[x].value;
    console.log(y);
    console.log(value);
    title.innerHTML = y[x].text;
    // Account Ledger Records
    ssName = 'sheet=Posting1';
    query = encodeURIComponent('select B,D,F,H,I,J,K,L where A="' + value + '" AND R <>"YES" AND U <>"YES"');
    endpoint = `${url}${ssID}${query1}&${q2}&${ssName}&tq=${query}`;
    fetch(endpoint)
        .then(res => res.text())
        .then(data => {
            const temp = data.substring(47).slice(0, -2);
            const json = JSON.parse(temp);
            console.log(data);
            const rows = json.table.rows;
            rows.forEach((row) => {
                //console.log(row.c);
                const div = document.createElement('div');
                div.classList.add('rowDiv');
                const temp1 = row.c;
                console.log(temp1);

                temp1.forEach((cell, index) => {
                    console.log(index);
                    console.log(cell);
                    console.log(cell.f);
                    var value = "";
                    if (cell.f !== undefined) { value = cell.f; }
                    else { value = cell.v; }
                    const box = document.createElement('div');
                    box.textContent += value;
                    box.classList.add('box');
                    if (index == 0) { box.setAttribute('style', 'display:none;') }
                    if (index == 1) { box.setAttribute('style', 'width:150px;text-align:left;') }
                    if (index == 2) { box.setAttribute('style', 'width:90px;text-align:left;') }
                    if (index == 3) { box.setAttribute('style', 'width:300px;text-align:left;') }
                    if (index == 4) { box.setAttribute('style', 'width:300px;text-align:left;') }
                    if (index == 5) { box.setAttribute('style', 'width:80px;text-align:right;') }
                    if (index == 6) { box.setAttribute('style', 'width:80px;text-align:right;') }
                    if (index == 7) { box.setAttribute('style', 'width:100px;text-align: right;') }
                    div.appendChild(box);

                })
                output.appendChild(div);

            });
        })
}