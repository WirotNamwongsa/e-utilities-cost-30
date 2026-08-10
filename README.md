# ระบบติดตามค่าสาธารณูปโภค (Utility Expense Tracking System)

ระบบเว็บแอปพลิเคชันสำหรับบันทึก ติดตาม และสรุปรายงานค่าสาธารณูปโภคของหน่วยงาน/สถานศึกษา รองรับการเบิกจ่ายจากหลายหมวดเงินงบประมาณ พร้อม Dashboard สรุปยอดรายเดือนและดูข้อมูลย้อนหลัง

## ฟีเจอร์หลัก (Main Features)

- ✅ บันทึกรายการค่าใช้จ่ายสาธารณูปโภคแยกตามประเภท
- ✅ ผูกรายการค่าใช้จ่ายกับหมวดเงินงบประมาณที่ใช้จ่าย
- ✅ แสดง Dashboard สรุปยอดรายเดือน เปรียบเทียบย้อนหลัง
- ✅ จัดการ (CRUD) ข้อมูลรายการค่าใช้จ่ายและหมวดเงิน
- ✅ ระบบสมาชิก Login/Logout ด้วย JWT
- ✅ กราฟและแผนภูมิสรุปข้อมูล
- ✅ รองรับ Responsive Design (Desktop, Tablet, Mobile)
- ✅ Deploy ด้วย Docker และ Docker Compose

## เทคโนโลยีที่ใช้ (Tech Stack)

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: MariaDB
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: express-validator

### Frontend
- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **Charts**: Chart.js + vue-chartjs
- **Date Handling**: date-fns

### DevOps
- **Containerization**: Docker + Docker Compose
- **Web Server**: Nginx (for frontend)
- **Database Admin**: phpMyAdmin

## โครงสร้างโปรเจกต์ (Project Structure)

```
e-utilities-cost/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # Database configuration
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── expenseCategory.model.js
│   │   │   ├── budgetCategory.model.js
│   │   │   ├── expense.model.js
│   │   │   └── index.js              # Model associations
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── expense.controller.js
│   │   │   ├── expenseCategory.controller.js
│   │   │   ├── budgetCategory.controller.js
   │   │   │   └── dashboard.controller.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── expense.routes.js
│   │   │   ├── category.routes.js
│   │   │   └── dashboard.routes.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── error.middleware.js
│   │   ├── seeders/
│   │   │   └── seed.js               # Database seed data
│   │   ├── app.js
│   │   └── server.js
│   ├── Dockerfile
│   ├── package.json
│   └── .dockerignore
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── main.css
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.vue
│   │   │   │   └── Sidebar.vue
│   │   │   ├── charts/
│   │   │   │   ├── MonthlyChart.vue
│   │   │   │   ├── CategoryChart.vue
│   │   │   │   ├── BudgetChart.vue
│   │   │   │   └── ComparisonChart.vue
│   │   │   └── forms/
│   │   ├── views/
│   │   │   ├── LoginView.vue
│   │   │   ├── DashboardView.vue
│   │   │   ├── ExpenseListView.vue
│   │   │   ├── ExpenseFormView.vue
│   │   │   ├── CategoryManageView.vue
│   │   │   └── ReportHistoryView.vue
│   │   ├── stores/
│   │   │   ├── auth.js
│   │   │   ├── expense.js
│   │   │   └── category.js
│   │   ├── router/
│   │   │   └── index.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── auth.service.js
│   │   ├── App.vue
│   │   └── main.js
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── docker-compose.yml
├── .env.example
├── .env
├── .gitignore
└── README.md
```

## การติดตั้ง (Installation)

### ข้อกำหนดเบื้องต้น (Prerequisites)

- Node.js >= 20.x
- npm >= 9.x
- Docker >= 20.x
- Docker Compose >= 2.x

### ติดตั้งด้วย Docker (แนะนำ)

1. **โคลนโปรเจกต์**
```bash
git clone <repository-url>
cd e-utilities-cost
```

2. **สร้างไฟล์ Environment**
```bash
cp .env.example .env
```

3. **แก้ไขค่า Configuration ใน `.env`**
```env
DB_ROOT_PASSWORD=your_secure_password
DB_USER=eutilities_user
DB_PASSWORD=your_secure_password
JWT_SECRET=your_super_secret_jwt_key
DOCKER_HUB_USERNAME=your_dockerhub_username
```

4. **รันระบบด้วย Docker Compose**
```bash
docker-compose up -d
```

5. **รอให้ Database พร้อม แล้ว Seed ข้อมูลเริ่มต้น**
```bash
docker-compose exec backend npm run seed
```

6. **เข้าใช้งานระบบ**
- Frontend: http://localhost:8080
- Backend API: http://localhost:3000
- phpMyAdmin: http://localhost:8081

### ติดตั้งแบบ Development (Local)

1. **ติดตั้ง Dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

2. **ตั้งค่า Environment**
```bash
# สร้างไฟล์ .env จาก .env.example
cp .env.example .env

# แก้ไขค่าต่างๆ ตามที่ต้องการ
```

3. **เริ่ม Database (ด้วย Docker)**
```bash
docker-compose up -d mariadb phpmyadmin
```

4. **รัน Backend**
```bash
cd backend
npm run dev
```

5. **รัน Frontend**
```bash
cd frontend
npm run dev
```

6. **Seed ข้อมูลเริ่มต้น**
```bash
cd backend
npm run seed
```

## การใช้งาน (Usage)

### Default Credentials

- **Username**: `admin`
- **Password**: `admin123`

### หน้าจอหลัก (Main Pages)

1. **Dashboard** (`/`) - สรุปยอดรายเดือน กราฟ และสถิติ
2. **รายการค่าใช้จ่าย** (`/expenses`) - จัดการรายการค่าใช้จ่าย
3. **เพิ่ม/แก้ไขค่าใช้จ่าย** (`/expenses/create`, `/expenses/:id/edit`)
4. **จัดการประเภทค่าใช้จ่าย** (`/settings/expense-categories`) - *Admin only*
5. **จัดการหมวดเงินงบประมาณ** (`/settings/budget-categories`) - *Admin only*
6. **รายงานย้อนหลัง** (`/reports`) - เปรียบเทียบข้อมูลระหว่างปี

## API Documentation

### Authentication

#### POST `/api/auth/login`
```json
{
  "username": "admin",
  "password": "admin123"
}
```

#### POST `/api/auth/logout`
Headers: `Authorization: Bearer <token>`

#### POST `/api/auth/refresh`
Refresh access token using httpOnly cookie

#### GET `/api/auth/me`
Get current user information

### Expenses

#### GET `/api/expenses`
Query params: `month`, `year`, `expense_category_id`, `budget_category_id`, `page`, `limit`

#### POST `/api/expenses`
```json
{
  "expense_category_id": 1,
  "budget_category_id": 1,
  "amount": 1500.00,
  "billing_month": "2024-01-01",
  "paid_date": "2024-01-15",
  "invoice_no": "INV001",
  "note": "ค่าไฟฟ้าเดือนมกราคม"
}
```

#### GET `/api/expenses/:id`
#### PUT `/api/expenses/:id`
#### DELETE `/api/expenses/:id`

### Categories

#### Expense Categories
- GET `/api/expense-categories`
- POST `/api/expense-categories` (Admin only)
- PUT `/api/expense-categories/:id` (Admin only)
- DELETE `/api/expense-categories/:id` (Admin only)

#### Budget Categories
- GET `/api/budget-categories`
- POST `/api/budget-categories` (Admin only)
- PUT `/api/budget-categories/:id` (Admin only)
- DELETE `/api/budget-categories/:id` (Admin only)

### Dashboard

#### GET `/api/dashboard/summary?year=2024`
Get monthly summary and year-to-date totals

#### GET `/api/dashboard/by-category?year=2024`
Get expense breakdown by category

#### GET `/api/dashboard/by-budget?year=2024`
Get expense breakdown by budget category

#### GET `/api/dashboard/compare?year1=2023&year2=2024`
Compare expenses between two years

## การ Deploy ด้วย Docker

### Build Images

```bash
# Build backend image
docker build -t <your-dockerhub-username>/e-utilities-cost-backend:latest ./backend

# Build frontend image
docker build -t <your-dockerhub-username>/e-utilities-cost-frontend:latest ./frontend
```

### Push to Docker Hub

```bash
docker push <your-dockerhub-username>/e-utilities-cost-backend:latest
docker push <your-dockerhub-username>/e-utilities-cost-frontend:latest
```

### แก้ไข docker-compose.yml

อัปเดต image names ใน `docker-compose.yml`:

```yaml
backend:
  image: <your-dockerhub-username>/e-utilities-cost-backend:latest

frontend:
  image: <your-dockerhub-username>/e-utilities-cost-frontend:latest
```

### Deploy ไปยัง Server

```bash
# Copy files to server
scp -r . user@server:/path/to/e-utilities-cost

# SSH to server
ssh user@server

# Navigate to project directory
cd /path/to/e-utilities-cost

# Update .env with production values
# Then run
docker-compose up -d
```

## ฐานข้อมูล (Database)

### ตารางหลัก (Main Tables)

1. **users** - ข้อมูลผู้ใช้งาน
2. **expense_categories** - ประเภทค่าใช้จ่าย (ไฟฟ้า, น้ำประปา, อินเทอร์เน็ต ฯลฯ)
3. **budget_categories** - หมวดเงินงบประมาณ (ปวช., ปวส., เงินรายได้)
4. **expenses** - รายการค่าใช้จ่าย

### Seed Data ข้อมูลเริ่มต้น

- **ผู้ใช้**: admin (password: admin123)
- **ประเภทค่าใช้จ่าย**: ค่าไฟฟ้า, ค่าพลังงาน, ค่าน้ำประปา, ค่าอินเทอร์เน็ต, ค่าโทรศัพท์, ค่าไปรษณีย์, ค่าทิ้งขยะ
- **หมวดเงินงบประมาณ**: งบประมาณ (ปวช.), งบประมาณ (ปวส.), เงินรายได้สถานศึกษา

## ความปลอดภัย (Security)

- ✅ Password hashing ด้วย bcrypt
- ✅ JWT authentication พร้อม refresh token
- ✅ Rate limiting ป้องกัน brute force
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ Input validation
- ✅ SQL injection prevention (ORM)
- ⚠️ **ควรใช้ HTTPS ใน production**

## การพัฒนาต่อ (Future Enhancements)

- [ ] Export รายงานเป็น PDF/Excel
- [ ] ระบบแจ้งเตือนเมื่อค่าใช้จ่ายสูงเกินกำหนด
- [ ] ระบบแนบไฟล์ใบเสร็จ/สลิปโอนเงิน
- [ ] Multi-branch / multi-site support
- [ ] Role-based permission ละเอียดขึ้น
- [ ] Mobile App (React Native / Flutter)

## การแก้ไขปัญหา (Troubleshooting)

### Database connection failed
- ตรวจสอบว่า MariaDB container รันอยู่
- ตรวจสอบค่า DB_HOST, DB_USER, DB_PASSWORD ใน .env
- รอสักครู่ให้ database พร้อม (ประมาณ 10-15 วินาที)

### Frontend ไม่สามารถเชื่อมต่อ API
- ตรวจสอบว่า backend container รันอยู่
- ตรวจสอบ CORS configuration
- ตรวจสอบ proxy settings ใน vite.config.js

### JWT Token expired
- ระบบจะ auto-refresh token โดยอัตโนมัติ
- ถ้ายังไม่ได้ ให้ logout แล้ว login ใหม่

## License

ISC

## ผู้พัฒนา (Developers)

- Developed with ❤️ using Vue 3, Express.js, and MariaDB
- Docker-based deployment for easy setup and scaling
