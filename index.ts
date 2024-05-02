import express, { Request, Response } from 'express';
import multer from 'multer';
import md5 from "./md5";

const app = express();
const port = 80;
const upload = multer();

app.use(express.static('public'));

// String MD5 hash generation
app.get('/hash/string', (req: Request, res: Response) => {
    const inputString = req.query.text;
    if (!inputString) {
        return res.status(400).send('Missing "text" query parameter');
    }

    const hash = md5(toUtf8(inputString as string));
    res.send({ hash });
});

function toUtf8(str: string) {
    if (/[\u0080-\uFFFF]/.test(str)) {
        str = unescape(encodeURIComponent(str));
    }
    return str;
}

// File MD5 Hash Generation
app.post('/hash/file', upload.single('file'), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send('Missing "file" in upload');
    }

    const hash = md5(req.file.buffer.toString());
    res.send({ hash });
});

// MD5 Hash Comparison
app.get('/hash/compare', (req: Request, res: Response) => {
    const hash1 = req.query.hash1;
    const hash2 = req.query.hash2;

    if (!hash1 || !hash2) {
        return res.status(400).send('Missing "hash1" or "hash2" query parameter');
    }

    const match = hash1 === hash2;
    res.send({ match });
});

app.listen(port, () => {
    console.log(`MD5 Hash Generator listening on port ${port}`);
});
