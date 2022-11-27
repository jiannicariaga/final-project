# yeat ![Logo](server/public/images/readme-logo.png "Logo" )

A full-stack web application for foodies who can't decide where to eat.

## Why I Built This

As a foodie and frequent user of Yelp, I can be incredibly indecisive when someone asks me where I want to eat. I wished Yelp had a feature that could answer the dreaded question for me—perhaps in the form a questionnaire or quiz to help narrow my options. I decided to take matters into my own hands and create an application that does excatly that (but cooler). Thus the birth of yEAT, where users can search eateries, add them to a roulette, and spin it to settle to score once and for all.

## Technologies Used

- [Yelp Fusion API](https://fusion.yelp.com/)
- [Google Maps Platform](https://developers.google.com/maps)
- [React Bootstrap](https://www.npmjs.com/package/react-bootstrap)
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
    git clone https://github.com/jiannicariaga/yeat
    cd yeat
    ```

2. Install all dependencies with NPM.

    ```shell
    npm install
    ```

3. Start the PostgreSQL server.

    ```shell
    sudo service postgresql start
    ```

4. Create a new PostgreSQL database.

    ```shell
    createdb yeat
    ```

5. Import the database schema and data files.

    ```shell
    npm run db:import
    ```

5. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
