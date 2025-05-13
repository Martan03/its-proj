# ITS projects

## Overview

- `proj1`: ITS project 1 - scenario creation (Gherkin)
- `proj2`: ITS project 2 - scenario implementation (Cypress)

## Description

We were given a website for which we had to design regression tests. In the
first project we had to write the designed tests in **Gherkin** and then in the
second project we had to implement those tests in **Cypress**. More detailed
description of each task is in the corresponding folders
*(contains original assignment, so it's in czech)*.

- Assignment for project 1: `proj1/projekt1-zadani-2025.pdf`
- Assignment for project 2: `proj2/projekt2-zadani-2025.pdf`

## Running

### Running website

To run the website itself, you have to use `docker`. You can start the docker
by running:
```bash
docker compose up --build
```

It will build all the containers and start the project. You can then access
the website on `localhost:8080`.

### Running Cypress tests

To run the Cypress tests, it is expected that the website is already running
and that you're in the `proj2` folder.
```bash
npm i
npx cypress run
```

If you want to open the Cypress GUI, where you can also inspect individual
steps of each test, you can run the cypress like thi:
```bash
npx cypress open
```

## Links

- **Author:** [Martan03](https://github.com/Martan03)
- **GitHub repository:** [its-proj](https://github.com/Martan03/its-proj)
- **Author website:** [martan03.github.io](https://martan03.github.io)
