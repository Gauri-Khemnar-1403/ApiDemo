const express = require("express");
const router = express.Router();
const service = require("../service/service");
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /check:
 *   get:
 *     summary: Returns a status message
 *     responses:
 *       200:
 *         description: Server running successfully
 */
router.get("/check", (req, res) => {
    res.status(200).json({
        status: "Success",
        code: 200,
        message: "Server running successfully",
    });
});

/**
* @swagger
* /save:
*   post:
*     summary: Post a User
*     description: Create a new user by posting user data.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: User added successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.post("/save", async (req, res) => {
    try {
        const result = await service.save(req.body);
        res.status(201).json({ data: result, message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
* @swagger  
* /all/users:
*   get:
*     summary: Get all Users
*     description: Fetching data from mongodb
*     responses:
*       200:
*         description: List of Users
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User'
*/

router.get("/all/users", async (req, res) => {
    try {
        const result = await service.getAll();
        res.status(200).json({ data: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
* @swagger
* /{id}:
*   get:
*     summary: Get a User by ID
*     description: Fetch a single user by their ID from MongoDB.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: Numeric ID of the user to fetch
*         schema:
*           type: string
*     responses:
*       200:
*         description: User found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   $ref: '#/components/schemas/User'
*/
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await service.findById(id);
        if (result) {
            res.status(200).json({ data: result });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
* @swagger
* /{id}:
*   put:
*     summary: Update a User
*     description: Update a user by their ID in MongoDB.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID of the user to update
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: User updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await service.update(id, data);
        if (result) {
            res.status(200).json({
                message: "User updated successfully",
                data: result
            });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
* @swagger
* /{id}:
*   delete:
*     summary: Delete a User
*     description: Delete a user by their ID in MongoDB.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID of the user to update
*         schema:
*           type: string
*     responses:
*       200:
*         description: User deleted successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await service.delete(id);
        if (result) {
            res.status(200).json({
                message: "User deleted successfully",
                data: result
            });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
