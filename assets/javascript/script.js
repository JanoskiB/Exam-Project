import { getToken } from "./api.js";

const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
}

const token = await getToken();

const getSingleArt = async (id, token) => await fetch(`https://www.dgolubeva.com/wp-json/wp/v2/posts/${id}?status=private`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => res.json());

const {id} = getUrlParams();

console.log(id)

const art = await getSingleArt(id, token);
console.log(art);

const myArtName = document.querySelector('#myArtName');
myArtName.innerHTML = `${art.acf.name}`;

const myImage = document.querySelector(`#single-art-img`);
myImage.innerHTML = `<img src="${art.acf.picture.url}">`;



