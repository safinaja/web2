document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    const rCheckboxes = document.querySelectorAll('input[name="r"]');

    let currentR = null;


    drawPlotWithTextLabels();


    canvas.addEventListener('click', function(event) {
        if (!currentR) {
            alert('Сначала выберите радиус R!');
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;


        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const r_pixels = canvas.width / 3;
        const mathX = ((x - centerX) / r_pixels) * currentR;
        const mathY = ((centerY - y) / r_pixels) * currentR;


        setXValue(mathX.toFixed(3));
        document.getElementById('yInput').value = mathY.toFixed(3);


        document.getElementById('valForm').submit();
    });


    rCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                rCheckboxes.forEach(cb => {
                    if (cb !== this) cb.checked = false;
                });
                currentR = parseFloat(this.value);
                document.getElementById('r').value = currentR;
                drawPlot(currentR);
                redrawPoints(currentR);
            } else {
                currentR = null;
                document.getElementById('r').value = '';
                drawPlotWithTextLabels();
            }
        });
    });


    function drawPlot(r) {
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const r_pixels = width / 3;

        ctx.clearRect(0, 0, width, height);


        ctx.fillStyle = "rgba(147, 112, 219, 0.5)";
        ctx.strokeStyle = "#4B0082";
        ctx.lineWidth = 1;


        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + r_pixels / 2 , centerY);
        ctx.lineTo(centerX, centerY - r_pixels);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();


        ctx.beginPath();
        ctx.rect(centerX, centerY, r_pixels / 2, r_pixels);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, r_pixels, Math.PI / 2, Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        drawAxes();


        ctx.fillStyle = "black";
        const labels = [`-${r}`, `-${r / 2}`, `${r / 2}`, `${r}`];
        const positions = [-r_pixels, -r_pixels / 2, r_pixels / 2, r_pixels];
        positions.forEach((pos, i) => {
            ctx.fillText(labels[i], centerX + pos - 5, centerY - 5);
            ctx.fillText(labels[i], centerX + 5, centerY - pos + 3);
        });
    }


    function drawPlotWithTextLabels() {
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const r_pixels = width / 3;

        ctx.clearRect(0, 0, width, height);

        drawAxes();


        ctx.fillStyle = "black";
        const labels = ["-R", "-R/2", "R/2", "R"];
        const positions = [-r_pixels, -r_pixels / 2, r_pixels / 2, r_pixels];
        positions.forEach((pos, i) => {
            ctx.fillText(labels[i], centerX + pos - 5, centerY - 5);
            ctx.fillText(labels[i], centerX + 5, centerY - pos + 3);
        });
    }


    function drawAxes() {
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const arrowSize = 10;

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;


        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.moveTo(width, centerY);
        ctx.lineTo(width - arrowSize, centerY - arrowSize / 2);
        ctx.moveTo(width, centerY);
        ctx.lineTo(width - arrowSize, centerY + arrowSize / 2);


        ctx.moveTo(centerX, height);
        ctx.lineTo(centerX, 0);
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX - arrowSize / 2, arrowSize);
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX + arrowSize / 2, arrowSize);
        ctx.stroke();


        ctx.font = '14px Arial';
        ctx.fillText('X', width - 10, centerY - 10);
        ctx.fillText('Y', centerX + 10, 10);
        ctx.fillText('0', centerX - 10, centerY + 15);
    }


    function drawPoint(x, y, r, isHit) {
        if (isNaN(r) || r <= 0) return;

        const r_pixels = canvas.width / 3;
        const scale = r_pixels / r;

        const canvasX = canvas.width / 2 + x * scale;
        const canvasY = canvas.height / 2 - y * scale;

        ctx.fillStyle = isHit ? "green" : "red";
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 4, 0, 2 * Math.PI);
        ctx.fill();


        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    function redrawPoints(currentR) {
        if (typeof historyPoints !== "undefined" && historyPoints) {
            historyPoints.forEach((point) => {
                if (point.r == currentR) {
                    drawPoint(point.x, point.y, point.r, point.hit);
                }
            });
        }
    }


    window.setXValue = function(value) {
        const xButtons = document.querySelectorAll('.x-btn');
        xButtons.forEach(btn => {
            if (Math.abs(btn.getAttribute('data-value') - value) < 0.001) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });
        document.getElementById('x').value = value;
    };


    const savedR = localStorage.getItem('selected_r_value');
    if (savedR) {
        const checkbox = document.querySelector(`input[name="r"][value="${savedR}"]`);
        if (checkbox) {
            checkbox.checked = true;
            currentR = parseFloat(savedR);
            setTimeout(() => {
                drawPlot(currentR);
                redrawPoints(currentR);
            }, 100);
        }
    }


    rCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem('selected_r_value', this.value);
            }
        });
    });
});
