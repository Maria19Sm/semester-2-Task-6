const express = require('express');
const router = express.Router();

// Модель ресурсів (імітація бази даних)
let resources = [
    { id: 1, name: "Resource 1" },
    { id: 2, name: "Resource 2" },
    { id: 3, name: "Resource 3" }
];

// GET всіх ресурсів
router.get('/', function (req, res, next) {
    res.json(resources);
});

// GET ресурсу за ідентифікатором
router.get('/:id', function(req, res){
    const id = parseInt(req.params.id);
    const resource = resources.find(r => r.id === id);
    if (resource) {
        res.json(resource);
    } else {
        res.status(404).json({ message: "Ресурс не знайдено" });
    }
});

// Створення нового ресурсу
router.post('/', async function(req, res){
    const newData = req.body;
    const newResourceId = resources.length + 1;
    const newResource = { id: newResourceId, ...newData };
    resources.push(newResource);
    res.status(201).json(newResource);
});

// Оновлення існуючого ресурсу
router.patch('/:id', async function(req, res){
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    const index = resources.findIndex(r => r.id === id);
    if (index !== -1) {
        resources[index] = { id, ...updatedData };
        res.json({ id, ...updatedData });
    } else {
        res.status(404).json({ message: "Ресурс не знайдено" });
    }
});

// Видалення ресурсу за ідентифікатором
router.delete('/:id', async function(req, res){
    const id = parseInt(req.params.id);
    resources = resources.filter(r => r.id !== id);
    res.sendStatus(204);
});

module.exports = router;
