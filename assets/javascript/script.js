
// Fetching from headless WordPress

// "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LmRnb2x1YmV2YS5jb20iLCJpYXQiOjE2NTQ2ODQ3OTUsIm5iZiI6MTY1NDY4NDc5NSwiZXhwIjoxNjU1Mjg5NTk1LCJkYXRhIjp7InVzZXIiOnsiaWQiOjMsImRldmljZSI6IiIsInBhc3MiOiI1NTkzYzY1ODQ5YjY5ZDM0MTNiNGExYWRhOTA5YzVlNCJ9fX0.6z5exLsg83bFXvpHVVw42ji68ZiW_oKZ-rM9XWJAvyM"

let token;
fetch('https://www.dgolubeva.com/wp-json/jwt-auth/v1/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "username": "Balazs",
        "password": "Password123!"
    })
})
    .then(response => response.json())
    .then(tokenData => {
        console.log(tokenData);
        token = tokenData.data.token;
    })
    .then(() => {
        fetch('https://www.dgolubeva.com/wp-json/wp/v2/posts?status=private&per_page=100', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data2 => {
                console.log(data2);
                myArtName = document.querySelector('#myArtName');
                myArtName.innerHTML = `${data2[5].acf.name}`;

                myImage = document.querySelector(`#single-art-img`);
                myImage.innerHTML = `<img src="${data2[5].acf.picture.url}">`;

            });
    })
    .then(() => {
      fetch('https://www.dgolubeva.com/wp-json/wp/v2/posts?status=private&per_page=100&offset=100', {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
          .then(response => response.json())
          .then(data3 => {
              console.log(data3);
              myArtName = document.querySelector('#myArtName');
              myArtName.innerHTML = `${data3[8].acf.name}`;

              // myImage = document.querySelector(`#recipe-img`);
              // myImage.innerHTML = `<img src="${data2[8].acf.image_url}">`;

          });
  })

