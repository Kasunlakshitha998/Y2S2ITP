const router = require('express').Router();
let Product = require('../../models/Inventory_Management/product');
const cloudinary = require('../../Utils/cloudinary');

//add product
router.route('/add').post(async (req, res) => {
  try {
    const name = req.body.name;
    const image = req.body.image;
    const category = req.body.category;
    const brand = req.body.brand;
    const price = Number(req.body.price);
    const countInStock = Number(req.body.countInStock);
    const description = req.body.description;

    // Upload image to cloudinary
    const uploadRes = await cloudinary.uploader.upload(image, {
      upload_preset: 'Online-Mobile-Shop',
    });

    const newProduct = new Product({
      name,
      image: uploadRes,
      category,
      brand,
      price,
      countInStock,
      description,
    });

    // Save the new product to the database
    await newProduct.save();
    res.json('Product added successfully');
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});


//Get All products
router.route('/').get((req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update product
router.route('/update/:id').put(async (req, res) => {
  //get product id
  let productId = req.params.id;
  const { name, image, category, brand, price, countInStock, description } =
    req.body;

  try {
    const uploadRes = await cloudinary.uploader.upload(image, {
      upload_preset: 'Online-Mobile-Shop',
    });
  } catch (error) {
    console.log(error);
  }
  
  const updateProduct = {
    name,
    image,
    category,
    brand,
    price,
    countInStock,
    description,
  };

  const update = await Product.findByIdAndUpdate(productId, updateProduct)
    .then((product) => {
      res.status(200).send({ status: 'Product update', product });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: 'Error with updatind data' });
    });
});

//Delete product
router.route('/delete/:id').delete(async (req, res) => {
  let productId = req.params.id;

  await Product.findByIdAndDelete(productId)
    .then(() => {
      res.status(200).send({ status: 'Product Delete' });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: 'Error with delete product', error: err.message });
    });
});

//get one product data
router.route('/getProduct/:id').get(async (req, res) => {
  try {
    let productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ status: 'Product not found' });
    }
    res.status(200).send({ status: 'Product fetched', product });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send({ status: 'Error with fetching product', error: err.message });
  }
});


module.exports = router;
