# Fitness With AI: Interactive Exercise Assistant & Real-Time Posture Analysis System

An end-to-end, edge-computing-powered interactive exercise platform that provides real-time biomechanical posture tracking, deterministic repetition validation, and algorithmic periodization using standard RGB webcams without external depth sensors or specialized hardware.

Developed as a Graduation Project at Uskudar University, Department of Computer Engineering.  
Author: Sila Ekincioglu  
Advisor: Asst. Prof. Fatih Temiz  

---

## 1. Executive Summary & Problem Statement

Unsupervised physical exercise in home environments frequently leads to acute and chronic musculoskeletal injuries due to improper biomechanical execution (such as severe lumbar flexion or patellofemoral overloading during squats). Traditional digital fitness platforms offer static one-way instruction ("what to do") but fail to deliver interactive closed-loop feedback ("how it is being performed").

Fitness With AI bridges this gap by delivering zero-latency, client-side motion validation and personalized workout scheduling directly inside modern web browsers, strictly preserving end-user privacy.

---

## 2. Key Engineering Highlights

### Real-Time Edge AI & Topology Extraction
- Built on Google MediaPipe (BlazePose architecture), inferring 33 distinct 3D anatomical keypoints (x, y, z coordinates) at 30 to 60 FPS.
- Runs purely on client-side WebAssembly and WebGL acceleration, eliminating server inference costs and network latency bottlenecks.

### Biomechanical Angle & Posture Vector Engine
- Calculates true joint angles in three dimensions using Vector Dot Products and the Law of Cosines: `cos(θ) = (A · B) / (|A| × |B|)`
- Incorporates numerical clamping ([-1.0, 1.0]) to eliminate floating-point precision NaN artifacts.
- Dynamically measures torso lean relative to the vertical axis via `Math.atan2`, enforcing a 55-degree critical threshold to prevent hazardous lumbar spinal strain.

### Deterministic Finite State Machine (FSM)
- Eliminates cheat repetitions and partial Range of Motion (ROM).
- State transitions require strict biomechanical conditions:
  - Down Phase (Eccentric): Knee angle < 90 degrees while Hip angle >= 55 degrees.
  - Up Phase (Concentric): Knee angle > 165 degrees returning from a validated Down state.

### Smart Audio Feedback Loop with Cooldown Logic
- Resolves acoustic cognitive overload caused by repeated error triggers.
- Features a timestamped memory cache (`feedbackHistoryRef`) enforcing a strict 30-second cooldown on repetitive corrective audio warnings while maintaining real-time on-screen visual canvas updates.

### Algorithmic Progressive Overload Periodization
- Automatically compiles dynamic 8-week structured macrocycles based on initial user onboarding assessments.
- Periodizes training phases systematically:
  - Weeks 1-2: Adaptation Phase (3 sets x 10-12 reps, 60s rest)
  - Weeks 3-4: Volume Phase (3 sets x 12-15 reps, 50s rest)
  - Weeks 5-6: Intensity Phase (4 sets x 10-12 reps, 45s rest)
  - Weeks 7-8: Peak Performance Phase (4 sets to near-failure, 30s rest)

### Privacy by Design (GDPR / KVKK Compliant)
- Zero video transmission: RGB frames are evaluated strictly in local volatile browser memory and discarded immediately after joint landmark extraction.
- Only encrypted numerical exercise metrics and progress data are synchronized with the cloud database.

---

## 3. System Architecture


```

[ Web Camera Feed (RGB) ]
│
▼
[ Google MediaPipe BlazePose (Edge Computing / WebAssembly) ]
│
├──> 33 3D Spatial Landmarks (x, y, z)
│
▼
[ Biomechanical Angle Engine (Dot Product & Law of Cosines) ]
│
▼
[ Finite State Machine (FSM) & Safety Threshold Validator ]
│
┌──────┴──────────────────────────────────────┐
▼                                             ▼
[ Dual-Layer Canvas Renderer ]          [ Audio Handler & Cooldown Logic ]
(Green/Red Visual Feedback)             (30-Second Suppressed Audio Alerts)
│
▼
[ Cloud Firestore ] (Encrypted Performance Metrics & Weekly Plans)

```

---

## 4. Repository Structure & Showcase Scope

To protect intellectual property and proprietary database credentials, this public repository serves as an algorithmic architecture showcase containing the core mathematical and logical engines:


```

├── package.json               # Environment configuration and dependency tree
├── poseUtils.js               # 3D vector angle calculation and back slope algorithms
├── ProcessSquat.js            # Biomechanical State Machine & ROM verification logic
├── ProgramGenerator.js        # Algorithmic 8-week Progressive Overload scheduler
└── AudioHandler.js            # Frequency-managed smart audio notification handler

```

---

## 5. Technology Stack

- Frontend: React.js (Hooks, Virtual DOM lifecycle optimization via useRef)
- Computer Vision: Google MediaPipe Pose, BlazePose Topology
- Rendering: HTML5 Canvas API (Dual-Layer skeleton overlay)
- Audio: Web Audio API / HTML5 Audio
- Backend & Storage: Google Firebase (Authentication & Cloud Firestore)

---


