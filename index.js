
"use strict";

import mongo from 'mongodb'
import express from 'express'
import request from 'request-promise'
import { promises as fs } from "fs";
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT;
let db;

async function mongoStartup() //Подключение к БД
{
    let client = await new mongo(process.env.MONGODB_URI, {useNewUrlParser: true});
    await client.connect();
    const db_name = process.env.MONGODB_URI.split("/").pop().split("?")[0];
    db = client.db(db_name);
}

mongoStartup();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //Доставать постпараметры

app.get('/', async (req, res) => {
    let cities;
    try {
        cities = await db.collection('cities').find({}).toArray();
    } catch(error) {
        res.status(404).send("404 Error")
    }

    let html = await fs.readFile('./public/main.html', "utf8");
    const city_block_template = await fs.readFile('./public/city_block.html', "utf8");

    let favourites = '';

    for (let c in cities){
        let city_block = city_block_template;

        const options = {
            url: encodeURI('https://api.openweathermap.org/data/2.5/weather?q=' + cities[c].name + '&appid=' + process.env.OPENWEATHERMAP_KEY),
            headers: {
                "Content-Type": "application/json"
            },
            method:"GET",
            json:true
        };

        let weather_data;
        try {
            weather_data = await request(options); //??? func
        } catch (error) {
            //TODO
        }

        const { temp, pressure, humidity } = weather_data.main;
        const { description, icon } = weather_data.weather[0];
        const wind = weather_data.wind;

        const cityName =  weather_data.name;
        const temperature = temp.toFixed(0) - 273+'°C';
        const {lat, long} = weather_data.coord;

        city_block = city_block.replace(/\%name\%/g, cityName);
        city_block = city_block.replace(/\%icon\%/g, icon);
        city_block = city_block.replace(/\%temperature\%/g, temperature);
        city_block = city_block.replace(/\%wind_speed\%/g, wind.speed);
        city_block = city_block.replace(/\%overcast\%/g, description);
        city_block = city_block.replace(/\%humidity\%/g, humidity);
        city_block = city_block.replace(/\%pressure\%/g, pressure);
        city_block = city_block.replace(/\%lat\%/g, lat);
        city_block = city_block.replace(/\%long\%/g, long);

        favourites += city_block;
    }

    html = html.replace(/\%favourites\%/g, favourites);

    res.send(html);
});

app.get('/weather/city', async (req, res) => {
    if(!req.query.q)
    {
        //TODO //Bad request
    }

    const options = {
        url: encodeURI('https://api.openweathermap.org/data/2.5/weather?q=' + req.query.q + '&appid=' + process.env.OPENWEATHERMAP_KEY),
        headers: {
            "Content-Type": "application/json"
        },
        method:"GET",
        json:true
    };

    let weather_data;
    try {
        weather_data = await request(options);
    } catch (error) {
        //TODO //500 or 404
    }

    res.send(weather_data);
});

app.get('/weather/coordinates', async (req, res) => {
    if(!req.query.lat || !req.query.lon)
    {
        //TODO //
    }

    const options = {
        url: encodeURI('https://api.openweathermap.org/data/2.5/weather?lat=' + req.query.lat + '&lon=' + req.query.lon + '&appid=' + process.env.OPENWEATHERMAP_KEY),
        headers: {
            "Content-Type": "application/json"
        },
        method:"GET",
        json:true
    };

    let weather_data;
    try {
        weather_data = await request(options, function() {});
    } catch (error) {
        //TODO
    }

    res.send(weather_data);
});


app.get('/favourites', async (req, res) => {


    let cities;
    try {
        cities = await db.collection('cities').find({}).toArray();
    } catch(error) {
        //TODO
    }

    res.send(cities);
});

app.post('/favourites', async (req, res) => {
    if(!req.body.city) {
        //TODO
    }

    const city = req.body.city;

    let cities

    try {
       cities =  await db.collection('cities').insertOne({name : city});
    } catch(error) {
        //TODO
    }


        res.send('OK')
})

app.delete('/favourites', async (req, res) => {
    if(!req.body.city) {
        //TODO
    }

    let cities

    const city = req.body.city;
    try {
        cities = await db.collection('cities').deleteOne({city});
    } catch(error) {
        //TODO
    }

    res.send("OK");
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


