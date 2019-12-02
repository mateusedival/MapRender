function RandomizaHeightMap (x, y) 
{
    let mat = [];

    for (let i = 0; i < x; i++)
    {
        let line = [];

        for (let j = 0; j < y; j++)
        {
            let value = Math.floor (Math.random() * 256);
            
            line.push (value);
        }

        mat.push (line);
    }

    return mat;
}
