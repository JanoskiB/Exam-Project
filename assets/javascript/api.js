// authorizing the api token to get access to the private posts on WordPress
export const getToken = async () => {
    const res = await fetch('https://www.dgolubeva.com/wp-json/jwt-auth/v1/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": "Balazs",
            "password": "Password123!"
        })
    }).then(res => res.json())

    return res.data?.token;
}