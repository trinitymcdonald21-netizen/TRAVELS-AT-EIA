"""
Cambridge School Student Transportation System
Professional Flask Application with Authentication and Data Management
"""

from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from functools import wraps
import json
import os
from datetime import datetime
from collections import defaultdict

app = Flask(__name__)
app.secret_key = 'cambridge_transport_secret_key_2026'

# Data file path
DATA_FILE = 'students_data.json'

# Login credentials
VALID_USER = 'Isaac Aijuka'
VALID_PASSWORD = 'EIA2026001'

# Year options
YEARS = ['Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13']


def load_students():
    """Load students data from JSON file"""
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r') as f:
                return json.load(f)
        except json.JSONDecodeError:
            return []
    return []


def save_students(students):
    """Save students data to JSON file"""
    with open(DATA_FILE, 'w') as f:
        json.dump(students, f, indent=2)


def login_required(f):
    """Decorator to require login for protected routes"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function


@app.route('/')
def index():
    """Redirect to login or dashboard based on session"""
    if 'logged_in' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    """Handle login page and authentication"""
    error = None
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()
        
        if username == VALID_USER and password == VALID_PASSWORD:
            session['logged_in'] = True
            session['username'] = username
            return redirect(url_for('dashboard'))
        else:
            error = 'Invalid credentials. Please try again.'
    
    return render_template('login.html', error=error)


@app.route('/logout')
def logout():
    """Handle logout"""
    session.clear()
    return redirect(url_for('login'))


@app.route('/dashboard')
@login_required
def dashboard():
    """Display main dashboard with students and analytics"""
    students = load_students()
    
    # Check if we should auto-open print preview
    show_print = session.pop('show_print_preview', False)
    print_residence = session.pop('print_residence', None)
    is_new_residence = session.pop('is_new_residence', False)
    
    return render_template('dashboard.html', 
                         username=session.get('username'),
                         years=YEARS,
                         students=students,
                         show_print_preview=show_print,
                         print_residence=print_residence,
                         is_new_residence=is_new_residence)


@app.route('/add_student', methods=['POST'])
@login_required
def add_student():
    """Add a new student to the system"""
    students = load_students()
    
    # Get the new student's residence
    new_residence = request.form.get('residence', '').strip()
    
    # Check if this is a new residence
    existing_residences = set(s['residence'] for s in students)
    is_new_residence = new_residence not in existing_residences
    
    new_student = {
        'id': len(students) + 1,
        'name': request.form.get('name', '').strip(),
        'year': request.form.get('year', ''),
        'fee': float(request.form.get('fee', 0)),
        'residence': new_residence,
        'paid': request.form.get('paid') == 'on',
        'date_added': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    
    students.append(new_student)
    save_students(students)
    
    # Set flags for print preview
    session['show_print_preview'] = True
    session['print_residence'] = new_residence
    session['is_new_residence'] = is_new_residence
    
    return redirect(url_for('dashboard'))


@app.route('/delete_student/<int:student_id>', methods=['POST'])
@login_required
def delete_student(student_id):
    """Delete a student from the system"""
    students = load_students()
    students = [s for s in students if s['id'] != student_id]
    save_students(students)
    return redirect(url_for('dashboard'))


@app.route('/update_payment/<int:student_id>', methods=['POST'])
@login_required
def update_payment(student_id):
    """Update payment status for a student"""
    students = load_students()
    data = request.get_json()
    
    for student in students:
        if student['id'] == student_id:
            student['paid'] = data.get('paid', False)
            break
    
    save_students(students)
    return jsonify({'success': True})


@app.route('/analytics_data')
@login_required
def analytics_data():
    """Provide analytics data for charts"""
    students = load_students()
    
    # Students per year
    year_counts = defaultdict(int)
    for student in students:
        year_counts[student['year']] += 1
    
    # Fees per residence
    residence_fees = defaultdict(float)
    for student in students:
        residence_fees[student['residence']] += student['fee']
    
    # Payment statistics
    total_students = len(students)
    paid_students = sum(1 for s in students if s['paid'])
    unpaid_students = total_students - paid_students
    
    total_expected = sum(s['fee'] for s in students)
    total_collected = sum(s['fee'] for s in students if s['paid'])
    
    # Fee distribution
    fee_ranges = {
        '0-50k': 0,
        '50k-100k': 0,
        '100k-150k': 0,
        '150k-200k': 0,
        '200k+': 0
    }
    
    for student in students:
        fee = student['fee']
        if fee < 50000:
            fee_ranges['0-50k'] += 1
        elif fee < 100000:
            fee_ranges['50k-100k'] += 1
        elif fee < 150000:
            fee_ranges['100k-150k'] += 1
        elif fee < 200000:
            fee_ranges['150k-200k'] += 1
        else:
            fee_ranges['200k+'] += 1
    
    return jsonify({
        'year_counts': dict(year_counts),
        'residence_fees': dict(residence_fees),
        'payment_stats': {
            'paid': paid_students,
            'unpaid': unpaid_students,
            'total': total_students
        },
        'budget': {
            'expected': total_expected,
            'collected': total_collected,
            'outstanding': total_expected - total_collected
        },
        'fee_distribution': fee_ranges
    })


@app.route('/print_preview')
@login_required
def print_preview():
    """Generate print-friendly preview of students"""
    students = load_students()
    
    # Sort by residence, then by year
    sorted_students = sorted(students, key=lambda x: (x['residence'], x['year']))
    
    # Group by residence
    grouped = defaultdict(list)
    for student in sorted_students:
        grouped[student['residence']].append(student)
    
    return render_template('print_preview.html', 
                         grouped_students=grouped,
                         total_students=len(students),
                         students=students)


@app.route('/print_residence/<residence>')
@login_required
def print_residence(residence):
    """Generate print preview for a specific residence only"""
    students = load_students()
    
    # Filter students by residence
    residence_students = [s for s in students if s['residence'] == residence]
    
    # Sort by year
    sorted_students = sorted(residence_students, key=lambda x: x['year'])
    
    # Group by residence (will only have one group)
    grouped = {residence: sorted_students}
    
    return render_template('print_residence.html',
                         grouped_students=grouped,
                         total_students=len(residence_students),
                         residence_name=residence,
                         students=sorted_students)


if __name__ == '__main__':
    import os
    # Get port from environment variable or use 5000 as default
    port = int(os.environ.get('PORT', 5000))
    # Check if we're in production
    debug_mode = os.environ.get('FLASK_ENV') != 'production'
    app.run(debug=debug_mode, host='0.0.0.0', port=port)
