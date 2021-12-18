const fs = require('fs');

module.exports = {
    
    getMovie( req, res ){
        const { movieId } = req.params;
        
        const movie = `./contents/${movieId}.mp4`;
        
        fs.stat( movie, (err,stats) => {
            if (err) {
                console.log(err);
                return res.status(404).send('<h1>Movie Not found</h1>');
            }
            const { range } = req.headers;
            const { size } = stats;
            const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
            const end = size - 1;
            const chunkSize = (end - start) + 1;
            
            res.set({
                'Content-Range': `bytes ${start}-${end}/${size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4'
            });
            // status 206 - Partial Content para o streaming
            res.status(206);
            const stream = fs.createReadStream(movie, { start, end });
            stream.on('open', () => stream.pipe(res));
            stream.on('error', (streamErr) => res.end(streamErr));
        });
    }
    
}