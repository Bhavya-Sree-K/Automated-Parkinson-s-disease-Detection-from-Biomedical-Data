document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Navigation & Scroll Active Links
    // ----------------------------------------------------
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 120)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------
    // 2. Tab Switching (Performance Section)
    // ----------------------------------------------------
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Toggle buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle panes
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.getAttribute('id') === `tab-${tabId}`) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // ----------------------------------------------------
    // 3. Modality Toggle (Sandbox Sidebar)
    // ----------------------------------------------------
    const btnSelectGait = document.getElementById('btn-select-gait');
    const btnSelectDraw = document.getElementById('btn-select-draw');
    const btnSelectVoice = document.getElementById('btn-select-voice');
    const groupGaitSamples = document.getElementById('group-gait-samples');
    const groupDrawSamples = document.getElementById('group-draw-samples');
    const groupVoiceSamples = document.getElementById('group-voice-samples');
    
    let activeModality = 'gait'; // 'gait', 'draw', or 'voice'

    btnSelectGait.addEventListener('click', () => {
        activeModality = 'gait';
        btnSelectGait.classList.add('active');
        btnSelectDraw.classList.remove('active');
        btnSelectVoice.classList.remove('active');
        groupGaitSamples.classList.remove('hidden');
        groupDrawSamples.classList.add('hidden');
        groupVoiceSamples.classList.add('hidden');
    });

    btnSelectDraw.addEventListener('click', () => {
        activeModality = 'draw';
        btnSelectDraw.classList.add('active');
        btnSelectGait.classList.remove('active');
        btnSelectVoice.classList.remove('active');
        groupDrawSamples.classList.remove('hidden');
        groupGaitSamples.classList.add('hidden');
        groupVoiceSamples.classList.add('hidden');
    });

    btnSelectVoice.addEventListener('click', () => {
        activeModality = 'voice';
        btnSelectVoice.classList.add('active');
        btnSelectGait.classList.remove('active');
        btnSelectDraw.classList.remove('active');
        groupVoiceSamples.classList.remove('hidden');
        groupGaitSamples.classList.add('hidden');
        groupDrawSamples.classList.add('hidden');
    });

    // Thumbnail selection for Drawings
    const thumbnails = document.querySelectorAll('.thumb');
    let selectedDrawing = 'spiral_healthy';

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            selectedDrawing = thumb.getAttribute('data-img');
        });
    });

    // ----------------------------------------------------
    // 4. Clinical Testing Sandbox Engine
    // ----------------------------------------------------
    const btnRunDiagnosis = document.getElementById('btn-run-diagnosis');
    const diagPlaceholder = document.getElementById('diag-placeholder');
    const diagLoader = document.getElementById('diag-loader');
    const diagResults = document.getElementById('diag-results');
    const progressDiag = document.getElementById('progress-diag');
    const loaderStatus = document.getElementById('loader-status');

    // Result DOM handles
    const diagSampleName = document.getElementById('diag-sample-name');
    const diagModalityBadge = document.getElementById('diag-modality-badge');
    const diagScore = document.getElementById('diag-score');
    const diagVerdict = document.getElementById('diag-verdict');
    const diagConfidence = document.getElementById('diag-confidence');
    const radialProgressBar = document.getElementById('radial-progress-bar');
    
    const detailsGait = document.getElementById('details-gait');
    const detailsDraw = document.getElementById('details-draw');
    const detailsVoice = document.getElementById('details-voice');

    // Gait Stats DOM handles
    const valGaitLeftHeel = document.getElementById('val-gait-left-heel');
    const valGaitRightHeel = document.getElementById('val-gait-right-heel');
    const valGaitAsymmetry = document.getElementById('val-gait-asymmetry');
    const valGaitVariability = document.getElementById('val-gait-variability');

    // Voice Stats DOM handles
    const valVoiceJitter = document.getElementById('val-voice-jitter');
    const valVoiceShimmer = document.getElementById('val-voice-shimmer');
    const valVoiceHnr = document.getElementById('val-voice-hnr');
    const valVoicePpe = document.getElementById('val-voice-ppe');

    // Canvas elements
    const canvasOriginal = document.getElementById('canvas-original');
    const canvasGradcam = document.getElementById('canvas-gradcam');

    // Simulated Database of Gait Results
    const gaitDb = {
        'GaCo01_01': {
            name: 'GaCo01_01.txt (Control Subject)',
            score: 12,
            verdict: 'Healthy Control',
            class: 'verdict-healthy',
            confidence: '95.8%',
            leftHeel: '412.3 N',
            rightHeel: '408.1 N',
            asymmetry: '1.01 (Balanced)',
            variability: '2.8% (Normal)'
        },
        'GaPt03_01': {
            name: 'GaPt03_01.txt (PD Patient - Normal Walk)',
            score: 86,
            verdict: 'Parkinson\'s Disease',
            class: 'verdict-parkinson',
            confidence: '89.2%',
            leftHeel: '385.0 N',
            rightHeel: '320.6 N',
            asymmetry: '1.20 (Asymmetrical)',
            variability: '7.4% (Elevated)'
        },
        'GaPt13_10': {
            name: 'GaPt13_10.txt (PD Patient - Dual-Task Walk)',
            score: 94,
            verdict: 'Parkinson\'s Disease',
            class: 'verdict-parkinson',
            confidence: '96.5%',
            leftHeel: '340.2 N',
            rightHeel: '270.5 N',
            asymmetry: '1.26 (Severe Asymmetry)',
            variability: '12.1% (Severe)'
        },
        'SiCo05_01': {
            name: 'SiCo05_01.txt (Control Subject)',
            score: 8,
            verdict: 'Healthy Control',
            class: 'verdict-healthy',
            confidence: '98.1%',
            leftHeel: '450.6 N',
            rightHeel: '445.2 N',
            asymmetry: '1.01 (Balanced)',
            variability: '1.9% (Normal)'
        },
        'SiPt08_01': {
            name: 'SiPt08_01.txt (PD Patient)',
            score: 72,
            verdict: 'Parkinson\'s Disease',
            class: 'verdict-parkinson',
            confidence: '84.0%',
            leftHeel: '405.1 N',
            rightHeel: '360.2 N',
            asymmetry: '1.13 (Moderate Asymmetry)',
            variability: '6.2% (Elevated)'
        }
    };

    // Simulated Database of Drawing Results
    const drawDb = {
        'spiral_healthy': {
            name: 'Archimedean Spiral (Control)',
            score: 11,
            verdict: 'Healthy Subject',
            class: 'verdict-healthy',
            confidence: '94.5%',
            type: 'spiral',
            parkinson: false
        },
        'spiral_parkinson': {
            name: 'Archimedean Spiral (PD Candidate)',
            score: 89,
            verdict: 'Parkinson\'s Disease',
            class: 'verdict-parkinson',
            confidence: '91.8%',
            type: 'spiral',
            parkinson: true
        },
        'wave_healthy': {
            name: 'Wave Drawing (Control)',
            score: 15,
            verdict: 'Healthy Subject',
            class: 'verdict-healthy',
            confidence: '93.2%',
            type: 'wave',
            parkinson: false
        },
        'wave_parkinson': {
            name: 'Wave Drawing (PD Candidate)',
            score: 81,
            verdict: 'Parkinson\'s Disease',
            class: 'verdict-parkinson',
            confidence: '88.7%',
            type: 'wave',
            parkinson: true
        }
    };

    // Simulated Database of Voice Results
    const voiceDb = {
        'VoCo_01': {
            name: 'VoCo_01.wav (Control Subject - Sustained \'Ah\')',
            score: 15,
            verdict: 'Healthy Control',
            class: 'verdict-healthy',
            confidence: '94.8%',
            jitter: '0.14%',
            shimmer: '1.82%',
            hnr: '24.5 dB',
            ppe: '0.082 (Normal)'
        },
        'VoPt_02': {
            name: 'VoPt_02.wav (PD Patient - Dysarthria Detected)',
            score: 88,
            verdict: 'Parkinson\'s Disease',
            class: 'verdict-parkinson',
            confidence: '92.4%',
            jitter: '2.45%',
            shimmer: '6.78%',
            hnr: '12.3 dB',
            ppe: '0.312 (Vocal Micro-Tremor)'
        },
        'VoCo_03': {
            name: 'VoCo_03.wav (Control Subject - Reading Passage)',
            score: 9,
            verdict: 'Healthy Control',
            class: 'verdict-healthy',
            confidence: '97.2%',
            jitter: '0.08%',
            shimmer: '1.24%',
            hnr: '28.1 dB',
            ppe: '0.054 (Normal)'
        },
        'VoPt_04': {
            name: 'VoPt_04.wav (PD Patient - High Vocal Tremor)',
            score: 79,
            verdict: 'Parkinson\'s Disease',
            class: 'verdict-parkinson',
            confidence: '86.5%',
            jitter: '1.87%',
            shimmer: '5.12%',
            hnr: '15.6 dB',
            ppe: '0.245 (Moderate Tremor)'
        }
    };

    btnRunDiagnosis.addEventListener('click', () => {
        // Toggle layout to loading
        diagPlaceholder.classList.add('hidden');
        diagResults.classList.add('hidden');
        diagLoader.classList.remove('hidden');

        let progress = 0;
        progressDiag.style.width = '0%';
        
        const milestones = [
            { limit: 25, status: 'Initializing neural workspace...' },
            { limit: 50, status: 'Loading input arrays...' },
            { limit: 75, status: 'Analyzing features & executing feed-forward weights...' },
            { limit: 100, status: 'Finalizing classification output...' }
        ];

        const interval = setInterval(() => {
            progress += 5;
            progressDiag.style.width = `${progress}%`;
            
            const currentMilestone = milestones.find(m => progress <= m.limit);
            if (currentMilestone) {
                loaderStatus.textContent = currentMilestone.status;
            }

            if (progress >= 100) {
                clearInterval(interval);
                displayDiagnosisResults();
            }
        }, 80);
    });

    function displayDiagnosisResults() {
        diagLoader.classList.add('hidden');
        diagResults.classList.remove('hidden');

        if (activeModality === 'gait') {
            // Retrieve Gait selection
            const sampleId = document.getElementById('gait-sample-file').value;
            const data = gaitDb[sampleId];

            // Update details
            diagSampleName.textContent = data.name;
            diagModalityBadge.innerHTML = '<i class="fa-solid fa-shoe-prints"></i> Gait VGRF';
            diagScore.textContent = `${data.score}%`;
            diagVerdict.textContent = data.verdict;
            diagVerdict.className = data.class;
            diagConfidence.textContent = `Prediction Confidence: ${data.confidence}`;

            // Radial Progress Circle animation
            updateRadialScore(data.score);

            // Gait specifics
            detailsGait.classList.remove('hidden');
            detailsDraw.classList.add('hidden');
            detailsVoice.classList.add('hidden');

            valGaitLeftHeel.textContent = data.leftHeel;
            valGaitRightHeel.textContent = data.rightHeel;
            valGaitAsymmetry.textContent = data.asymmetry;
            valGaitVariability.textContent = data.variability;
            
        } else if (activeModality === 'voice') {
            // Retrieve Voice selection
            const sampleId = document.getElementById('voice-sample-file').value;
            const data = voiceDb[sampleId];

            // Update details
            diagSampleName.textContent = data.name;
            diagModalityBadge.innerHTML = '<i class="fa-solid fa-microphone-lines"></i> Voice Acoustic Features';
            diagScore.textContent = `${data.score}%`;
            diagVerdict.textContent = data.verdict;
            diagVerdict.className = data.class;
            diagConfidence.textContent = `Prediction Confidence: ${data.confidence}`;

            // Radial Progress Circle animation
            updateRadialScore(data.score);

            // Voice specifics
            detailsGait.classList.add('hidden');
            detailsDraw.classList.add('hidden');
            detailsVoice.classList.remove('hidden');

            valVoiceJitter.textContent = data.jitter;
            valVoiceShimmer.textContent = data.shimmer;
            valVoiceHnr.textContent = data.hnr;
            valVoicePpe.textContent = data.ppe;
            
        } else {
            // Retrieve Drawing Selection
            const data = drawDb[selectedDrawing];

            diagSampleName.textContent = data.name;
            diagModalityBadge.innerHTML = '<i class="fa-solid fa-signature"></i> Drawing CNN';
            diagScore.textContent = `${data.score}%`;
            diagVerdict.textContent = data.verdict;
            diagVerdict.className = data.class;
            diagConfidence.textContent = `Prediction Confidence: ${data.confidence}`;

            // Radial Progress Circle animation
            updateRadialScore(data.score);

            // Drawing specifics
            detailsGait.classList.add('hidden');
            detailsDraw.classList.remove('hidden');
            detailsVoice.classList.add('hidden');

            // Render Drawings dynamically on Canvas!
            renderDrawingCanvas(data.type, data.parkinson);
        }
    }

    // Update Radial SVG Circle
    function updateRadialScore(percent) {
        const radius = 40;
        const circumference = 2 * Math.PI * radius; // 251.3
        
        // Color coding
        if (percent < 30) {
            radialProgressBar.style.stroke = '#10b981'; // Green
        } else if (percent < 70) {
            radialProgressBar.style.stroke = '#f59e0b'; // Amber
        } else {
            radialProgressBar.style.stroke = '#ef4444'; // Red
        }

        // Set offset
        const offset = circumference - (percent / 100) * circumference;
        radialProgressBar.style.strokeDasharray = `${circumference}`;
        radialProgressBar.style.strokeDashoffset = `${offset}`;
    }

    // ----------------------------------------------------
    // 5. Procedural Canvas Drawing & GradCAM Generator
    // ----------------------------------------------------
    function renderDrawingCanvas(type, isParkinson) {
        const ctxOrig = canvasOriginal.getContext('2d');
        const ctxGrad = canvasGradcam.getContext('2d');

        const w = canvasOriginal.width;
        const h = canvasOriginal.height;

        // Clear canvas
        ctxOrig.clearRect(0, 0, w, h);
        ctxGrad.clearRect(0, 0, w, h);

        // Fill background
        ctxOrig.fillStyle = '#0a0a0c';
        ctxOrig.fillRect(0, 0, w, h);
        ctxGrad.fillStyle = '#0a0a0c';
        ctxGrad.fillRect(0, 0, w, h);

        // Configuration
        const centerX = w / 2;
        const centerY = h / 2;
        
        ctxOrig.lineWidth = 2;
        ctxGrad.lineWidth = 2.5;

        // Generate coordinates
        let points = [];
        if (type === 'spiral') {
            const maxTheta = 6 * Math.PI;
            const a = 8; // spiral growth rate
            
            for (let theta = 0.5; theta < maxTheta; theta += 0.05) {
                let r = a * theta;
                
                // Add tremor/jitter if Parkinson
                let noiseX = 0;
                let noiseY = 0;
                if (isParkinson) {
                    // Tremor spikes at specific frequencies
                    const tremorAmp = 3 + 1.5 * Math.sin(theta * 10);
                    noiseX = (Math.random() - 0.5) * tremorAmp;
                    noiseY = (Math.random() - 0.5) * tremorAmp;
                }

                let x = centerX + r * Math.cos(theta) + noiseX;
                let y = centerY + r * Math.sin(theta) + noiseY;
                points.push({ x, y, theta, r });
            }
        } else {
            // Wave drawing
            const startX = 20;
            const endX = w - 20;
            const amp = 30;
            
            for (let x = startX; x < endX; x += 1) {
                let angle = (x / (endX - startX)) * 4 * Math.PI;
                let y = centerY + amp * Math.sin(angle);
                
                // Add noise if Parkinson
                let noiseX = 0;
                let noiseY = 0;
                if (isParkinson) {
                    const tremorAmp = 4 + 2 * Math.sin(angle * 12);
                    noiseX = (Math.random() - 0.5) * tremorAmp;
                    noiseY = (Math.random() - 0.5) * tremorAmp;
                }

                points.push({ x: x + noiseX, y: y + noiseY, angle });
            }
        }

        // Draw Original Input (white ink on dark)
        ctxOrig.strokeStyle = '#ffffff';
        ctxOrig.beginPath();
        if (points.length > 0) {
            ctxOrig.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctxOrig.lineTo(points[i].x, points[i].y);
            }
        }
        ctxOrig.stroke();

        // Draw GradCAM visualization (white ink drawing overlaid with colorful heat highlights)
        // Draw base white line first on GradCAM canvas
        ctxGrad.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctxGrad.beginPath();
        if (points.length > 0) {
            ctxGrad.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctxGrad.lineTo(points[i].x, points[i].y);
            }
        }
        ctxGrad.stroke();

        // Draw GradCAM colored overlay circles on key hot zones (e.g. shaky sections)
        points.forEach((pt, idx) => {
            if (idx % 2 !== 0) return; // limit count to keep it smooth
            
            let heatWeight = 0; // 0 to 1
            
            if (isParkinson) {
                // High heat on segments with higher jitter
                if (type === 'spiral') {
                    // Outer rings and shaky cycles have higher activation
                    heatWeight = 0.4 + 0.6 * Math.abs(Math.sin(pt.theta * 10));
                } else {
                    // Peak and troughs of wave show higher tremor and activation
                    heatWeight = 0.3 + 0.7 * Math.abs(Math.sin(pt.angle * 12));
                }
            } else {
                // Low heat / calm color distribution for healthy lines (mostly cyan/blue)
                heatWeight = 0.05 + 0.1 * Math.random();
            }

            // Map heatWeight to a color gradient: blue (0) -> cyan -> green -> yellow -> red (1)
            let color = 'rgba(0, 0, 255, 0.2)';
            if (heatWeight > 0.8) {
                color = 'rgba(255, 0, 0, 0.4)'; // Red
            } else if (heatWeight > 0.6) {
                color = 'rgba(255, 165, 0, 0.35)'; // Orange
            } else if (heatWeight > 0.4) {
                color = 'rgba(255, 255, 0, 0.3)'; // Yellow
            } else if (heatWeight > 0.2) {
                color = 'rgba(0, 255, 0, 0.2)'; // Green
            } else {
                color = 'rgba(6, 182, 212, 0.15)'; // Cyan
            }

            // Draw heat bubble
            ctxGrad.fillStyle = color;
            ctxGrad.beginPath();
            const radius = isParkinson ? (10 + heatWeight * 20) : 10;
            ctxGrad.arc(pt.x, pt.y, radius, 0, 2 * Math.PI);
            ctxGrad.fill();
        });
    }
});
