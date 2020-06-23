const pagination = document.querySelector('.pagination');
const main = document.querySelector('.leader');
const topthree = document.querySelector('.card')
const search = document.querySelector('.filterInput')

let dataPerPage = 25;
const pageNumbers = [];
let sortedInterns, currentData = [];
let data = []
let currentPage = 1;
let indexOfLastIntern = currentPage * dataPerPage;
let indexOfFirstIntern = indexOfLastIntern - dataPerPage;




fetch("./assets/js/data.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log("error: " + err);
    });


search.addEventListener('keydown', (e) => {
    let filtered = currentData.filter(d => d.userName.split('@').pop(0).toLowerCase().includes(e.target.value.toLowerCase()));
    change(filtered)
});


const getnewData = (k) => {
    currentPage = k;
    indexOfLastIntern = currentPage * dataPerPage;
    indexOfFirstIntern = indexOfLastIntern - dataPerPage;
    currentData = sortedInterns.slice(indexOfFirstIntern, indexOfLastIntern);
    main.innerHTML = ''
    change(currentData)
}


function appendData(data) {
    const addedPos = data.map((intern, i) => { return { ...data[i], position: i + 1 } })
    sortedInterns = addedPos.sort((a, b) => b.totalPoints - a.totalPoints);
    currentData = sortedInterns.slice(indexOfFirstIntern, indexOfLastIntern);
    for (let i = 1; i <= Math.ceil(sortedInterns.length / dataPerPage); i++) {
        pageNumbers.push(i);
    }
    populatePage(currentData)
}

const populatePage = (currentData) => {
    currentData.map((intern, i) => {
        if (i < 3) {
            const flex = document.createElement('div');
            flex.setAttribute('class', 'sub-flex')
            //  position
            const pos = document.createElement('span')
            // pos.setAttribute('class','')
            pos.innerHTML = ordinal_suffix_of(intern.position);
            // img
            const imgpos = document.createElement('img')
            imgpos.setAttribute('src', "./assets/img/avatar/av1.jpg")
            // name
            const topname = document.createElement('h5')
            topname.innerHTML = intern.fullName;
            // track
            const toptrack = document.createElement('p')
            toptrack.innerHTML = intern.track;

            const h4 = document.createElement('h4');
            h4.innerHTML = `${intern.totalPoints}pts`;

            flex.appendChild(pos)
            flex.appendChild(imgpos)
            flex.appendChild(topname)
            flex.appendChild(toptrack)
            flex.appendChild(h4)
            topthree.append(flex)
        }
        const sub = document.createElement('div');
        sub.setAttribute('class', 'sub-leader1')
        // position
        const span = document.createElement('span');
        span.setAttribute('class', "position")
        span.innerHTML = ordinal_suffix_of(intern.position);

        // img
        const img = document.createElement('img')
        img.setAttribute('src', './assets/img/avatar/av1.jpg')
        img.setAttribute('class', 'img')
        // intern name
        const h5 = document.createElement('h5');
        h5.setAttribute('class', 'name');
        h5.innerHTML = intern.fullName;
        // slackclass
        const slackid = document.createElement('p')
        slackid.setAttribute('class', 'slacid');
        slackid.innerHTML = intern.userName;
        // email
        const email = document.createElement('p')
        email.setAttribute('class', 'email');
        email.innerHTML = intern.email;
        // track
        const track = document.createElement('p')
        track.setAttribute('class', 'track');
        track.innerHTML = intern.track;
        // points
        const points = document.createElement('h5');
        points.setAttribute('class', 'points');
        points.innerHTML = intern.totalPoints;
        // share btn
        const link = document.createElement('a')
        link.setAttribute('href', `https://twitter.com/intent/tweet?text=My%20Total%20Point%20on%20this%20week%20HNG%20Leader%20board%20is%20${intern.totalPoints}pts`)
        link.setAttribute('target', '_blank');

        const share = document.createElement('button')
        share.innerHTML = 'share on twitter'

        link.appendChild(share)
        // share.setAttribute('class', 'share');

        sub.appendChild(span)
        sub.appendChild(img)
        sub.appendChild(h5)
        sub.appendChild(slackid)
        sub.appendChild(email)
        sub.appendChild(track)
        sub.appendChild(points)
        sub.appendChild(link)
        main.append(sub);

    })
    pageNumbers.map(num => {
        const btn = document.createElement('button');
        btn.setAttribute('onclick', `getnewData(${num})`)
        btn.innerHTML = num;
        pagination.append(btn);
    })
}

const change = (currentData) => {
    currentData.map((intern, i) => {
        const sub = document.createElement('div');
        sub.setAttribute('class', 'sub-leader1')
        // position
        const span = document.createElement('span');
        span.setAttribute('class', "position")
        span.innerHTML = ordinal_suffix_of(intern.position);

        // img
        const img = document.createElement('img')
        img.setAttribute('src', './assets/img/avatar/av1.jpg')
        img.setAttribute('class', 'img')
        // intern name
        const h5 = document.createElement('h5');
        h5.setAttribute('class', 'name');
        h5.innerHTML = intern.fullName;
        // slackclass
        const slackid = document.createElement('p')
        slackid.setAttribute('class', 'slacid');
        slackid.innerHTML = intern.userName;
        // email
        const email = document.createElement('p')
        email.setAttribute('class', 'email');
        email.innerHTML = intern.email;
        // track
        const track = document.createElement('p')
        track.setAttribute('class', 'track');
        track.innerHTML = intern.track;
        // points
        const points = document.createElement('h5');
        points.setAttribute('class', 'points');
        points.innerHTML = intern.totalPoints;
        // share btn
        const link = document.createElement('a')
        link.setAttribute('href', `https://twitter.com/intent/tweet?text=My%20Total%20Point%20on%20this%20week%20HNG%20Leader%20board%20is%20${intern.totalPoints}pts`)
        link.setAttribute('target', '_blank');

        const share = document.createElement('button')
        share.innerHTML = 'share on twitter'

        link.appendChild(share)

        sub.appendChild(span)
        sub.appendChild(img)
        sub.appendChild(h5)
        sub.appendChild(slackid)
        sub.appendChild(email)
        sub.appendChild(track)
        sub.appendChild(points)
        sub.appendChild(link)
        main.append(sub);

    })
}

const ordinal_suffix_of = (i) => {
    var j = i % 10, k = i % 100;
    if (j == 1 && k != 11) return i + 'st'
    if (j == 2 && k != 12) return i + 'nd';
    if (j == 3 && k != 13) return i + 'rd';
    return i + 'th'
}