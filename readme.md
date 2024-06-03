## GoIT Node.js Course Template Homework

Realizează un fork al acestui repozitoriu pentru a îndeplini temele de acasă (2-6). Fork-ul va crea un repozitoriu pe contul tău de pe http://github.com

Adaugă mentorul la colaborare.

Pentru fiecare temă, creează un branch separat.

- hw02
- hw03
- hw04
- hw05
- hw06

Fiecare branch nou pentru fiecare temă trebuie să fie derivat din branch-ul principal (master).

După ce ai terminat lucrul la tema de acasă în branch-ul tău, trebuie să creezi un pull request (PR). Apoi, adaugă mentorul pentru revizuirea codului. Abia după ce mentorul aprobă PR-ul, poți face "merge" a branch-ului cu tema de acasă în branch-ul master.

Citește cu atenție comentariile mentorului. Corectează observațiile și fă un "commit" în branch-ul cu tema de acasă. Modificările se vor reflecta automat în PR după ce trimiți "commit"-ul cu corecțiile pe GitHub. După corectare, adaugă din nou mentorul pentru revizuirea codului.

- La predarea temei de acasă, este furnizat un link către PR.
- Codul JavaScript este curat și ușor de înțeles, iar pentru formatare se folosește Prettier.

### Comenzi:

- `npm start` &mdash; pornește serverul în modul production.
- `npm run start:dev` &mdash; pornește serverul în modul dezvoltare (development).
- `npm run lint` &mdash; rulează verificarea codului cu ESLint, este necesar să se ruleze înaintea fiecărui PR și să se corecteze toate erorile linterului.
- `npm lint:fix` &mdash; aceeași verificare a linterului, dar cu corecții automate pentru erorile simple.

### Testare:

- Instalam dependinte

```bash
npm i jest supertest --save-dev
```

- In package.json:

```json
"scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
    "test:dev": "node --experimental-vm-modules node_modules/jest/bin/jest.js --watch",
},
"jest": {
  "transform": {}
}
```

- In .eslintrc modificam in:

```javascript
{
  "env": {
    "commonjs": true,
    "es2021": true,
    "node": true,
    "jest": true // Adaugam jest: true, ca sa nu primim erori
  },
  "extends": ["standard", "prettier"],
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {}
}
```

- Cream folder `__tests__`
- Cream fisier fisier.test.js
- Adaugam teste:

```javascript
import request from "supertest";
import express from "express";
import productsRouter from "../routes/api/products";

// eslint-disable-next-line
const app = new express();
app.use("/products", productsRouter);

describe("My App Routes", function () {
  it("responds to /", async () => {
    const res = await request(app).get("/products");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(401);
  });
});
```

- Daca vrem sa testam un singur fisier de test:

```bash
npm run test:dev /__tests__/routes/auth.test.js
```
