const express = require('express');
const path = require('path');
const app = express();

app.listen(3000, () => { console.log('http://127.0.0.1:3000') });
app.set('view engine', 'pug'); // 퍼그 실행하려면 얘랑 밑에 두줄 필요
app.set('views', path.join(__dirname, 'views')); // pug  위치지정 
app.locals.pretty=true; //false 로 하면 한줄로 못생기게 나옴.

app.use('/', express.static(path.join(__dirname, 'public')));

//console.log('__dirname: ' +__dirname); //절대경로
//console.log('__filename: ' +__filename);
//console.log('path.join(): ' + path.join(__dirname, '../../')); //  ../ 는 상대경로
//console.log('path.join(): ' + path.join(__dirname, './public')); //  ../ 는 상대경로

app.get('/search', (req, res) => {
	const q = req.query.q;
	// 검색결과 로직
	const lists = [
		{title: `${q} 물산`, content: `${q} 물산, ${q} 물산`, src: '/img/ny.jpg'},
		{title: `${q} 상사`, content: `${q} 상사, ${q} 상사`, src: '/img/paris.jpg'},
		{title: `${q} 약국`, content: `${q} 약국, ${q} 약국`, src: '/img/la.jpg'},
		{title: `${q} 식당`, content: `${q} 식당, ${q} 식당`, src: '/img/sanfran.jpg'}
	]
		res.render('search', {q, lists}) // 렌더는 만들ㅇ어주세요 뜻, (렌더는 뷰엔진이랑 같이 쓰는 애)
}); // { q: q } 변수명과 값이 같으면 생략하고 q 하나만 쓸수 있다.

//http://127.0.0.1:3000/band?src=ny
app.get('/band', (req, res) => {
	const src = req.query.src;
	res.render('band.pug', {src})
});

app.use((req, res) => {
	res.redirect('/html/404.html');
});