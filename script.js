const N = 1024;
const K = N / 4;
const STEP = 13;
const FI = Math.PI / 16;

function calculateLabels() {
    let labels = [];
    let m = K;
    while (m < 2 * N) {
        labels.push(m);
        m += 13;
    }
    return labels;
}

function harmonicSignal(m, fi) {
    let signal = [];
    for (let n = 0; n <= m; n++) {
        let y = Math.sin(2 * Math.PI * n / N + fi);
        signal.push(y);
    }
    return signal;
}

function calculateHarmonicSignals() {
    let xskzs = [];
    let xskos = [];
    let ampls = [];
    for (let m = K; m < 2 * N; m += STEP) {
        let signal = harmonicSignal(m, 0);
        xskzs.push(0.707 - calculateRmsValue1(signal, m));
        xskos.push(0.707 - calculateRmsValue2(signal, m));
        ampls.push(1 - calculateAmplitude(signal));
    }
    let ctx1a = document.getElementById('task1').getContext('2d');
    let chart1a = new Chart(ctx1a, {
        type: 'line',
        data: {
            labels: calculateLabels(),
            datasets: [
                {
                    label: `Xскз`,
                    backgroundColor: 'transparent',
                    borderColor: 'rgb(255, 99, 132)',
                    data: xskzs,
                    pointRadius: 1,
                    pointHoverRadius: 1
                },
                {
                    label: `Xско`,
                    backgroundColor: 'transparent',
                    borderColor: 'rgb(75,78,246)',
                    data: xskos,
                    pointRadius: 1,
                    pointHoverRadius: 1
                },
                {
                    label: `A`,
                    backgroundColor: 'transparent',
                    borderColor: 'rgb(34,218,13)',
                    data: ampls,
                    pointRadius: 1,
                    pointHoverRadius: 1
                },
            ]
        },

        options: {}
    });
}

function calculateHarmonicSignalsWithFi(fi) {
    let xskzs = [];
    let xskos = [];
    let ampls = [];
    for (let m = K; m < 2 * N; m += STEP) {
        let signal = harmonicSignal(m, fi);
        xskzs.push(0.707 - calculateRmsValue1(signal, m));
        xskos.push(0.707 - calculateRmsValue2(signal, m));
        ampls.push(1 - calculateAmplitude(signal));
    }
    let ctx1a = document.getElementById('task2').getContext('2d');
    let chart1a = new Chart(ctx1a, {
        type: 'line',
        data: {
            labels: calculateLabels(),
            datasets: [
                {
                    label: `Xскз`,
                    backgroundColor: 'transparent',
                    borderColor: 'rgb(255, 99, 132)',
                    data: xskzs,
                    pointRadius: 1,
                    pointHoverRadius: 1
                },
                {
                    label: `Xско`,
                    backgroundColor: 'transparent',
                    borderColor: 'rgb(75,78,246)',
                    data: xskos,
                    pointRadius: 1,
                    pointHoverRadius: 1
                },
                {
                    label: `A`,
                    backgroundColor: 'transparent',
                    borderColor: 'rgb(34,218,13)',
                    data: ampls,
                    pointRadius: 1,
                    pointHoverRadius: 1
                },
            ]
        },

        options: {}
    });
}

function calculateRmsValue1(signal, m) {
    let sum = 0;
    for (let i = 0; i < signal.length; i++) {
        sum += signal[i] * signal[i];
    }
    return Math.sqrt(sum / (m + 1));
}

function calculateRmsValue2(signal, m) {
    let sum = signal.reduce((prev, next) => prev + next, 0);
    return Math.sqrt(calculateRmsValue1(signal, m) - Math.pow(sum / (m + 1), 2));
}

function calculateAmplitude(signal) {
    let a = 0;
    let b = 0;
    for (let t = 0; t < signal.length; t++) {
        a += signal[t] * Math.cos(2 * Math.PI * t / signal.length);
        b += signal[t] * Math.sin(2 * Math.PI * t / signal.length);
    }
    a = a * 2 / signal.length;
    b = b * 2 / signal.length;
    return Math.sqrt(a * a + b * b);
}

// function calculateAmplitudesByFourierTransform(signal) {
//     const N = signal.length;
//     let amplitudes = [];
//     for (let k = 0; k < signal.length; k++) {
//         let sum = math.complex(0, 0);
//         for (let n = 0; n < signal.length; n++) {
//             let arg = 2 * math.pi * k * n / N;
//             let cos = math.cos(arg);
//             let sin = math.sin(arg) * (-1);
//             let expr = math.subtract(cos, math.multiply(math.i, sin));
//             let v = math.multiply(signal[n], expr);
//             sum = math.add(sum, v);
//         }
//         amplitudes.push(sum);
//     }
//     return amplitudes;
// }

calculateHarmonicSignals()
calculateHarmonicSignalsWithFi(FI)