#!/usr/bin/env node

"use strict";

const express = require('express');
const rpcWS = require('node-jsonrpc-lsp')

const app = express();

app.listen(4000, () => {
	console.log('Listening on port 4000');
});

app.use(express.static('dist'));

new rpcWS({
	port: 3001,
	languageServers:{
		typescript:[
			'node',
			'./node_modules/typescript-language-server/lib/cli.js',
			'--stdio',
			'--tsserver-log-file=ts-logs.txt'
		],
	}
})

app.set('views', '');
app.set('view engine', 'html');

app.get('/', (req, res) => {
	res.render('dist/index.html');
});
