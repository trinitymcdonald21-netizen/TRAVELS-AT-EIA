# QUICK START GUIDE
# Cambridge School Student Transportation System

## Step 1: Installation
Run this command to install dependencies:
```bash
pip install Flask==3.0.0 --break-system-packages
```

## Step 2: Start the Application
```bash
cd cambridge_transport_system
python app.py
```

Or use the run script:
```bash
./run.sh
```

## Step 3: Access the System
Open your browser and go to: http://localhost:5000

## Step 4: Login
- Username: Isaac Aijuka
- Password: EIA2026001

## Step 5: (Optional) Load Sample Data
To start with sample student data:
```bash
cp students_data_sample.json students_data.json
```
Then refresh the dashboard.

## Key Features to Try:

1. **Add a Student**
   - Fill in the form at the top of the dashboard
   - Check "Payment Received" if paid
   - Click "Add Student"

2. **View Analytics**
   - Scroll down to see 4 interactive charts
   - View budget summary with collection rates

3. **Update Payment Status**
   - Toggle the switches in the student table
   - Watch the charts update automatically

4. **Print Student List**
   - Click "Print Preview" button
   - See students organized by residence
   - Click "Print Document" to print or save as PDF

5. **Delete Students**
   - Click "Delete" button next to any student
   - Confirm the deletion

## Troubleshooting:

**Port 5000 already in use?**
Edit app.py and change the port number:
```python
app.run(debug=True, host='0.0.0.0', port=8000)
```

**Charts not showing?**
Make sure you have internet connection for Chart.js CDN.

**Login not working?**
Make sure you're using the exact credentials:
- Username: Isaac Aijuka (case-sensitive)
- Password: EIA2026001

## Application Structure:
```
cambridge_transport_system/
├── app.py                 # Main Flask application
├── templates/             # HTML templates
├── static/               # CSS and JavaScript
└── students_data.json    # Data storage (auto-created)
```

Enjoy using the Cambridge School Transportation System!
