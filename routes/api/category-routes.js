const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const categoryInfo = await Category.findAll({
      include: [
        {
          model: Product,
        }
      ]
    });

    res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.get('/:id', async (req, res) => {
  try {
    const categoryInfo = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
});

if (!categoryInfo) {
  res.status(404).json({ message: 'No product found with this id' });
  return;
}

res.status(200).json(categoryInfo);
} catch (err) {
res.status(500).json(err);
}

});

router.post('/', async (req, res) => {
  try {
    const categoryInfo = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryInfo = await Category.update(req.body, {
      where: {id: req.params.id, },
    });

    if (!categoryInfo[0]) {
      res.status(404).json({ message: 'No category with this id' });
      return;
    }

    res.status(200).json(categoryInfo);
  } catch (err) {

    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
    // delete a category by its `id` value
    try {
      const categoryInfo = await Category.destroy({
        where: { id: req.params.id }
      });
      if (!categoryInfo) {
        res.status(404).json({ message: 'No category with this id!' });
        return;
      }
      res.status(200).json(categoryInfo);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
