# Empower International Academy
## Student Transportation Management System

**Professional, User-Friendly Transport Management Solution**

---

## 🎨 Brand Colors

- **Navy Blue** (#003366) - Primary color
- **White** (#FFFFFF) - Background and text  
- **Green** (#7EC845) - Success and accents

---

## ✨ Key Features

### 🔐 Secure Authentication
- Professional login page with Empower Academy logo
- **Username:** Isaac Aijuka
- **Password:** EIA2026001

### 📋 Student Management
- Add students: Name, Year (8-13), Fee, Residence, Payment Status
- Real-time payment toggle switches
- Delete with confirmation
- Automatic data persistence

### 🎯 Smart Residence Detection
- **NEW residence** → Navy Blue notification 🔵
- **Existing residence** → Green notification 🟢
- **Auto-opens residence-specific print preview**

### 📊 Analytics Dashboard
- Students by Year (Bar Chart)
- Fees by Residence (Doughnut Chart)
- Payment Status (Pie Chart)
- Fee Distribution (Bar Chart)

### 💰 Budget Tracking
- Total Expected Fees
- Total Collected Fees
- Outstanding Amount
- Collection Rate %

### 🖨️ Smart Printing
- **Full List:** All students by residence
- **Residence-Specific:** Auto-generated for route coordinators
- **90% less paper** than traditional methods

---

## 🚀 Quick Start

```bash
# 1. Install Flask
pip install Flask==3.0.0

# 2. Run application
python app.py

# 3. Access system
Open browser: http://localhost:5000
Login: Isaac Aijuka / EIA2026001
```

---

## 💡 How It Works

### Adding Students

**New Residence:**
```
Add student from "Kampala" →
🔵 "New Residence Added: Kampala!" →
Print shows ONLY Kampala students
```

**Existing Residence:**
```
Add student from "Kampala" →
🟢 "Student added successfully!" →
Print shows ALL Kampala students (updated)
```

---

## 📂 File Structure

```
empower_academy_transport/
├── app.py                      # Main application
├── static/
│   ├── images/
│   │   └── empower_logo.jpg   # Your school logo ✅
│   ├── css/style.css          # Navy/White/Green theme
│   └── js/dashboard.js        # Interactive charts
├── templates/
│   ├── login.html            # Login with logo
│   ├── dashboard.html        # Dashboard with logo
│   ├── print_preview.html    # Full list
│   └── print_residence.html  # Residence-specific
└── students_data.json        # Database (auto-created)
```

---

## 🎨 Design Features

### Logo Placement
✅ **Login Page** - Center, large
✅ **Navigation Bar** - Top left
✅ **Print Documents** - Professional header

### Color Usage
- **Navy Blue:** Buttons, headers, new residence alerts
- **White:** Backgrounds, clean professional look
- **Green:** Success messages, payment indicators

---

## 🎯 Benefits

### For Administration
✅ Professional Empower branding
✅ Real-time analytics
✅ Budget tracking
✅ New residence alerts

### For Transport Coordinators  
✅ Route-specific lists
✅ Auto-generated prints
✅ Minimal paper waste
✅ Easy distribution

### For Registration Desk
✅ Quick student entry
✅ Immediate print output
✅ Visual success confirmation
✅ Professional receipts

---

## 🔒 Security

- Session-based authentication
- Protected routes
- Input validation
- Secure data handling

---

## 🆘 Troubleshooting

**Port in use?**
Edit `app.py`, change `port=5000` to `port=8000`

**Logo not showing?**
Ensure `empower_logo.jpg` is in `static/images/`

**Login issues?**
Use exact: `Isaac Aijuka` / `EIA2026001`

**Allow pop-ups** for auto-print feature

---

## 📱 Browser Support

✅ Chrome (Recommended)
✅ Firefox
✅ Edge  
✅ Safari
✅ Opera

---

## 🎉 Getting Started Checklist

- [ ] Install Flask
- [ ] Run `python app.py`
- [ ] Open http://localhost:5000
- [ ] Login with credentials
- [ ] Add a test student
- [ ] Watch auto-print magic ✨
- [ ] Explore analytics
- [ ] Ready to use! 🚀

---

**Empower International Academy**
*Empowering Students, Simplifying Transport*

© 2026 Empower International Academy
