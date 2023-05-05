export const productPropValidator = (req, res, next) => {
    const product = req.body;
    if (product.title === "" || product.title === undefined || typeof product.title !== 'string') {
        res.status(404).send('invalid product title!')
    } else {
        if (product.description === "" || product.description === undefined || typeof product.description !== 'string') {
            res.status(404).send('invalid product description!')
        } else {
            if (product.code === "" || product.code === undefined || typeof product.code !== 'string') {
                res.status(404).send('invalid product code!')
            } else {
                if (product.price === 0 || product.price === undefined || typeof product.price !== 'number') {
                    res.status(404).send('invalid product price!')
                } else {
                    if (product.status === "" || product.status === undefined || typeof product.status !== 'boolean') {
                        res.status(404).send('invalid product status!')
                    } else {
                        if (product.stock === 0 || product.stock === undefined || typeof product.stock !== 'number') {
                            res.status(404).send('invalid product stock!')
                        } else {
                            if (product.category === "" || product.category === undefined || typeof product.category !== 'string') {
                                res.status(404).send('invalid product category!')
                            } else {
                                if (product.thumbnails.length < 2 || product.thumbnails === undefined || typeof product.thumbnails !== 'object') {
                                    res.status(404).send('invalid product thumbnails!')
                                } else {
                                    next()
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}