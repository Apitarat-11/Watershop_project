# main.py

from fastapi import FastAPI
from pydantic import BaseModel

# สร้างแอป FastAPI
app = FastAPI()

# สร้างโมเดลสำหรับรับข้อมูลจากฟอร์ม login
class LoginForm(BaseModel):
    email: str
    password: str

# สร้าง endpoint สำหรับทดสอบ
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

# ตัวอย่าง endpoint สำหรับการ login
@app.post("/login")
def login(form_data: LoginForm):
    # ทดสอบการล็อกอินด้วยข้อมูลที่ส่งมา
    if form_data.email == "user@example.com" and form_data.password == "password123":
        return {"message": "Login successful"}
    else:
        return {"message": "Invalid credentials"}
