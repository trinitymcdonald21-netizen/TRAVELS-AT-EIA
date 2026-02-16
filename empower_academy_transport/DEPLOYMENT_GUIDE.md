# 🚀 DEPLOYMENT GUIDE
## Empower International Academy Transport System

---

## 🔴 FIXING YOUR CURRENT RENDER DEPLOYMENT ERROR

### Problem
Render is detecting your app as a Go application instead of Python/Flask.

### Solution: Follow These Steps

---

## ✅ STEP-BY-STEP RENDER DEPLOYMENT FIX

### Step 1: Update Your GitHub Repository

1. **Download the updated system files** (the ZIP from this conversation)

2. **Extract the files**

3. **Navigate to your local repository:**
   ```bash
   cd TRANSPORTATION-SYSTEM
   ```

4. **Copy these NEW files to your repository:**
   - `render.yaml` (NEW - tells Render it's Python)
   - `Procfile` (NEW - deployment instructions)
   - `runtime.txt` (NEW - Python version)
   - `requirements.txt` (UPDATED - includes gunicorn)
   - All other updated files

5. **Commit and push:**
   ```bash
   git add .
   git commit -m "Fix: Configure for Python/Flask deployment"
   git push origin main
   ```

### Step 2: Configure Render Dashboard

1. **Go to your Render dashboard:**
   https://dashboard.render.com

2. **Find your service** (empower-transport-system or similar)

3. **Click on it** to open settings

4. **Update these settings:**

   **Environment:**
   - Change from "Go" to **"Python 3"**

   **Build Command:**
   ```bash
   pip install -r requirements.txt
   ```

   **Start Command:**
   ```bash
   gunicorn app:app
   ```

   **Branch:**
   - Ensure it's set to `main`

5. **Click "Save Changes"**

6. **Click "Manual Deploy" → "Deploy latest commit"**

### Step 3: Verify Deployment

After deployment completes:
1. Click on your app URL (e.g., https://your-app.onrender.com)
2. You should see the Empower Academy login page
3. Login with: Isaac Aijuka / EIA2026001

---

## 📋 REQUIRED FILES FOR DEPLOYMENT

Make sure your GitHub repository has these files:

### 1. **render.yaml** (Root directory)
```yaml
version: 1
services:
  - type: web
    name: empower-transport-system
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn app:app
    envVars:
      - key: PYTHON_VERSION
        value: 3.12.0
```

### 2. **Procfile** (Root directory)
```
web: gunicorn app:app --bind 0.0.0.0:$PORT
```

### 3. **runtime.txt** (Root directory)
```
python-3.12.0
```

### 4. **requirements.txt** (Root directory)
```
Flask==3.0.0
Werkzeug==3.0.1
gunicorn==21.2.0
```

### 5. **app.py** (Updated to handle PORT)
The app.py should have this at the bottom:
```python
if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    debug_mode = os.environ.get('FLASK_ENV') != 'production'
    app.run(debug=debug_mode, host='0.0.0.0', port=port)
```

---

## 🌐 ALTERNATIVE: DEPLOY TO OTHER PLATFORMS

If Render continues to have issues, here are other options:

### Option 1: Heroku

1. **Install Heroku CLI:**
   https://devcenter.heroku.com/articles/heroku-cli

2. **Login:**
   ```bash
   heroku login
   ```

3. **Create app:**
   ```bash
   heroku create empower-transport
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

5. **Open app:**
   ```bash
   heroku open
   ```

**Files needed:** Procfile, requirements.txt, runtime.txt ✅ Already included!

---

### Option 2: Railway

1. **Go to:** https://railway.app

2. **Click "Start a New Project"**

3. **Choose "Deploy from GitHub repo"**

4. **Select your repository**

5. **Railway auto-detects Python** ✅

6. **Set environment variables:**
   - `FLASK_ENV` = `production`

7. **Deploy automatically happens**

8. **Get your URL** and test

**Why Railway?** 
- Auto-detects Flask apps
- Free tier available
- Simpler than Render

---

### Option 3: PythonAnywhere

1. **Go to:** https://www.pythonanywhere.com

2. **Create free account**

3. **Upload your files:**
   - Dashboard → Files → Upload
   - Upload all project files

4. **Open Web tab:**
   - Add new web app
   - Choose Python 3.12
   - Manual configuration

5. **Set WSGI file:**
   ```python
   import sys
   path = '/home/yourusername/empower_academy_transport'
   if path not in sys.path:
       sys.path.append(path)
   
   from app import app as application
   ```

6. **Reload web app**

**Best for:** Simple hosting, no git required

---

### Option 4: Vercel (with modifications)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Create `vercel.json`:**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "app.py",
         "use": "@vercel/python"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "app.py"
       }
     ]
   }
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

---

## 🔧 DEBUGGING RENDER DEPLOYMENT

### Check 1: Verify Python Detection

In your repository root, ensure these files exist:
- ✅ `requirements.txt`
- ✅ `runtime.txt`
- ✅ `Procfile`
- ✅ `render.yaml`

### Check 2: View Build Logs

1. Go to Render dashboard
2. Click on your service
3. Click "Logs" tab
4. Look for errors

**Common errors:**
- `ModuleNotFoundError` → Check requirements.txt
- `Port already in use` → Gunicorn handles this
- `Permission denied` → Check file permissions

### Check 3: Test Locally First

```bash
# Install gunicorn
pip install gunicorn

# Test gunicorn locally
gunicorn app:app

# Should see: Listening at: http://0.0.0.0:8000
```

If local test works, deployment should work!

---

## 🎯 RENDER-SPECIFIC SETTINGS

### In Render Dashboard

**Service Settings:**
- **Name:** empower-transport-system
- **Environment:** Python 3
- **Region:** Choose closest to your location
- **Branch:** main
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `gunicorn app:app`

**Environment Variables:**
None required for basic setup!

**Advanced Settings:**
- **Auto-Deploy:** Yes (deploys on git push)
- **Health Check Path:** `/` (default)

---

## 📊 DEPLOYMENT CHECKLIST

Before deploying, verify:

- [ ] All files uploaded to GitHub
- [ ] `render.yaml` in root directory
- [ ] `Procfile` in root directory
- [ ] `runtime.txt` in root directory
- [ ] `requirements.txt` includes gunicorn
- [ ] `app.py` handles PORT environment variable
- [ ] Git repository pushed to GitHub
- [ ] Render environment set to "Python 3"
- [ ] Build command: `pip install -r requirements.txt`
- [ ] Start command: `gunicorn app:app`

---

## 🚀 QUICK FIX COMMAND SEQUENCE

If you're in a hurry, run these commands:

```bash
# Navigate to your project
cd TRANSPORTATION-SYSTEM

# Create render.yaml
cat > render.yaml << 'EOF'
version: 1
services:
  - type: web
    name: empower-transport-system
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn app:app
EOF

# Create Procfile
echo "web: gunicorn app:app --bind 0.0.0.0:\$PORT" > Procfile

# Create runtime.txt
echo "python-3.12.0" > runtime.txt

# Update requirements.txt
echo "Flask==3.0.0" > requirements.txt
echo "Werkzeug==3.0.1" >> requirements.txt
echo "gunicorn==21.2.0" >> requirements.txt

# Commit and push
git add .
git commit -m "Configure for Python/Flask deployment on Render"
git push origin main
```

Then go to Render dashboard and change environment to "Python 3"!

---

## 🔍 TROUBLESHOOTING SPECIFIC ERRORS

### Error: "go.mod file not found"
**Cause:** Render thinks it's a Go app
**Fix:** 
1. Add `render.yaml` file
2. Change environment to "Python 3" in dashboard
3. Redeploy

### Error: "No module named 'app'"
**Cause:** Incorrect start command
**Fix:** Start command should be `gunicorn app:app` (not `gunicorn app`)

### Error: "Address already in use"
**Cause:** Port conflict
**Fix:** Gunicorn handles ports automatically. Make sure start command is just `gunicorn app:app` without specifying port

### Error: "Failed to bind to $PORT"
**Cause:** App not reading PORT environment variable
**Fix:** Update app.py to include:
```python
import os
port = int(os.environ.get('PORT', 5000))
```

---

## 💾 DATA PERSISTENCE WARNING

⚠️ **Important:** Render's free tier has ephemeral storage!

This means `students_data.json` will be reset on every deployment.

### Solutions:

**Option 1: Use External Database (Recommended)**
- PostgreSQL (free tier on Render)
- MongoDB Atlas (free tier)
- Supabase (free tier)

**Option 2: Use Render Persistent Disk**
- Paid feature ($1/month per GB)
- Add disk in Render settings
- Mount to `/data` directory

**Option 3: Keep Using JSON (For Testing)**
- Data resets on each deploy
- Fine for demos and testing
- Not suitable for production

### Quick Database Migration (Future Enhancement)
If you need persistent storage, we can upgrade to use PostgreSQL. Let me know!

---

## 📱 ACCESSING YOUR DEPLOYED APP

After successful deployment:

1. **Get your URL:**
   - Render: `https://your-app-name.onrender.com`
   - Heroku: `https://your-app-name.herokuapp.com`
   - Railway: `https://your-app-name.up.railway.app`

2. **Login:**
   - Username: `Isaac Aijuka`
   - Password: `EIA2026001`

3. **Test features:**
   - Add a student
   - Check analytics
   - Print preview

---

## 🎓 DEPLOYMENT BEST PRACTICES

### For Production:

1. **Use environment variables for secrets:**
   ```python
   SECRET_KEY = os.environ.get('SECRET_KEY', 'default-key')
   ```

2. **Set up custom domain:**
   - Buy domain (e.g., transport.empoweracademy.com)
   - Configure DNS in Render

3. **Enable HTTPS:**
   - Automatic on Render, Heroku, Railway
   - Free SSL certificate

4. **Set up monitoring:**
   - Use Render's built-in logs
   - Add error tracking (Sentry)

5. **Regular backups:**
   - Export student data weekly
   - Keep local copies

---

## 🆘 STILL HAVING ISSUES?

### Quick Diagnosis:

**Issue: Render still detecting as Go**
→ Delete the service and recreate as "Python" from start

**Issue: Build succeeds but app won't start**
→ Check start command is exactly: `gunicorn app:app`

**Issue: App starts but shows error page**
→ Check logs for specific error message

**Issue: Everything works locally but fails on Render**
→ Check Python version matches (3.12.0)

### Get Help:

1. **Render docs:** https://render.com/docs/deploy-flask
2. **Check logs:** Dashboard → Your Service → Logs
3. **Community:** Render community forum

---

## 📊 DEPLOYMENT COMPARISON

| Platform | Free Tier | Easy Setup | Data Persist | Best For |
|----------|-----------|------------|--------------|----------|
| **Render** | ✅ 750hrs | ⭐⭐⭐ | ❌ (paid) | Production |
| **Heroku** | ✅ Limited | ⭐⭐⭐⭐ | ❌ (paid) | Quick deploy |
| **Railway** | ✅ $5 credit | ⭐⭐⭐⭐⭐ | ✅ | Easiest |
| **PythonAnywhere** | ✅ Limited | ⭐⭐ | ✅ | Simple apps |
| **Vercel** | ✅ Unlimited | ⭐⭐⭐ | ❌ | Serverless |

**Recommendation:** Railway for easiest deployment with free tier!

---

## ✅ SUCCESS INDICATORS

Your deployment is successful when:

✅ Build completes without errors
✅ Service shows "Live" status
✅ URL opens and shows login page
✅ Can login with credentials
✅ Can add students
✅ Analytics charts load
✅ Print preview works
✅ No console errors in browser

---

## 🎉 FINAL STEPS AFTER DEPLOYMENT

1. **Share the URL** with staff
2. **Add to bookmarks**
3. **Test on mobile** devices
4. **Create user documentation**
5. **Set up regular backups**
6. **Monitor usage** through Render dashboard
7. **Plan for database** migration if needed

---

**Empower International Academy**
*Your Transport System, Now Live Online!*

Need more help? Check the other documentation files or contact support.

© 2026 Empower International Academy
