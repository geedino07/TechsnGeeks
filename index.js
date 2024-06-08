import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";


const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
const __dirname = dirname(fileURLToPath(import.meta.url));
var title = '';
var name = '';
var content = '';


app.get("/", (req, res) => {
    fs.readFile(__dirname+"/data/title.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        title = data;
        console.log(title);
    })
        
     fs.readFile(__dirname+"/data/author.txt", "utf8", (err, data) => {
        if (err) throw err;
        name = data;
        console.log(name);
     });
     
     fs.readFile(__dirname+"/data/content.txt", "utf8", (err, data) => {
        if (err) throw err;
        content = data;
        console.log(content);
     });
    
    const body={
        title: title,
        name: name,
        text: content,
        year: new Date().getFullYear(),
    
    };
    
  res.render("index.ejs", body);
});


app.get("/edit", (req, res) => {
    fs.readFile(__dirname + "/data/title.txt", "utf8", (err, data) => {
        if (err) throw err;
        title = data;
        console.log(title);
    })
     fs.readFile(__dirname + "/data/author.txt", "utf8", (err, data) => {
        if (err) throw err;
        name = data;
        console.log(name);
    })

    fs.readFile(__dirname +"/data/content.txt", "utf8", (err, data) => {
        if (err) throw err;
        content = data;
        console.log(content);
    })

    const body = {
        title: title,
        name: name,
        text: content,
    }

    res.render("edit.ejs", body);
})

app.post("/", (req, res) => {
    fs.readFile(__dirname + "/data/title.txt", "utf8", (err, data) => {
        if (err) throw err;
        title = data;
        console.log(title);
    })
     fs.readFile(__dirname + "/data/author.txt", "utf8", (err, data) => {
        if (err) throw err;
        name = data;
        console.log(name);
    })

    fs.readFile(__dirname +"/data/content.txt", "utf8", (err, data) => {
        if (err) throw err;
        content = data;
        console.log(content);
    })

   
    
    const body={
        title: req.body["title"],
        name: req.body["name"],
        text: req.body["text"],
        year: new Date().getFullYear(),
        submit: req.body["submit"],

    };

    const body2={
        title: title,
        name: name,
        text: content,
        year: new Date().getFullYear(),
        submit: req.body["submit"],
    }

    if (body.submit === "SUBMIT"){
        fs.writeFile(__dirname+"/data/title.txt", body.title, (err) => {
            if (err) throw err;
        });
        fs.writeFile(__dirname+"/data/author.txt", body.name, (err) => {
            if (err) throw err;
        });
        fs.writeFile(__dirname+"/data/content.txt", body.text, (err) => {
            if (err) throw err;
        });
        res.render("index.ejs", body);
        console.log(`${body.title} ${body.name} ${body.text} ${body.year} ${body.submit}`);
    } else {
        res.render("index.ejs", body2);
    }
});


app.listen(port,() => {
    console.log(`Server running on port ${port}`);
});