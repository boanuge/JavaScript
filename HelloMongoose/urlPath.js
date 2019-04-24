module.exports = function (server, BookSchema) {
    // GET ALL BOOKS
    server.get('/api/books', function (req, res) {
        BookSchema.find(function (err, docs) {
            if (err) return res.status(500).send({ error: err });
            res.json(docs);
        })
    });

    // GET SINGLE BOOK
    server.get('/api/books/:title', function (req, res) {
        BookSchema.findOne({ title: req.params.title }, function (err, doc) {
            if (err) return res.status(500).json({ error: err });
            if (!doc) return res.status(404)
                .json({ error: 'Not Found: ' + req.params.title });
            res.json(doc);
        })
    });

    // GET BOOK BY AUTHOR
    server.get('/api/books/author/:author', function (req, res) {
        BookSchema.find({ author: req.params.author }
            , { _id: 0, title: 1, published_date: 1 }
            , function (err, docs) {
                if (err) return res.status(500).json({ error: err });
                if (docs.length === 0) return res.status(404)
                    .json({ error: 'Not Found: ' + req.params.author });
                res.json(docs);
            })
    });

    // CREATE BOOK
    server.post('/api/books', function (req, res) {
        var doc = new BookSchema();
        doc.title = req.body.title;
        doc.author = req.body.author;
        doc.published_date = new Date(); //Today

        doc.save(function (err) {
            if (err) {
                console.error(err);
                res.json({ result: "Failed" });
                return;
            }
            res.json({ result: "Successful" });
        });
    });

    // UPDATE THE BOOK
    server.put('/api/books/:title', function (req, res) {
        BookSchema.findOne({ title: req.params.title }, function (err, doc) {
            if (err) return res.status(500).json({ error: err });
            if (!doc) return res.status(404)
                .json({ error: 'Not Found: ' + req.params.title });

            if (req.body.title) doc.title = req.body.title;
            if (req.body.author) doc.author = req.body.author;
            if (req.body.published_date) doc.published_date = req.body.published_date;

            doc.save(function (err) {
                if (err) res.status(500).json({ error: err });
                res.json({ message: 'Updated: ' + req.params.title });
            });
        });
    });

    // DELETE BOOK
    server.delete('/api/books/:title', function (req, res) {
        BookSchema.deleteOne({ title: req.params.title }, function (err, doc) {
            if (err) return res.status(500).json({ error: err });
            if (doc.deletedCount == 0) return res.status(404)
                .json({ error: 'Not Found: ' + req.params.title });
            res.status(200).json({ message: 'Deleted: ' + req.params.title });
        })
    });
}
