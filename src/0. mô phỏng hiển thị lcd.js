// import React, { useState, useEffect } from 'react';
// import { Clock, Thermometer, Bell, Timer, Hourglass } from 'lucide-react';

// const LCDDisplay = () => {
//   const [currentMode, setCurrentMode] = useState('datetime');
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [stopwatchTime, setStopwatchTime] = useState(0);
//   const [countdownTime, setCountdownTime] = useState(180000); // 3 phút
//   const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
//   const [isCountdownRunning, setIsCountdownRunning] = useState(false);
//   const [blink, setBlink] = useState(true);
//   const [alarmEditingHour, setAlarmEditingHour] = useState(true);

//   // Cập nhật thời gian thực
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Hiệu ứng nháy
//   useEffect(() => {
//     const blinkTimer = setInterval(() => {
//       setBlink(prev => !prev);
//     }, 500);
//     return () => clearInterval(blinkTimer);
//   }, []);

//   // Stopwatch
//   useEffect(() => {
//     if (isStopwatchRunning) {
//       const timer = setInterval(() => {
//         setStopwatchTime(prev => prev + 10);
//       }, 10);
//       return () => clearInterval(timer);
//     }
//   }, [isStopwatchRunning]);

//   // Countdown
//   useEffect(() => {
//     if (isCountdownRunning && countdownTime > 0) {
//       const timer = setInterval(() => {
//         setCountdownTime(prev => Math.max(0, prev - 10));
//       }, 10);
//       return () => clearInterval(timer);
//     }
//   }, [isCountdownRunning, countdownTime]);

//   const formatTime = (ms) => {
//     const hours = Math.floor(ms / 3600000) % 100;
//     const minutes = Math.floor(ms / 60000) % 60;
//     const seconds = Math.floor(ms / 1000) % 60;
//     const centiseconds = Math.floor(ms / 10) % 100;
//     return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
//   };

//   const LCDScreen = ({ line1, line2 }) => (
//     <div className="bg-green-900 p-6 rounded-lg shadow-2xl border-4 border-gray-700">
//       <div className="bg-green-400 p-4 rounded font-mono text-green-900 space-y-2">
//         <div className="text-xl tracking-wider font-bold">{line1}</div>
//         <div className="text-xl tracking-wider font-bold">{line2}</div>
//       </div>
//     </div>
//   );

//   const renderDisplay = () => {
//     switch(currentMode) {
//       case 'datetime':
//         return (
//           <LCDScreen
//             line1={`Time: ${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}:${String(currentTime.getSeconds()).padStart(2, '0')}`}
//             line2={`Date: ${String(currentTime.getDate()).padStart(2, '0')}/${String(currentTime.getMonth() + 1).padStart(2, '0')}/${currentTime.getFullYear()}`}
//           />
//         );
      
//       case 'temp':
//         return (
//           <LCDScreen
//             line1="Temp: 25.3°C"
//             line2="Humi: 67.2%"
//           />
//         );
      
//       case 'alarm':
//         return (
//           <LCDScreen
//             line1={`Now: ${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}:${String(currentTime.getSeconds()).padStart(2, '0')} `}
//             line2={`Alarm: ${alarmEditingHour && !blink ? '  ' : '06'}:${!alarmEditingHour && !blink ? '  ' : '30'}    `}
//           />
//         );
      
//       case 'stopwatch':
//         return (
//           <LCDScreen
//             line1={`Stopwatch ${isStopwatchRunning ? 'RUN ' : 'STOP'}`}
//             line2={`${formatTime(stopwatchTime)} L3`}
//           />
//         );
      
//       case 'countdown':
//         return (
//           <LCDScreen
//             line1={`Countdown ${isCountdownRunning ? 'RUN   ' : 'STOP  '}`}
//             line2={`${formatTime(countdownTime)}  `}
//           />
//         );
      
//       case 'lap':
//         return (
//           <LCDScreen
//             line1="Lap Time:"
//             line2="00:01:23.45"
//           />
//         );
      
//       case 'init':
//         return (
//           <LCDScreen
//             line1="Smart Clock"
//             line2="Initializing..."
//           />
//         );
      
//       case 'error':
//         return (
//           <LCDScreen
//             line1="DHT Error!"
//             line2="Check Sensor"
//           />
//         );
      
//       case 'alarm_ring':
//         return (
//           <LCDScreen
//             line1={`Now: ${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}:${String(currentTime.getSeconds()).padStart(2, '0')} `}
//             line2="ALARM RINGING!"
//           />
//         );
      
//       case 'countdown_done':
//         return (
//           <LCDScreen
//             line1="TIME'S UP!"
//             line2="00:00:00.00"
//           />
//         );
      
//       default:
//         return <LCDScreen line1="Unknown Mode" line2="" />;
//     }
//   };

//   const modes = [
//     { id: 'init', name: 'Khởi Động', icon: Clock },
//     { id: 'datetime', name: 'Ngày Giờ', icon: Clock },
//     { id: 'temp', name: 'Nhiệt Độ/Độ Ẩm', icon: Thermometer },
//     { id: 'alarm', name: 'Báo Thức (Chỉnh)', icon: Bell },
//     { id: 'alarm_ring', name: 'Báo Thức (Kêu)', icon: Bell },
//     { id: 'stopwatch', name: 'Bấm Giờ', icon: Timer },
//     { id: 'countdown', name: 'Đếm Ngược', icon: Hourglass },
//     { id: 'countdown_done', name: 'Đếm Ngược (Hết)', icon: Hourglass },
//     { id: 'lap', name: 'Xem Lap', icon: Timer },
//     { id: 'error', name: 'Lỗi Cảm Biến', icon: Thermometer }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-white mb-2 text-center">
//           Minh Họa Hiển Thị LCD 16x2
//         </h1>
//         <p className="text-gray-400 text-center mb-8">Smart Clock - Arduino Project</p>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Màn hình LCD */}
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold text-white mb-4">Màn Hình LCD</h2>
//             {renderDisplay()}
            
//             {/* Điều khiển cho Stopwatch và Countdown */}
//             {currentMode === 'stopwatch' && (
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setIsStopwatchRunning(!isStopwatchRunning)}
//                   className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   {isStopwatchRunning ? 'Pause' : 'Start'}
//                 </button>
//                 <button
//                   onClick={() => setStopwatchTime(0)}
//                   className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   Reset
//                 </button>
//               </div>
//             )}
            
//             {currentMode === 'countdown' && (
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setIsCountdownRunning(!isCountdownRunning)}
//                   className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   {isCountdownRunning ? 'Pause' : 'Start'}
//                 </button>
//                 <button
//                   onClick={() => setCountdownTime(180000)}
//                   className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   Reset
//                 </button>
//               </div>
//             )}

//             {currentMode === 'alarm' && (
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setAlarmEditingHour(!alarmEditingHour)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Chỉnh {alarmEditingHour ? 'Giờ' : 'Phút'}
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Menu chọn chế độ */}
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold text-white mb-4">Chọn Chế Độ Hiển Thị</h2>
//             <div className="grid grid-cols-1 gap-3">
//               {modes.map((mode) => {
//                 const Icon = mode.icon;
//                 return (
//                   <button
//                     key={mode.id}
//                     onClick={() => setCurrentMode(mode.id)}
//                     className={`p-4 rounded-lg flex items-center gap-3 transition-all ${
//                       currentMode === mode.id
//                         ? 'bg-blue-600 text-white shadow-lg scale-105'
//                         : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
//                     }`}
//                   >
//                     <Icon className="w-6 h-6" />
//                     <span className="font-semibold">{mode.name}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Giải thích */}
//         <div className="mt-8 bg-slate-700 p-6 rounded-lg">
//           <h3 className="text-xl font-bold text-white mb-4">📌 Giải Thích Các Chế Độ:</h3>
//           <div className="space-y-3 text-gray-300">
//             <div><strong className="text-white">Khởi Động:</strong> Màn hình hiển thị khi Arduino khởi động</div>
//             <div><strong className="text-white">Ngày Giờ:</strong> Hiển thị thời gian thực từ RTC DS3231</div>
//             <div><strong className="text-white">Nhiệt Độ/Độ Ẩm:</strong> Đọc dữ liệu từ cảm biến DHT</div>
//             <div><strong className="text-white">Báo Thức:</strong> Cài đặt và hiển thị giờ báo thức (giờ/phút nháy khi chỉnh)</div>
//             <div><strong className="text-white">Bấm Giờ:</strong> Đồng hồ stopwatch với độ chính xác 0.01 giây + số lap</div>
//             <div><strong className="text-white">Đếm Ngược:</strong> Timer đếm ngược từ thời gian đã cài đặt</div>
//             <div><strong className="text-white">Xem Lap:</strong> Hiển thị thời gian của mỗi lap đã lưu</div>
//             <div><strong className="text-white">Lỗi Cảm Biến:</strong> Thông báo khi không đọc được DHT sensor</div>
//           </div>
//         </div>

//         {/* Đặc điểm kỹ thuật */}
//         <div className="mt-8 bg-slate-700 p-6 rounded-lg">
//           <h3 className="text-xl font-bold text-white mb-4">⚙️ Đặc Điểm Kỹ Thuật:</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
//             <div>
//               <strong className="text-white">LCD:</strong> 16x2 I2C (địa chỉ 0x27)
//             </div>
//             <div>
//               <strong className="text-white">Độ phân giải:</strong> 0.01 giây (centiseconds)
//             </div>
//             <div>
//               <strong className="text-white">Font:</strong> Monospace (font đồng bộ)
//             </div>
//             <div>
//               <strong className="text-white">Hiệu ứng:</strong> Nháy (500ms) khi chỉnh sửa
//             </div>
//             <div>
//               <strong className="text-white">RTC:</strong> DS3231 (đồng hồ thời gian thực)
//             </div>
//             <div>
//               <strong className="text-white">Cảm biến:</strong> DHT11/DHT22
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LCDDisplay;