# การตั้งค่า Docker Hub สำหรับ CI/CD

## ขั้นตอนที่ต้องทำก่อน Push ไป GitHub

### 1. แก้ไขไฟล์ `.env`

แก้ไขไฟล์ `.env` บรรทัดนี้:

```env
DOCKER_HUB_USERNAME=your_dockerhub_username_here
```

เปลี่ยน `your_dockerhub_username_here` เป็น Docker Hub username จริงของคุณ

**ตัวอย่าง:**
```env
DOCKER_HUB_USERNAME=johnsmith
```

### 2. ตรวจสอบ GitHub Secrets

ไปที่ GitHub repository → Settings → Secrets and variables → Actions

ตรวจสอบว่ามี secrets ต่อไปนี้:
- ✅ `DOCKERHUB_USERNAME` = Docker Hub username ของคุณ
- ✅ `DOCKERHUB_TOKEN` = Personal Access Token จาก Docker Hub

### 3. Push ไปยัง GitHub

```bash
git add .
git commit -m "Setup Docker Hub CI/CD"
git push
```

### 4. ตรวจสอบ GitHub Actions

ไปที่ GitHub repository → Actions tab

ดูว่า workflow "Build and Push Docker Images" ทำงานสำเร็จหรือไม่

## วิธีทดสอบแบบ Manual (ถ้าต้องการ)

ถ้าต้องการทดสอบ build และ push เองก่อน:

```bash
# 1. Login ไป Docker Hub
docker login

# 2. Build backend image
docker build -t <YOUR_USERNAME>/e-utilities-cost-backend:latest ./backend

# 3. Push backend image
docker push <YOUR_USERNAME>/e-utilities-cost-backend:latest

# 4. Build frontend image
docker build -t <YOUR_USERNAME>/e-utilities-cost-frontend:latest ./frontend

# 5. Push frontend image
docker push <YOUR_USERNAME>/e-utilities-cost-frontend:latest
```

## สำหรับ Production Deployment

เมื่อจะ deploy บน server ให้แก้ไข `docker-compose.yml`:

```yaml
backend:
  image: <YOUR_USERNAME>/e-utilities-cost-backend:latest
  # เอา build: ./backend ออก

frontend:
  image: <YOUR_USERNAME>/e-utilities-cost-frontend:latest
  # เอา build: ./frontend ออก
```

แล้วรัน:
```bash
docker-compose pull
docker-compose up -d
```
