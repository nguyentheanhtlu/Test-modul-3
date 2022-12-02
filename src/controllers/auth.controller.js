const _handle = require('../../handler/_handler');
const BaseController = require('./base.controller');
const fs = require('fs');
const url = require('url');
const qs = require('qs');
let idStudent ="";
class AuthController extends BaseController {


    async ShowAll(req, res,) {
        const sql = "select * from Students ";
        let show = await this.querySQL(sql);
        let html = "";

        show.forEach((show, index) => {
            html += "<tr>";
            html += `<td>${index + 1}</td>`;
            html += `<td>${show.Name}</td>`;
            html += `<td>${show.Class}</td>`;
            html += `<td>${show.Evaluate}</td>`;
            html += `<td><a  class="btn btn-primary" href="ShowEdit?index=${show.ID}">Sửa</a></td>`;
            // html += `<td><a  class="btn btn-primary" href="/delete?index=${show.ID}">Xóa</a></td>`;
            html += "</tr>"
        });
        let data = await _handle.getTempPath("./views/index.html");
        data = data.replace("{home-list}", html);
        res.writeHead(200, {"Content-type": "text/html"});
        res.write(data);
        res.end();

    }

    async showEdit(req, res) {
        let parseUrl = url.parse(req.url, true);
        let queryStringObject = parseUrl.query;
        let ID = queryStringObject.index;
        idStudent = ID;

        const sql = `select *
                     from Students
                     where ID = ${ID}`
        let results = await this.querySQL(sql);
        let dataStudent = results[0];
        let Name = dataStudent.Name;
        let Class = dataStudent.Class;
        let PoinLT = dataStudent.PoinLT;
        let PoinTH = dataStudent.PoinTH;
        let Evaluate = dataStudent.Evaluate;
        let Description = dataStudent.Description;

        let data = await _handle.getTempPath('./views/detail.html');
        data = data.replace('{Name}', Name);
        data = data.replace('{Class}', Class);
        data = data.replace('{PoinLT}', PoinLT);
        data = data.replace('{PoinTH}', PoinTH);
        data = data.replace('{Evaluate}', Evaluate);
        data = data.replace('{Description}', Description);
        data = data.replace('{delete}', `/delete?ID=${ID}`);
        res.writeHead(200, {"Content-type": "text/html"});
        res.write(data);
        res.end();

    }

    async delete(req, res) {
        let parseUrl = url.parse(req.url, true);
        let queryStringObject = qs.parse(parseUrl.query, true)
        let ID = queryStringObject.ID;

        let sql = `DELETE
                   FROM Students
                   WHERE ID = ${ID}`;
        await this.querySQL(sql);
        res.setHeader("Cache-Control", "no-store");
        res.writeHead(301, {Location: "/"});
        res.end();
    }

    async Edit(req, res) {

        const sql = `select *
                     from Students
                     where ID = "${idStudent}"`
        let resultss = await this.querySQL(sql)
        console.log(resultss);

        let dataStudent = resultss[0];
        let NameUpdate = dataStudent.Name;
        let ClassUpdate = dataStudent.Class;
        let PoinLTUpdate = dataStudent.PoinLT;
        let PoinTHUpdate = dataStudent.PoinTH;
        let EvaluateUpdate = dataStudent.Evaluate;
        let DescriptionUpdate = dataStudent.Description;

        let dataUpdate = await _handle.getTempPath('./views/edit.html');
        let html = ``;

        dataUpdate = dataUpdate.replace("{list-edit}", html);
        dataUpdate = dataUpdate.replace('{Name}', NameUpdate);
        dataUpdate = dataUpdate.replace('{Class}', ClassUpdate);
        dataUpdate = dataUpdate.replace('{PoinLT}', PoinLTUpdate);
        dataUpdate = dataUpdate.replace('{PoinTH}', PoinTHUpdate);
        dataUpdate = dataUpdate.replace('{Evaluate}', EvaluateUpdate);
        dataUpdate = dataUpdate.replace('{Description}', DescriptionUpdate);
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(dataUpdate);
        res.end();
    }

    async showFormAdd(req, res) {
        let data = await _handle.getTempPath('./views/add.html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    }

    async Add(req, res) {

            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async () => {
                const student = qs.parse(data);
                console.log(student)
                const sql = `INSERT INTO Students (Name, Class, PoinLT, PoinTH, Evaluate, Description)values ("${student.nameAdd}",
                                 "${student.classAdd}",
                                 +${student.theoryMarkAdd},
                                 +${student.practiceMarkAdd},
                                 "${student.evaluateAdd}",
                                 "${student.describesAdd}")`;
                await this.querySQL(sql);
                res.writeHead(301, {'Location': '/'});
                return res.end();
            });
        }


}

module.exports = AuthController;