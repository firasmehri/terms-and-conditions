document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('upload-form');
    const fileList = document.getElementById('file-list');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Files uploaded successfully!');
            updateFileList(data.files);
        })
        .catch(error => console.error('Error:', error));
    });

    function updateFileList(files) {
        fileList.innerHTML = '';
        files.forEach(file => {
            const div = document.createElement('div');
            div.textContent = file;
            fileList.appendChild(div);
        });
    }
});
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.fields([{ name: 'invoice' }, { name: 'terms' }, { name: 'images' }]), (req, res) => {
    const files = req.files;
    let fileNames = [];

    for (let field in files) {
        files[field].forEach(file => {
            fileNames.push(file.originalname);
        });
    }

    res.json({ files: fileNames });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});