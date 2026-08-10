# Script สำหรับตั้งค่า Docker Hub Username
# ใช้สคริปต์นี้เพื่อตั้งค่า Docker Hub username ในไฟล์ .env

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Docker Hub Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# อ่าน Docker Hub username จากผู้ใช้
$username = Read-Host "กรุณาใส่ Docker Hub username ของคุณ"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "❌ กรุณาใส่ Docker Hub username" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "กำลังอัปเดตไฟล์ .env..." -ForegroundColor Yellow

# อ่านไฟล์ .env
$envFile = ".env"
$envContent = Get-Content $envFile

# แทนที่บรรทัด DOCKER_HUB_USERNAME
$newContent = $envContent | ForEach-Object {
    if ($_ -match "^DOCKER_HUB_USERNAME=") {
        "DOCKER_HUB_USERNAME=$username"
    } else {
        $_
    }
}

# เขียนกลับไฟล์
$newContent | Set-Content $envFile

Write-Host "✅ อัปเดตไฟล์ .env เรียบร้อยแล้ว" -ForegroundColor Green
Write-Host ""
Write-Host "Docker Hub username ของคุณ: $username" -ForegroundColor Cyan
Write-Host ""
Write-Host "ขั้นตอนถัดไป:" -ForegroundColor Yellow
Write-Host "1. ตรวจสอบว่าตั้งค่า GitHub Secrets แล้ว (DOCKERHUB_USERNAME, DOCKERHUB_TOKEN)" -ForegroundColor White
Write-Host "2. Push code ไปยัง GitHub:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Setup Docker Hub CI/CD'" -ForegroundColor Gray
Write-Host "   git push" -ForegroundColor Gray
Write-Host "3. ตรวจสอบ GitHub Actions ที่ repository ของคุณ" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
