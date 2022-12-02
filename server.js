const http = require('http');
const PORT = 8000;
const url = require('url');
const AuthController = require('./src/controllers/auth.controller');

const authcontroller = new AuthController();


const server = http.createServer((req, res) => {
    let urlPath = url.parse(req.url);
    switch (urlPath.pathname) {
        case '/':
            authcontroller.ShowAll(req, res);
            break;
        case '/ShowEdit':
            authcontroller.showEdit(req, res);
            break;
        case '/delete':
            authcontroller.delete(req, res);
            break;

        case '/Edit':
            if(req.method == 'GET'){
                authcontroller.Edit(req, res);
            }
            else {
                authcontroller.UpdateStudent(req, res);

            }

            break;
        case '/ShowFormAdd':
            if (req.method == 'GET') {
                authcontroller.showFormAdd(req, res);
            } else {
                authcontroller.Add(req, res);
            }
            break;
        default:
            res.end();
    }
});

server.listen(PORT, 'localhost', () => {
    console.log('listening on port' + PORT);
});