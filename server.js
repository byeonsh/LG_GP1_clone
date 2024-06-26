const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');

const hostname = '0.0.0.0';
const port = 8080;

const app = express();

app.use('/', express.static(path.join(__dirname, 'dist')))

/** 미리보기 branch 별로 설정 
	EFS : /my-directory ROOT 디렉토리에 브랜치별로 build 폴더 존재 
	ex)  /my-directory/CNS-middle/dist , /my-directory/PBGTgtc/dist
 */
 
 const branchs = ['multishop','PBGTgtc','PBOPopt'];
branchs.forEach(c => {
	app.use('/'+c, express.static(path.join(__dirname, '../' + c + '/dist')))	
});


http.createServer(app).listen(port, hostname);



console.log(`Server running at http://${hostname}:${port}/`);


