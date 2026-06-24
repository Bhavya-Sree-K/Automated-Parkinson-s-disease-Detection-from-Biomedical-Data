# 🧠 Automated Parkinson's Disease Detection from Biomedical Data

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Accuracy](https://img.shields.io/badge/Fusion%20Accuracy-96.2%25-brightgreen?style=for-the-badge)

> **Live Demo** 👉 [automatedparkinsonsdisease.netlify.app](https://automatedparkinsonsdisease.netlify.app)

---

## 📌 Project Overview

An advanced **Multi-Modal Deep Learning framework** for automated early detection of Parkinson's Disease. This system integrates three biomedical data streams — Gait Dynamics (VGRF), Handwriting/Drawing Analysis (CNN), and Voice Acoustic Features (SVM) — to achieve a multi-modal fusion accuracy of **96.2%**.

The project includes a premium interactive web dashboard built with HTML5, CSS3, and Vanilla JavaScript — deployable to Netlify with a clinical-grade sandbox for real-time diagnostic simulation.

---

## ✨ Key Features

### 🔬 3 Analysis Modalities
| Modality | Model | Accuracy |
|----------|-------|----------|
| 🦶 Gait Dynamics (VGRF) | 1D Convolutional Neural Network | 88.0% |
| ✍️ Handwriting & Drawings | Deep CNN + GradCAM | 92.0% |
| 🎤 Voice Acoustic Features | Support Vector Machine (SVM) | 89.4% |
| 🧬 **Multi-Modal Fusion** | **Combined Features** | **96.2%** |

### 🖥️ Interactive Web Dashboard
- **Clinical Testing Sandbox** — Simulate real patient diagnostics with 3 modalities
- **Gait Analysis** — Load VGRF sample files, view heel strike forces, asymmetry index, and stride variability
- **Drawing CNN Sandbox** — Procedurally renders Spirals and Waves on HTML5 Canvas with simulated tremor for Parkinson's patients, plus a dynamic **GradCAM heatmap**
- **Voice Acoustic Sandbox** — Analyze voice samples for Jitter, Shimmer, HNR, and Pitch Period Entropy (PPE)
- **Performance Dashboard** — Visual comparison of all models using ROC curves, bar charts, and metric meters
- **Dark Glassmorphic UI** — Premium design with animated progress indicators and color-coded clinical verdicts

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Python | Machine learning pipeline |
| TensorFlow / Keras | 1D-CNN (Gait) & Deep CNN (Drawing) |
| Scikit-learn | SVM Voice classifier, metrics |
| OpenCV / PIL | Drawing image preprocessing |
| Pandas / NumPy | Feature extraction & data handling |
| Matplotlib | ROC curves & comparison charts |
| HTML5 / CSS3 / JS | Interactive web dashboard |
| Netlify | Live deployment |

---

## 📂 Project Structure

```
Automated-Parkinsons/
├── Parkinson/
│   ├── parkinsons_detection.py        # Full ML pipeline (feature extraction + training)
│   ├── requirements.txt               # Python dependencies
│   ├── Models/
│   │   ├── gait_embedding.h5          # Trained gait model
│   │   ├── image_embedding.h5         # Trained drawing CNN model
│   │   └── voice_embedding.h5         # Trained voice SVM embedding
│   ├── Results/                       # Generated charts and metrics
│   ├── gait-in-parkinsons-disease-1.0.0/   # PhysioNet VGRF gait dataset
│   ├── drawingdataset/                # Kaggle spiral & wave drawings dataset
│   └── web/
│       ├── index.html                 # Main dashboard page
│       ├── styles.css                 # Dark-themed glassmorphic styling
│       ├── script.js                  # Sandbox engine & canvas drawing
│       └── results/                   # Charts and evaluation images
└── netlify.toml                       # Netlify deployment config
```

---

## 🚀 Getting Started

### View Live Dashboard
Open: [automatedparkinsonsdisease.netlify.app](https://automatedparkinsonsdisease.netlify.app)

### Run Python ML Pipeline Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/Bhavya-Sree-K/Automated-Parkinson-s-disease-Detection-from-Biomedical-Data.git
   ```
2. Install dependencies:
   ```bash
   pip install -r Parkinson/requirements.txt
   ```
3. Run the detection pipeline:
   ```bash
   cd Parkinson
   python parkinsons_detection.py
   ```

### Run Web Dashboard Locally
Simply open `Parkinson/web/index.html` in your browser — no build step needed!

---

## 📊 Datasets Used

| Dataset | Source | Used For |
|---------|--------|----------|
| Gait in Parkinson's Disease | [PhysioNet](https://physionet.org/content/gaitpdb/1.0.0/) | VGRF gait time-series |
| Parkinson's Drawing Dataset | [Kaggle](https://www.kaggle.com/) | Spiral & Wave drawings |
| Voice Acoustic Features | UCI ML Repository | Jitter/Shimmer/HNR metrics |

---

## 📈 Model Performance

```
Multi-Modal Fusion Model:
  Accuracy:   96.2%
  Precision:  97.0%
  Recall:     95.0%
  F1-Score:   96.0%
  AUC:        0.98
```

---

## 👩‍💻 Developer

**Bhavya Sree K**
- 🔗 Portfolio: [bhavyasreekportfoilo.netlify.app](https://bhavyasreekportfoilo.netlify.app)
- 🐙 GitHub: [github.com/Bhavya-Sree-K](https://github.com/Bhavya-Sree-K)

---

## ⚠️ Disclaimer

This project is built for **academic and educational purposes only**. It is not a certified medical diagnostic tool and should not be used as a substitute for professional medical advice or clinical diagnosis.

---

## 📄 License

This project is open source and available for educational and research purposes.
