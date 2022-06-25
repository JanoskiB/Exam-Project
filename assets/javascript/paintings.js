// abbreviations:
// pnt - paintings
// drw - drawings
// exb - exhibitions
// grph - graphics


//importing a token to get access to the private wordpress posts
import { getToken } from "./api.js";

//targeting a div in the HTML
const pntPortrait = document.getElementById(`list-pntPortraits`);
// const ptnStillLife = document.getElementById(`list-pntStillLife`);
// const ptnLandscape = document.getElementById(`list-ptnLandscape`);
// const ptnFigurative = document.getElementById(`list-ptnFigurative`);

//get the token ready
const token = await getToken();

// fething all the data from the WordPress posts
const getAllData = async ({page, url}, token) => {
    // setting the counter to make sure that all the available data is fethed, since Wordpress has a limit of 100 posts at a time
    let currentCount = 0;
    const allData = [];
    while(true) {
        const arr = await fetch(`${url}&per_page=${page}&offset=${currentCount++ * page}`, {
            method: 'GET',
            headers: {
                //authenticate the wordpress token
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json());
        allData.push(...arr);
        // brealing the loop when all the posts are fetched
        if(arr.length !== page) break;
    }
     return allData;
};
//starting the counter again untill the are no more posts left to fetch
const data = await getAllData({page: 100, url: `https://www.dgolubeva.com/wp-json/wp/v2/posts?categories=15&status=private`}, token);

console.log(getAllData);

//targeting the elements in HTML to display the fetched data
const allPieces = data;
allPieces.forEach(x => {
    const anchor = document.createElement(`a`);
    const element = document.createElement(`img`);
    const div = document.createElement(`div`);
    element.classList.add(`painting`);

    element.src = x.acf.picture.url;
    anchor.href = `single-art-page.html?id=${x.id}`
    anchor.appendChild(element);
    div.appendChild(anchor);
    pntPortrait.appendChild(div);
})




// const PiecesStillLife = data;
// allPieces.forEach(x => {
//     const anchor = document.createElement(`a`);
//     const element = document.createElement(`img`);
//     const div = document.createElement(`div`);
//     element.classList.add(`painting`);

//     element.src = x.acf.picture.url;
//     anchor.href = `single-art-page.html?id=${x.id}`
//     anchor.appendChild(element);
//     div.appendChild(anchor);
//     pntPortrait.appendChild(div);
// })

// async function getData(){
//     await getAllData
// }
// const getPntStillLife = async fetch(`https://www.dgolubeva.com/wp-json/wp/v2/posts?categories=10&status=private`)