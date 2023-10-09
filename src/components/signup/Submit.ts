type hold = {
    name:string,
    email:string,
    password:string,
    message?:string
}
export class Submit {
    public sms!: hold;
    
    constructor(public name:string, private _email:string, private _password:string, private readonly termsPrivacy:string = "checked" ) {}

    async send () {
        const data = {
            name:this.name, 
            email:this._email, 
            password:this._password,
            termPrivacy:this.termsPrivacy
        }
        this.sms = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((res) =>
            res.json()
        )
        .then((res) => {
            return res
        })
        .catch((e:Error) => { 
            return e.message;
        })

    }

}

//  error message
// Class 'Submit' incorrectly extends base class 'Handler'.
//   Types have separate declarations of a private property '_email'.