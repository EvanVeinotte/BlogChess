const express = require('express');
const upload = require('express-fileupload');
const {exec} = require('child_process');

const app = express();
app.use(express.static(__dirname + '/public/'));
app.use(upload());

const PASSWORD = 'XoXot1rd';
var uploadunlocked = false;

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/', (req,res) => {
    if(req.body.mytext){
        let pswd = req.body.mytext;
        console.log(pswd);
        
        if(pswd === PASSWORD){
            console.log('password correct');
            uploadunlocked = true;
            res.redirect('/uploadfile')
        }
        else{
            console.log('password incorrect');
            res.send('password incorrect');
        }
        
    }
});

app.get('/uploadfile', (req,res) => {
    res.sendFile(__dirname + '/public/upload.html');
});

app.post('/uploadfile', (req,res) => {
    if(req.files){
        var file = req.files.file;
        var filename = file.name;
        console.log(filename)

        if(uploadunlocked){
            uploadunlocked = false;
            let downloadpath;
            if(filename.split(".")[1] === "md"){
                downloadpath = '../ChesstopiaBlog/_articles/';
            }
            else{
                downloadpath = '../ChesstopiaBlog/app/assets/';
            }
            file.mv(downloadpath + filename, (err) => {
                if(err){
                    res.send(err);
                }
                else{
                    res.send('File Uploaded');
                }
            });
        }
        else{
            res.send('Uploading Is Locked You Hacker Scum');
        }
    }
});

app.listen('5000', () => {console.log('listening on port 5000')});