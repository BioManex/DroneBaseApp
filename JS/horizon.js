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

    ctx.save();

    // Circular Clip Region
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    ctx.save();

    // Translation and rotation to make it work properly
    ctx.translate(cx, cy);
    ctx.rotate((roll * Math.PI) / 180);

    const pitchOffset = pitch * PITCH_PIXELS_PER_DEGREE;
    const yawOffset = yaw * YAW_PIXELS_PER_DEGREE;

    // Draw Sky
    ctx.fillStyle = '#1976d2';
    ctx.fillRect(-width, -height * 2 + pitchOffset, width * 2, height * 2);

    // Draw Ground
    ctx.fillStyle = '#078400';
    ctx.fillRect(-width, pitchOffset, width * 2, height * 2);

    // White Horizon Divider Line
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-width, pitchOffset);
    ctx.lineTo(width, pitchOffset);
    ctx.stroke();

    // Pitch & Yaw Ladder Marks 
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.lineWidth = 1.5;

    // Pitch Marks (-40 deg to 40 deg)
    for (let deg = -40; deg <= 40; deg += 10) {
        if (deg === 0) continue;
        const x = yawOffset - YAW_PIXELS_PER_DEGREE;
        const y = pitchOffset - (deg * PITCH_PIXELS_PER_DEGREE);
        const lineLength = (deg % 20 === 0) ? 40 : 20;

        ctx.beginPath();
        ctx.moveTo(-lineLength / 2, y);
        ctx.lineTo(lineLength / 2, y);
        ctx.stroke();

        ctx.fillText(`${Math.abs(deg)}`, (lineLength / 2) + 12, y + 3);
        ctx.fillText(`${Math.abs(deg)}`, -(lineLength / 2) - 12, y + 3);
    }

    // Yaw Marks (-180 deg to 180 deg +/- 40 deg to allow it to appear as a full rotation)
    for(let deg = -220; deg <= 220; deg += 10) {
        // if (deg === 0 ) continue;
        const x =  yawOffset - (deg * YAW_PIXELS_PER_DEGREE);
        const y = pitchOffset - PITCH_PIXELS_PER_DEGREE;
        const lineLength = (deg % 20 === 0) ? 30 : 10;

        ctx.beginPath();
        ctx.moveTo(x, -lineLength / 2 + y + 3);
        ctx.lineTo(x, lineLength / 2 + y + 3);
        ctx.stroke();

        let fixedDeg = deg;
        if (deg < -180) {
            fixedDeg = 180 + (deg + 180);
        }else if (deg > 180) {
            fixedDeg = 180 - (deg - 180);
        }

        ctx.fillText(`${Math.abs(fixedDeg)}`, x , (lineLength / 2) + 12 + y + 2);
        ctx.fillText(`${Math.abs(fixedDeg)}`, x , -(lineLength / 2) - 6 + y + 2);
    }

    ctx.restore();

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

    ctx.restore();

    // Roll Degree Marks
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

    ctx.restore();

    // Wing Reference Marker
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 3.5;

    ctx.fillStyle = '#ffcc00';
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx - 65, cy);
    ctx.lineTo(cx - 20, cy);
    ctx.lineTo(cx - 20, cy + 12);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx + 65, cy);
    ctx.lineTo(cx + 20, cy);
    ctx.lineTo(cx + 20, cy + 12);
    ctx.stroke();

    // Outer ring style
    ctx.strokeStyle = '#30363d';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 4, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
}

function animate() {
    pitch = -10;
    roll = 30;
    yaw = Date.now() / 100 - 18000000000;

    //Correct the yaw if out of bounds
    if (yaw > 180) {
        yaw = ((yaw + 180) % 360) - 180;
    }else if (yaw < -180) {
        yaw = -((Math.abs(yaw) + 180) % 360) + 180;
    }

    document.getElementById('pitch-value').innerText = pitch.toFixed(1);
    document.getElementById('roll-value').innerText = roll.toFixed(1);
    document.getElementById('yaw-value').innerText = yaw.toFixed(1);

    drawHorizon(pitch, roll, yaw);

    requestAnimationFrame(animate);
}

animate();