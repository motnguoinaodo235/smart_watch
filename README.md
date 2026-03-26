ESP32 Smartwatch Project
Overview
This project is a customizable wearable device built on the ESP32 platform. It features real-time environment monitoring, health tracking, and an optimized task scheduling system to ensure smooth performance on low-power hardware.

Key Features
Real-time Monitoring: Tracks temperature, humidity, and other environmental data using high-precision sensors.

Task Scheduling: Implemented a custom scheduler to manage multiple concurrent tasks (Sensor reading, OLED display update, Button debouncing).

User Interface: Interactive display with OLED (I2C) and physical buttons for navigation.

Power Efficiency: Optimized firmware for ESP32 to extend battery life in wearable applications.

Connectivity: Supports UART for debugging and data logging.

Tech Stack
Hardware: ESP32 (MCU), OLED Display (I2C), DHT22/MPU6050 (Sensors).

Language: C++ (Embedded).

Framework: Arduino/ESP-IDF.

Tools: PlatformIO, Git, VS Code.

Installation & Usage
Clone the repository by using this bash:
git clone https://github.com/motnguoinaodo235/smartwatch-project.git
Open with PlatformIO: Open the project folder in VS Code with the PlatformIO extension installed.

Build & Flash: Connect your ESP32 and click the "Upload" button in PlatformIO.

Monitor: Use the Serial Monitor at 115200 baud rate to view system logs.
