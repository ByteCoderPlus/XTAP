# Use Python official image as base
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies including SQL clients
RUN apt-get update && apt-get install -y \
    postgresql-client \
    mysql-client \
    sqlite3 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Default command
CMD ["python", "--version"]
