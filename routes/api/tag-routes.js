const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll()
    .then(dbTag => res.json(dbTag))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData ) {
      res.status(404).json({ message: "no tag with this is"})
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag) => {
    res.status(200)
    .json(tag)
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((updatedTag) => {
    if (!updatedTag) {
      res.status(400).json({ message: 'no id found to update tag'})
      return; 
    }
    res.json(updatedTag)
  })
  .catch((err) => {
    res.status(400).json(err);
    console.log(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbTag => {
    if (!dbTag) {
      res.status(400).json({ message: "no id found to delete"})
      return
    }
    res.json(dbTag)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err) 
  })
});

module.exports = router;
