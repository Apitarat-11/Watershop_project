<?php
include 'db.php';  // เชื่อมต่อกับฐานข้อมูล

header("Access-Control-Allow-Origin: *");  // Allow all domains to access
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");  // Allow POST and GET requests
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Allow these headers
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$email = $_POST['email'];
$password = $_POST['password'];

// ตรวจสอบข้อมูลในฐานข้อมูล
$sql = "SELECT * FROM users WHERE email = ? LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    // ตรวจสอบรหัสผ่าน
    if (password_verify($password, $user['password'])) {
        echo json_encode(["status" => "success", "message" => "Login successful"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
}

$stmt->close();
$conn->close();
?>
