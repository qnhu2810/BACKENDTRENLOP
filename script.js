
const API = "/api/tasks";

let tasks = [];

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const search = document.getElementById("search");
const filterStatus = document.getElementById("filterStatus");

// Gửi yêu cầu đến Backend
async function request(url, options = {}) {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Có lỗi xảy ra");
    }

    return data;
}

// Bảo vệ dữ liệu khi hiển thị HTML
function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

// Lấy dữ liệu công việc
async function loadTasks() {
    try {
        tasks = await request(API);

        renderTasks();
        updateStatistics();

    } catch (error) {
        alert("Không thể kết nối Backend: " + error.message);
    }
}

// Hiển thị danh sách công việc
function renderTasks() {

    const keyword = search.value.toLowerCase().trim();
    const status = filterStatus.value;

    const filteredTasks = tasks.filter(task => {
        return task.title.toLowerCase().includes(keyword)
            && (status === "all" || task.status === status);
    });

    taskList.innerHTML = "";

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <tr>
                <td colspan="7" class="empty">
                    Không có công việc nào
                </td>
            </tr>
        `;
        return;
    }

    const priorities = {
        low: "Thấp",
        medium: "Trung bình",
        high: "Cao"
    };

    filteredTasks.forEach((task, index) => {

        const priority = ["low", "medium", "high"].includes(task.priority)
            ? task.priority
            : "medium";

        taskList.innerHTML += `
            <tr>
                <td>${index + 1}</td>

                <td class="${task.status === "completed" ? "done" : ""}">
                    ${escapeHTML(task.title)}
                </td>

                <td>${escapeHTML(task.description)}</td>

                <td>${escapeHTML(task.deadline || "Chưa đặt")}</td>

                <td class="priority-${priority}">
                    ${priorities[priority]}
                </td>

                <td>
                    <select onchange="updateStatus(${task.id}, this.value)">

                        <option value="pending"
                            ${task.status === "pending" ? "selected" : ""}>
                            Chưa thực hiện
                        </option>

                        <option value="progress"
                            ${task.status === "progress" ? "selected" : ""}>
                            Đang thực hiện
                        </option>

                        <option value="completed"
                            ${task.status === "completed" ? "selected" : ""}>
                            Hoàn thành
                        </option>

                    </select>
                </td>

                <td>
                    <button class="btn-edit"
                        onclick="editTask(${task.id})">
                        Sửa
                    </button>

                    <button class="btn-delete"
                        onclick="deleteTask(${task.id})">
                        Xóa
                    </button>
                </td>
            </tr>
        `;
    });
}

// Thêm và sửa công việc
taskForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const id = document.getElementById("taskId").value;

    const task = {
        title: document.getElementById("title").value.trim(),
        description: document.getElementById("description").value,
        deadline: document.getElementById("deadline").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value
    };

    if (!task.title) {
        alert("Vui lòng nhập tên công việc");
        return;
    }

    try {
        await request(id ? `${API}/${id}` : API, {
            method: id ? "PUT" : "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(task)
        });

        resetForm();
        await loadTasks();

    } catch (error) {
        alert(error.message);
    }
});

// Hiển thị thông tin cần chỉnh sửa
function editTask(id) {

    const task = tasks.find(item => item.id === id);

    if (!task) return;

    document.getElementById("taskId").value = task.id;
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description || "";
    document.getElementById("deadline").value = task.deadline || "";
    document.getElementById("priority").value = task.priority;
    document.getElementById("status").value = task.status;

    document.getElementById("formTitle").textContent =
        "Chỉnh sửa công việc";

    document.getElementById("submitBtn").textContent =
        "Lưu thay đổi";

    document.getElementById("cancelBtn").hidden = false;

    taskForm.scrollIntoView({
        behavior: "smooth"
    });
}

// Xóa công việc
async function deleteTask(id) {

    if (!confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
        return;
    }

    try {
        await request(`${API}/${id}`, {
            method: "DELETE"
        });

        if (document.getElementById("taskId").value == id) {
            resetForm();
        }

        await loadTasks();

    } catch (error) {
        alert(error.message);
    }
}

// Cập nhật trạng thái
async function updateStatus(id, status) {

    try {
        await request(`${API}/${id}/status`, {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ status })
        });

        await loadTasks();

        if (document.getElementById("taskId").value == id) {
            document.getElementById("status").value = status;
        }

    } catch (error) {
        alert(error.message);
        renderTasks();
    }
}

// Thống kê công việc
function updateStatistics() {

    const total = tasks.length;

    const pending = tasks.filter(
        task => task.status === "pending"
    ).length;

    const progress = tasks.filter(
        task => task.status === "progress"
    ).length;

    const completed = tasks.filter(
        task => task.status === "completed"
    ).length;

    document.getElementById("total").textContent = total;
    document.getElementById("pending").textContent = pending;
    document.getElementById("progress").textContent = progress;
    document.getElementById("completed").textContent = completed;

    const percentage = total === 0
        ? 0
        : Math.round(completed / total * 100);

    document.getElementById("percentage").textContent =
        percentage + "%";

    document.getElementById("progressFill").style.width =
        percentage + "%";
}

// Đặt lại form
function resetForm() {

    taskForm.reset();

    document.getElementById("taskId").value = "";

    document.getElementById("formTitle").textContent =
        "Thêm công việc mới";

    document.getElementById("submitBtn").textContent =
        "+ Thêm công việc";

    document.getElementById("cancelBtn").hidden = true;
}

// Tìm kiếm
search.addEventListener("input", renderTasks);

// Lọc trạng thái
filterStatus.addEventListener("change", renderTasks);

// Hủy chỉnh sửa
document.getElementById("cancelBtn")
    .addEventListener("click", resetForm);

// Tải dữ liệu khi mở website
loadTasks();
