const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

// Mengambil data '/comments' dari API JSONPlaceholder
app.get('/comments', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        const data = response.data;

        let tableHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Data Comments (Node.js)</title>
        <style>
                /* Mengatur tampilan dasar body */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
            color: #333;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
        }

        /* Styling untuk heading */
        h1 {
            text-align: center;
            font-size: 2.5rem;
            color: #000000;
            margin-bottom: 30px;
            letter-spacing: 1px;
        }

        /* Styling tabel */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background-color: #fff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        /* Mengatur border dan padding pada tabel */
        table, th, td {
            border: 1px solid #ddd;
        }

        th, td {
            padding: 16px 20px;
            text-align: left;
            font-size: 0.95rem;
        }

        /* Warna header tabel */
        th {
            background-color: #000000;
            color: white;
            text-transform: uppercase;
            font-size: 1rem;
            letter-spacing: 0.05rem;
        }

        /* Menampilkan garis dan efek hover pada baris tabel */
        tr {
            transition: background-color 0.3s ease;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tr:hover {
            background-color: #f1f1f1;
            cursor: pointer;
        }

        /* Styling untuk email agar terlihat sedikit lebih menonjol */
        td:nth-child(4) {
            font-style: italic;
            color: #555;
        }

        /* Responsif untuk layar kecil */
        @media (max-width: 768px) {
            table, thead, tbody, th, td, tr {
                display: block;
            }

            thead {
                display: none;
            }

            tr {
                margin-bottom: 10px;
            }

            td {
                text-align: right;
                padding-left: 50%;
                position: relative;
                white-space: normal;
            }

            td::before {
                content: attr(data-label);
                position: absolute;
                left: 10px;
                padding-right: 10px;
                font-weight: bold;
                text-transform: uppercase;
            }

            td:nth-child(1)::before { content: "Post ID"; }
            td:nth-child(2)::before { content: "ID"; }
            td:nth-child(3)::before { content: "Name"; }
            td:nth-child(4)::before { content: "Email"; }
            td:nth-child(5)::before { content: "Comment"; }
        }
        </style>
        </head>
        <body>
        <h1>Data Comments dari JSONPlaceholder API (Node.js)</h1>
        <table>
        <thead>
        <tr>
        <th>Post ID</th>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Comment</th>
        </tr>
        </thead>
        <tbody>`;

        // Looping untuk setiap comment dan menambahkan ke tabel
        data.forEach(comment => {
            tableHTML += `<tr>
            <td>${comment.postId}</td>
            <td>${comment.id}</td>
            <td>${comment.name}</td>
            <td>${comment.email}</td>
            <td>${comment.body}</td>
            </tr>`;
        });

        tableHTML += `</tbody>
        </table>
        </body>
        </html>`;
        
        // Kirim respons HTML ke browser
        res.send(tableHTML);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});