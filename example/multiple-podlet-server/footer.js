/* eslint-disable import/no-extraneous-dependencies */

'use strict';

const express = require('express');
const Podlet = require('../../');

class Footer {
    constructor(pathname) {
        const podlet = new Podlet({
            pathname,
            fallback: '/fallback',
            version: `2.0.0-${Date.now().toString()}`,
            logger: console,
            name: 'footer',
            development: true,
        });

        this.app = express.Router(); // eslint-disable-line new-cap

        this.app.use(podlet.middleware());

        this.app.get(podlet.content(), (req, res) => {
            res.podiumSend(`<footer>Footer</footer>`);
        });

        this.app.get(podlet.fallback(), (req, res) => {
            res.podiumSend(`<footer>Fallback footer</footer>`);
        });

        this.app.get(podlet.manifest(), (req, res) => {
            res.status(200).json(podlet);
        });

        this.app.use('/assets', express.static('assets'));
        podlet.css({ value: '/assets/footer.css' });
    }

    router() {
        return this.app;
    }
}

module.exports = Footer;
