# yeat ![Logo](server/public/images/readme-logo.png "Logo" )

A full-stack web application for foodies who can't decide where to eat.

## Why I Built This

As a foodie and frequent user of Yelp, I can be incredibly indecisive when someone asks me where I want to eat. I wished Yelp had a feature that could answer the dreaded question for me—perhaps in the form a questionnaire or quiz to help narrow my options. I decided to take matters into my own hands and create an application that does exactly that (but cooler). Thus the birth of yEAT, where users can search eateries, add them to a roulette, and spin it to settle to score once and for all.

## Technologies Used

- [Yelp Fusion API](https://www.yelp.com/developers/documentation/v3/get_started)
- [Google Maps API](https://developers.google.com/maps/documentation/javascript)
- [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction)
- [React Roulette Pro](https://www.npmjs.com/package/react-roulette-pro)
- PostgreSQL
- Express.js
- React.js
- Node.js
- Webpack
- JavaScript
- HTML5
- CSS3
- SQL

## Live Demo

Try the application live at [https://yeat.jiannicariaga.dev/](https://yeat.jiannicariaga.dev/).

## Features

- Users can set their location.
- Users can search eateries.
- Users can view details of a single eatery.
- Users can add eateries to the roulette.
- Users can remove eateries from the roulette.
- Users can view the roulette.
- Users can spin the roulette.
- Users can add eateries to their favorites list.
- Users can remove eateries from the favorites list.
- Users can view their favorites list.

# Stretch Features

- Users can sign up.
- Users can sign in.
- Users can sign out.

## Preview

![preview-1](server/public/images/preview-1.gif)
![preview-2](server/public/images/preview-2.gif)

## Development

### System Requirements

- [React](https://www.npmjs.com/package/react) 17 or higher
- [react-dom](https://www.npmjs.com/package/react-dom) 17 or higher
- [Node.js](https://nodejs.org/en/download/) 10 or higher

### Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/jiannicariaga/yeat.git
    cd yeat
    ```

2. Install all dependencies with NPM.

    ```shell
    npm install
    ```

3. Create a copy of the `.env.example` file.

    ```shell
    cp .env.example .env
    ```

4. In the `.env` file, replace `'changeMe'` with your Yelp Fusion API key and Google Maps API key.

    ```shell
    YELP_API_KEY=changeMe
    MAPS_API_KEY=changeMe
    ```

5. Start the server.

    ```shell
    sudo service postgresql start
    ```

6. Create a new database.

    ```shell
    createdb yeat
    ```

7. Import the `schema.sql` and `data.sql` files to the database.

    ```shell
    npm run db:import
    ```

8. (Optional) Start pgweb. Once started you can view the database by opening `http://0.0.0.0:8081/` in your browser.

    ```shell
    pgweb --db=yeat
    ```

9. Start the project. Once started you can view the application by opening `http://localhost:3000` in your browser.

    ```shell
    npm run dev
    ```
