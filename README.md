# Neighborhood Map Project
The goal of this project is to build single page web application by using React, the Google Maps API, and data from a third-party API. The app should display both a filtered list of results and a map view of those results including markers of each locations. Also, this appilication should be responsive and accessible.
This application follow this [Udacity Project Rubric](https://review.udacity.com/#!/rubrics/1351/view)

## How to install

Just clone this project by
```
git clone https://github.com/sachioasis/my_book_tracking_app.git
```

Then, install all project dependencies with 
```
npm install
```
and start the application server with 
```
npm start
```

## How to run

Use the follwoing link in a browser
```
http://localhost:3000/
```

## How to run in Production Mode
To create a production build,use 
```
npm run build
```
Navigate to the build directory and start the server with 
```
npm run deploy
```

***NOTE:*** *The service workers will only function in production mode.*


## Dependencies
- React, ReactDOM
- axios
- prop-types
- serviceWorker