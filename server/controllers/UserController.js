class UserController {
    // GET /users
    static index(req, res) {
        // Menampilkan semua user
        res.json({ message: "List of users" });
    }

    // GET /users/:id
    static show(req, res) {
        // Menampilkan 1 user berdasarkan ID
        res.json({ message: "User details" });
    }

    // POST /users
    static store(req, res) {
        // Menyimpan user baru ke database
        res.json({ message: "User created successfully" });
    }

    // PUT /users/:id
    static update(req, res) {
        // Memperbarui user berdasarkan ID
        res.json({ message: "User updated successfully" });
    }

    // DELETE /users/:id
    static destroy(req, res) {
        // Menghapus user berdasarkan ID
        res.json({ message: "User deleted successfully" });
    }
}

module.exports=UserController;