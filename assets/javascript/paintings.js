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
const data = await getAllData({page: 100, url: `https://www.dgolubeva.com/wp-json/wp/v2/posts?status=private`}, token);

const firstTen = data;
firstTen.forEach(x => {
    const anchor = document.createElement(`a`);
    const element = document.createElement(`img`);
    element.classList.add(`painting`);

    element.src = x.acf.picture.url;
    anchor.href = `single-art-page.html?id=${x.id}`
    anchor.appendChild(element);
    canvas.appendChild(anchor);

})

