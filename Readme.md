
# 🤓 Starting a Basic Express App with Mongoose & TypeScript

## ✅ 1. Initialize Project

Write these commands in your powershell.

```bash
mkdir my-app
cd my-app
npm init -y
```

## ✅ 2. Install Dependencies

### Runtime Dependencies

```bash
npm install express mongoose
```

### Development Dependencies

```bash
npm i --save-dev @types/express
```

## ✅ 3. Create `tsconfig.json`

Generate the config:

```bash
npx tsc --init
```

Edit `tsconfig.json`:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

## ✅ 4. Setup Project Structure

```md
my-app/
├── src/
│   ├── app.ts
│   ├── server.ts
│   └── app/        
├── package.json
├── tsconfig.json
└── .gitignore
```

## ✅ 5. Add Scripts to `package.json`

To automatically restart the server whenever you make changes, you can use either `ts-node-dev` or `tsx`. This improves your development experience by saving time and effort.

🔧 Option 1: Using `ts-node-dev`;
Install it as a dev dependency:

```shell
npm install --save-dev ts-node-dev
```

Then, update your `package.json` scripts:

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

🔧 Option 2: Using `tsx`;
Install it (either globally or locally as a dev dependency):

> `tsx`- (<https://www.npmjs.com/package/tsx>)

```bash
npm install --save-dev tsx
```

Then, update your `package.json`:

```json
"scripts": {
  "dev": "tsx watch --clear-screen=false src/server.ts",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## ✅ 6. Create `.gitignore`

```gitignore
node_modules/
dist/
```

## ✅ 7. Example Code

### `src/app.ts`

```ts
import express, { Application, Request, Response } from 'express';

const app: Application = express();
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome from Note App!');
});

export default app;
```

### `src/server.ts`

```ts
import mongoose from 'mongoose';
import { Server } from 'http';
import app from './app';

let server: Server;
const port = 5000;

async function main() {
  try {
    await mongoose.connect("mongodb+srv://<db_username>:<db_password>@cluster.mongodb.net/todoDB?retryWrites=true&w=majority&appName=Cluster0");
    console.log('✅ Connected to MongoDB using Mongoose');

    server = app.listen(port, () => {
      console.log(`🚀 Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
  }
}

main();
```

## ✅ 8. Run in Development Mode

```bash
npm run dev
```
