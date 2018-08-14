'use strict';

const express = require('express');
const Podlet = require('../../');

const podlet = new Podlet({
    version: `2.0.0-${Date.now().toString()}`,
    name: 'footer',
});

const app = express.Router(); // eslint-disable-line new-cap

app.use(podlet.middleware());

app.get(podlet.content(), (req, res) => {
    res.status(200).render('footer.content.njk');
});

app.get(podlet.fallback('/fallback'), (req, res) => {
    res.status(200).render('footer.fallback.njk');
});

app.get(podlet.manifest(), (req, res) => {
    res.status(200).json(podlet);
});

app.use('/assets', express.static('assets'));
podlet.css('http://localhost:7200/footer/assets/footer.css');

module.exports = app;
