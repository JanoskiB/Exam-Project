import { getToken } from "./api.js";

const canvas = document.getElementById(`list-canvas`);

const token = await getToken();

const getAllData = async ({page, url}, token) => {
    let currentCount = 0;
    const allData = [];
    while(true) {
        const arr = await fetch(`${url}&per_page=${page}&offset=${currentCount++ * page}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json());
        allData.push(...arr);
        if(arr.length !== page) break;
    }
     return allData;
};
const data = await getAllData({page: 100, url: `https://www.dgolubeva.com/wp-json/wp/v2/categories/id=10?status=private`}, token);

console.log(getAllData);

const firstTen = data;
firstTen.forEach(x => {
    const anchor = document.createElement(`a`);
    const element = document.createElement(`img`);
    const div = document.createElement(`div`);
    element.classList.add(`painting`);
    div.classList.add(`image-div`);

    element.src = x.acf.picture.url;
    anchor.href = `single-art-page.html?id=${x.id}`
    anchor.appendChild(element);
    div.appendChild(anchor);
    canvas.appendChild(div);


})

