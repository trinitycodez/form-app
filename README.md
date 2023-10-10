# Form-App

[![npm version](https://img.shields.io/badge/npm-9.8.1-brightgreen)](https://img.shields.io/badge/npm-9.8.1-brightgreen)
[![ReactScript version](https://img.shields.io/badge/ReactScript-5.0.1-skyblue)](https://img.shields.io/badge/ReactScript-5.0.1-skyblue)
[![TypeScript version](https://img.shields.io/badge/TypeScript-4.9.5-blue)](https://img.shields.io/badge/TypeScript-4.9.5-blue)

This is a `Form-App` project written in [ReactJs TypeScript](https://github.com/facebook/create-react-app) and type declarations are included.

## Installation
To work with all dependencies, run the below installation command on your terminal:

```sh
npm install
```

## Scripts
Integrated into this `Form-App` is the `@react-oauth/google` to make use of the GoogleOAuthProvider component and its children components; `GoogleLogin` and `useGoogleOneTabLogin`.

### Usage
Add the `GoogleLogin` component with the `onSuccess` prop to your preferred location as to how it should be displayed on the user interface. The credentialResponse on successful submission will be encrypted, to solve this, import your `jwtDecode` from the `jwt-decode` module: 

```tsx
// App.tsx

import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import jwtDecode from "jwt-decode";

export const App = () => {
    const loginGoogle = async (credentialResponse:CredentialResponse) => {
        const onlineGoogle = await jwtDecode(`${credentialResponse.credential}`);
        console.log(onlineGoogle);
        }
    }

    return (
        <>
            <form method="...">
                <div className="flex ...">
                    <GoogleLogin
                    onSuccess={(credentialResponse) => loginGoogle(credentialResponse)}
                    onError={() => console.error('Login Failed')}
                    />
                </div>
                ...
            </form>
        </>
    );
}

```
Wrap up your application from the `index.tsx` with the `GoogleOAuthProvider` component that has a `clientId` prop:

```tsx
// index.tsx

import GoogleOAuthProvider from '@react-oauth/google';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <GoogleOAuthProvider clientId={"017XXXXXXXX..."}>
        <App />
    </GoogleOAuthProvider>
);

```

### Run Script Command
Run in development on the terminal:

```sh
npm start
```

## TL;DR
### Note:
For the purpose of this `Form-App` project, user's data is stored on the window localStorage, hence, take caution not to implement such aspect for full project exhibition.

## Contributing

Contributions, issues and feature requests are welcome!

## Show your support

Give a ⭐️ if you like this project!

## LICENSE

[MIT](./LICENSE)