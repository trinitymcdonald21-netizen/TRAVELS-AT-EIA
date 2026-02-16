#!/bin/bash

echo "=========================================="
echo "Cambridge School Transportation System"
echo "=========================================="
echo ""
echo "Installing dependencies..."
pip install -r requirements.txt --break-system-packages

echo ""
echo "Starting the application..."
echo ""
echo "Login Credentials:"
echo "  Username: Isaac Aijuka"
echo "  Password: EIA2026001"
echo ""
echo "Access the system at: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=========================================="
echo ""

python app.py
