const API_URL = `${process.env.REACT_APP_API_URL}/api/auth/signin`;

// The sign in function created in Auth-Service.ts
export function signIn(user: any) {
    return fetch(API_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password,
        }),
    })
        .then((response) => response.json())
        .catch((e) => {
            console.log(e);
        });
}
