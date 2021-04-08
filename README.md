# ScFrontAdminPanel

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Docker guide 
Steps:

1 Create image: docker build -t sc-front-admin-panel .

2 Save image: docker save -o  sc-front-admin-panel-DD-MM-YY.tar sc-front-admin-panel

3 Upload file: scp -r sc-front-admin-panel-DD-MM-YY.tar user:~

4 Load image: load --input sc-front-admin-panel-DD-MM-YY.tar

5 Check load: docker image ls

6 Run image: docker run -d -p 3200:80 imagen (NOT CHANGE PORTS)
