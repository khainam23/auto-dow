const express = require('express');
const path = require('path');
const app = express();
const PORT = 3021;

// Route download trực tiếp, giống Google Drive
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'files', filename);

    // res.download gửi header Content-Disposition để trình duyệt tải file
    res.download(filePath, filename, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('File không tồn tại!');
        }
    });
});

// Route root: HTML tự redirect sang link download
app.get('/', (req, res) => {
    const fileName = 'abc.js';
    res.send(`
        <script>
                // Khi trang load, redirect sang /download/...
                window.onload = function() {
                    window.location.href = '/download/${fileName}';
                };
            </script>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
