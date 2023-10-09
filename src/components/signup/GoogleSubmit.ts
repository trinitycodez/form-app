type propType = {
    given_name:string,
    email:string,
    email_verified:boolean,
    picture:string,
    message?:string
}

export default class GooglePerson {
    public gms!:propType
    constructor(public data:Response) {}

    async sendGms () {
        this.gms = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.data)
        })
        .then((res) =>
            res.json()
        )
        .then((res) => {
            return res
        })
        .catch((e:Error) => { 
            return e.message
        })
    }
}