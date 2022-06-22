//importing a token to get access to the private wordpress posts
import { getToken } from "./api.js";

//getting the url from the window tab
const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
}

//get the token ready
const token = await getToken();

//fetching the post ids from wordpress
const getSingleArt = async (id, token) => await fetch(`https://www.dgolubeva.com/wp-json/wp/v2/posts/${id}?status=private`, {
    method: 'GET',
    headers: {
        //authenticate the wordpress token
        Authorization: `Bearer ${token}`
    }
}).then(res => res.json());

// adding the post id to the url
const { id } = getUrlParams();

console.log(id)

// getting the information about the post
const art = await getSingleArt(id, token);
console.log(art);

// putting the fetched information into the html code 
const myArtName = document.querySelector('#myArtName');
myArtName.innerHTML = `${art.acf.name}`;

const myImage = document.querySelector(`#single-art-img`);
myImage.innerHTML = `<img src="${art.acf.picture.url}">`;

const myArtYear = document.querySelector(`#myArtYear`);
myArtYear.innerHTML = `${art.acf.year}`

const myArtSize = document.querySelector(`#myArtSize`);
myArtSize.innerHTML = `${art.acf.size} cm`;

const myArtMedium = document.querySelector(`#myArtMedium`);
myArtMedium.innerHTML = `${art.acf.medium}`;


