const canvas = document.getElementById('pfd-canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const cx = width / 2;
const cy = height / 2;
const radius = width / 2 - 8; // Inner horizon circle radius
const PITCH_PIXELS_PER_DEGREE = 3.5;
const YAW_PIXELS_PER_DEGREE = 3.5;

let pitch = 0;
let roll = 0;

function drawHorizon(pitch, roll, yaw) {
    ctx.clearRect(0, 0, width, height);

    // ==========================================
    // LAYER 1: CIRCULAR CLIP & ROTATED SKY/GROUND
    // ==========================================
    ctx.save();

    // Create a circular clip region so horizon only renders inside the instrument glass
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    ctx.save();
    // Translate to center and rotate context based on roll angle
    ctx.translate(cx, cy);
    ctx.rotate((roll * Math.PI) / 180);

    const pitchOffset = pitch * PITCH_PIXELS_PER_DEGREE;
    const yawOffset = yaw * YAW_PIXELS_PER_DEGREE;

    // Draw Sky (Blue)
    ctx.fillStyle = '#1976d2';
    ctx.fillRect(-width, -height * 2 + pitchOffset, width * 2, height * 2);

    // Draw Ground (Brown)
    ctx.fillStyle = '#078400';
    ctx.fillRect(-width, pitchOffset, width * 2, height * 2);

    // White Horizon Divider Line
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-width, pitchOffset);
    ctx.lineTo(width, pitchOffset);
    ctx.stroke();

    // Pitch Ladder Marks (-40° to +40°)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.lineWidth = 1.5;


    for (let deg = -40; deg <= 40; deg += 10) {
        if (deg === 0) continue;
        const x = yawOffset - YAW_PIXELS_PER_DEGREE;
        const y = pitchOffset - (deg * PITCH_PIXELS_PER_DEGREE);
        const lineLength = (deg % 20 === 0) ? 40 : 20;

        ctx.beginPath();
        ctx.moveTo(-lineLength / 2 + x, y);
        ctx.lineTo(lineLength / 2 + x, y);
        ctx.stroke();

        ctx.fillText(`${Math.abs(deg)}`, (lineLength / 2) + 12 + x, y + 3);
        ctx.fillText(`${Math.abs(deg)}`, -(lineLength / 2) - 12 + x, y + 3);
    }

    for(let deg = -40; deg <= 40; deg += 10) {
        if (deg === 0 ) continue;
        const x =  yawOffset - (deg * YAW_PIXELS_PER_DEGREE);
        const y = pitchOffset - PITCH_PIXELS_PER_DEGREE;
        const lineLength = (deg % 20 === 0) ? 40 : 20;

        ctx.beginPath();
        ctx.moveTo(x, -lineLength / 2 + y + 2);
        ctx.lineTo(x, lineLength / 2 + y + 2);
        ctx.stroke();

        ctx.fillText(`${Math.abs(deg)}`, x , (lineLength / 2) + 12 + y + 2);
        ctx.fillText(`${Math.abs(deg)}`, x , -(lineLength / 2) - 6 + y + 2);
    }

    ctx.restore(); // Restore rotated transform, but retain circular clip

    // Roll Pointer Triangle attached to sky top
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((roll * Math.PI) / 180);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(0, -radius + 2);
    ctx.lineTo(-7, -radius + 14);
    ctx.lineTo(7, -radius + 14);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.restore(); // Exit clip region

    // ==========================================
    // LAYER 2: ROLL DEGREE SCALE MARKS (TOP RIM)
    // ==========================================
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 2;

    const rollTicks = [-60, -45, -30, -20, -10, 0, 10, 20, 30, 45, 60];
    rollTicks.forEach(angle => {
    ctx.save();
    ctx.rotate((angle * Math.PI) / 180);
    
    ctx.beginPath();
    ctx.moveTo(0, -radius);
    ctx.lineTo(0, -radius + (Math.abs(angle) % 30 === 0 ? 12 : 6));
    ctx.stroke();
    
    ctx.restore();
    });

    // Top Center Reference Pointer (Yellow triangle at 0° roll top)
    ctx.fillStyle = '#ffcc00';
    ctx.beginPath();
    ctx.moveTo(0, -radius + 2);
    ctx.lineTo(-6, -radius - 8);
    ctx.lineTo(6, -radius - 8);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // ==========================================
    // LAYER 3: FIXED AIRCRAFT RETICLE (FOREGROUND)
    // ==========================================
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 3.5;

    // Center Reference Dot
    ctx.fillStyle = '#ffcc00';
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();

    // Left Wing Indicator
    ctx.beginPath();
    ctx.moveTo(cx - 65, cy);
    ctx.lineTo(cx - 20, cy);
    ctx.lineTo(cx - 20, cy + 12);
    ctx.stroke();

    // Right Wing Indicator
    ctx.beginPath();
    ctx.moveTo(cx + 65, cy);
    ctx.lineTo(cx + 20, cy);
    ctx.lineTo(cx + 20, cy + 12);
    ctx.stroke();

    // ==========================================
    // LAYER 4: OUTER BEZEL & GLASS FRAME
    // ==========================================
    ctx.strokeStyle = '#30363d';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 4, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#0d1117';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
}

// Flight Dynamics Simulation Loop
function animate() {
    pitch = 0;
    roll = 0;
    yaw = 0;

    document.getElementById('pitch-value').innerText = pitch.toFixed(1);
    document.getElementById('roll-value').innerText = roll.toFixed(1);
    document.getElementById('yaw-value').innerText = yaw.toFixed(1);

    drawHorizon(pitch, roll, yaw);

    requestAnimationFrame(animate);
}

animate();