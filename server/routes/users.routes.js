const express = require("express");
const router = express.Router();
const db = require("../utils/database");

router.post("/todo", async (req, res) => {
    try {
        let { name, status } = req.body;
        let data = await db.execute(
            `INSERT INTO users( name, status) VALUE(?, ?)`,
            [name, status]
        );
        res.json({
            message: "them thanh cong",
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/todo", async (req, res) => {
    try {
        let data = await db.execute("SELECT * FROM users");
        let [row] = data;
        res.json({
            users: row,
        });
    } catch (error) {
        res.json({
            message: "Get all users",
        });
    }
});

router.put("/todo/:id", async (req, res) => {
    const { id } = req.params;
    const { name, status } = req.body;

    try {
        const [row] = await db.execute(
            `SELECT * FROM users WHERE users_id = ?`,
            [id]
        );

        if (row.length === 0) {
            return res.json({
                message: "Không tìm thấy người dùng để cập nhật.",
            });
        }

        await db.execute(
            `UPDATE users SET name = ?, status = ? WHERE users_id = ?`,
            [name || row[0].name, status || row[0].status, id]
        );

        return res.json({
            message: "Cập nhật thông tin người dùng thành công.",
        });
    } catch (error) {
        return res.json({ error: error });
    }
});

router.delete("/todo/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute("DELETE FROM users WHERE users_id = ?", [id]);
        let data = await db.execute("SELECT * FROM users");
        res.json({
            message: "Đã delete thành công",
            user: data[0],
        });
    } catch (error) {
        res.json({
            message: "Delete one users",
        });
    }
});

module.exports = router;
