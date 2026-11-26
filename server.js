
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 8080;

app.use(express.json());

// Kết nối Database
const db = new sqlite3.Database(
    path.join(__dirname, "todo.db")
);

// Tạo bảng tasks
db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            deadline TEXT,
            priority TEXT DEFAULT 'medium',
            status TEXT DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

// Hiển thị giao diện
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "style.css"));
});

app.get("/script.js", (req, res) => {
    res.sendFile(path.join(__dirname, "script.js"));
});

// Kiểm tra dữ liệu công việc
function validTask(task) {
    return typeof task.title === "string"
        && task.title.trim().length > 0
        && ["low", "medium", "high"].includes(task.priority)
        && ["pending", "progress", "completed"].includes(task.status);
}

// READ - Lấy danh sách công việc
app.get("/api/tasks", (req, res) => {

    db.all(
        "SELECT * FROM tasks ORDER BY id DESC",
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(rows);
        }
    );
});

// CREATE - Thêm công việc
app.post("/api/tasks", (req, res) => {

    const {
        title,
        description,
        deadline,
        priority,
        status
    } = req.body;

    if (!validTask(req.body)) {
        return res.status(400).json({
            error: "Thông tin công việc không hợp lệ"
        });
    }

    const sql = `
        INSERT INTO tasks
        (title, description, deadline, priority, status)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [
            title.trim(),
            description || "",
            deadline || "",
            priority,
            status
        ],

        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                id: this.lastID,
                message: "Thêm công việc thành công"
            });
        }
    );
});

// UPDATE - Cập nhật thông tin
app.put("/api/tasks/:id", (req, res) => {

    const id = req.params.id;

    const {
        title,
        description,
        deadline,
        priority,
        status
    } = req.body;

    if (!validTask(req.body)) {
        return res.status(400).json({
            error: "Thông tin công việc không hợp lệ"
        });
    }

    const sql = `
        UPDATE tasks
        SET title = ?,
            description = ?,
            deadline = ?,
            priority = ?,
            status = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [
            title.trim(),
            description || "",
            deadline || "",
            priority,
            status,
            id
        ],

        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Không tìm thấy công việc"
                });
            }

            res.json({
                message: "Cập nhật công việc thành công"
            });
        }
    );
});

// Cập nhật trạng thái công việc
app.patch("/api/tasks/:id/status", (req, res) => {

    const id = req.params.id;
    const { status } = req.body;

    const validStatus = [
        "pending",
        "progress",
        "completed"
    ];

    if (!validStatus.includes(status)) {
        return res.status(400).json({
            error: "Trạng thái không hợp lệ"
        });
    }

    db.run(
        "UPDATE tasks SET status = ? WHERE id = ?",
        [status, id],

        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Không tìm thấy công việc"
                });
            }

            res.json({
                message: "Cập nhật trạng thái thành công"
            });
        }
    );
});

// DELETE - Xóa công việc
app.delete("/api/tasks/:id", (req, res) => {

    const id = req.params.id;

    db.run(
        "DELETE FROM tasks WHERE id = ?",
        [id],

        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Không tìm thấy công việc"
                });
            }

            res.json({
                message: "Xóa công việc thành công"
            });
        }
    );
});

// API thống kê công việc
app.get("/api/statistics", (req, res) => {

    const sql = `
        SELECT
            COUNT(*) AS total,
            COUNT(CASE WHEN status = 'pending'
                THEN 1 END) AS pending,
            COUNT(CASE WHEN status = 'progress'
                THEN 1 END) AS progress,
            COUNT(CASE WHEN status = 'completed'
                THEN 1 END) AS completed
        FROM tasks
    `;

    db.get(sql, [], (err, row) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(row);
    });
});

// Khởi động Server
app.listen(PORT, () => {

    console.log("Server running at port=" + PORT);
    console.log("http://localhost:" + PORT);
});
