/* ================= 工具函数 ================= */
const $ = id => document.getElementById(id);

/* ========= 多语言 ========= */
const I18N = {
"zh-CN": {
    caption: "音波式皮带张力计",
    title: "音波式皮带张力计",
    M: "单位质量 M（g / m / mm）",
    W: "皮带宽度 W（mm）",
    S: "跨距 S（mm）",
    start: "开始测量",
    timeleft: "剩余时间：",
    l_now: "实时张力 T：",
    l_frc: "实时频率 f：",
    l_avg: "平均值：",
    l_max: "最大值：",
    l_min: "最小值：",
    friend: "友情链接：",
    theme: "深色/浅色界面🌗",
    readme: `1. 左右移动滑块可调整测量时间，与皮带振动周期相等为最佳。
2. 如果波形图中未出现稳定波形（绿色段），建议重新测量。
3. 本工具仅供参考，无法保证得出的皮带张力值完全可靠。
4. 上述平均值、最大值和最小值均为稳定波形（绿色段）内的。
5. 计算原理如下，其中T为张力，M为单位质量，W为皮带宽度，f为频率，S为跨距。`
},
"zh-TW": {
    caption: "音波式皮帶張力計",
    title: "音波式皮帶張力計",
    M: "單位質量 M（g / m / mm）",
    W: "皮帶寬度 W（mm）",
    S: "跨距 S（mm）",
    start: "開始測量",
    timeleft: "剩餘時間：",
    l_now: "即時張力 T：",
    l_frc: "實時頻率 f：",
    l_avg: "平均值：",
    l_max: "最大值：",
    l_min: "最小值：",
    friend: "友情連結：",
    theme: "深色/淺色介面🌗",
    readme: `1. 左右移動滑塊可調整測量時間，與皮帶振動週期相等為最佳。
2. 如果波形圖中未出現穩定波形（綠色段），建議重新測量。
3. 本工具僅供參考，無法保證所得的皮帶張力值完全可靠。
4. 上述平均值、最大值和最小值均為穩定波形（綠色段）內的。
5. 計算原理如下，其中T為張力，M為單位質量，W為皮帶寬度，f為頻率，S為跨距。`
},
"en": {
    caption: "Acoustic Belt Tension Meter",
    title: "Acoustic Belt Tension Meter",
    M: "Mass Per Unit (g / m / mm)",
    W: "Belt Width (mm)",
    S: "Span Length (mm)",
    start: "Start",
    timeleft: "Time Left: ",
    l_now: "Current Tension T: ",
    l_frc: "Current Frequency f: ",
    l_avg: "Average: ",
    l_max: "Maximum: ",
    l_min: "Minimum: ",
    friend: "Friendly Links: ",
    theme: "Light / Dark Mode🌗",
    readme: `1. The measurement time can be adjusted by moving the slider left and right, and it is best to match the belt vibration period.
2. If a stable waveform (green segment) does not appear in the waveform graph, I recommend you to measure again.
3. This tool is for reference only, and I cannot guarantee that the belt tension is completely reliable.
4. The average, maximum, and minimum values are all within the stable waveform (green segment).
5. The calculation principle is as follows: T: Tension, M: Mass Per Unit, W: Belt Width, f: Frequency, S: Span Length.`
},
"ja": {
    caption: "音波式ベルト張力計",
    title: "音波式ベルト張力計",
    M: "単位質量 M（g / m / mm）",
    W: "ベルト幅 W（mm）",
    S: "スパン長 S（mm）",
    start: "測定開始",
    timeleft: "残り時間: ",
    l_now: "現在張力 T: ",
    l_frc: "現在周波数 f: ",
    l_avg: "平均: ",
    l_max: "最大: ",
    l_min: "最小: ",
    friend: "フレンドリーリンク: ",
    theme: "ライト/ダークモード🌗",
    readme: `1. スライダーを左右に動かして測定時間を調整します。理想的には、ベルトの振動周期に合わせます。
2. 波形グラフに安定した波形（緑色のセグメント）が表示されない場合は、再測定をお勧めします。
3. このツールは参考用であり、得られたベルト張力値の信頼性は保証されません。
4. 上記の平均値、最大値、最小値はすべて、安定した波形（緑色のセグメント）の範囲内です。
5. 計算原理は次のとおりです。T：張力、M：単位質量、W：ベルト幅、f：周波数、S：スパン長です。`
}
};

let lang = navigator.language || navigator.userLanguage;

function applyLang() {
    const t = I18N[lang];
    $("title").textContent = t.title;
    $("caption").textContent = t.caption;
    $("lblM").textContent = t.M;
    $("lblW").textContent = t.W;
    $("lblS").textContent = t.S;
    $("startBtn").textContent = t.start;
    $("friend").textContent = t.friend;
    $("theme").textContent = t.theme;
    $("timeleft").textContent = t.timeleft;
    $("l_now").textContent = t.l_now;
    $("l_frc").textContent = t.l_frc;
    $("l_avg").textContent = t.l_avg;
    $("l_max").textContent = t.l_max;
    $("l_min").textContent = t.l_min;
    $("readme").textContent = t.readme;
}
$("lang").onchange = e => { lang = e.target.value; applyLang(); };

applyLang();

/* ================= 黑暗模式（系统级） ================= */
const mediaDark = window.matchMedia("(prefers-color-scheme: dark)");
let userOverrideTheme = null; // null = 跟随系统

function applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
}

// 初始应用系统主题
applyTheme(mediaDark.matches);

// 监听系统主题变化
mediaDark.addEventListener("change", e => {
    if (userOverrideTheme === null) {
        applyTheme(e.matches);
    }
});

// 用户手动切换（覆盖系统）
$("theme").onclick = () => {
    const isDark = !document.body.classList.contains("dark");
    userOverrideTheme = isDark;
    applyTheme(isDark);
};


/* ================= 参数 ================= */
const slider = document.getElementById("mySlider");
const sliderValue = document.getElementById("sliderValue");
slider.addEventListener("input", function () {
   sliderValue.textContent = parseFloat(this.value).toFixed(1);
});
const RECORD_MS = parseFloat(slider.value) * 1000;
const STABLE_WINDOW = 200;   // ms
const STABLE_RATIO  = 0.05;  // 5%
const STABLE_MIN_MS = 500;   // ms

/* ================= 画布 ================= */
const canvas = $("curve");
const ctx = canvas.getContext("2d");
canvas.width = 460;
canvas.height = 160;

/* ================= 音频 ================= */
let audioCtx, analyser, freqData;

/* ================= 状态 ================= */
let recording = false;
let startTime = 0;

/*
series: [{t, T}]
stableSeries: 稳定段数据
*/
let series = [];
let stableSeries = [];

/* ================= 核心计算 ================= */
function calcTension(f) {
    const M = Number(mass.value);
    const W = Number(width.value);
    const S = Number(span.value);
    return 4 * M * W * S * S * f * f * 1e-9;
}

/* ================= 稳定段检测 ================= */
function detectStableSegment() {
    stableSeries = [];

    let stableStart = null;

    for (let i = 0; i < series.length; i++) {
        const t0 = series[i].t - STABLE_WINDOW;
        const win = series.filter(p => p.t >= t0 && p.t <= series[i].t);

        if (win.length < 5) continue;

        const Ts = win.map(p => p.T);
        const mean = Ts.reduce((a,b)=>a+b,0) / Ts.length;
        const std = Math.sqrt(
            Ts.reduce((a,b)=>a+(b-mean)**2,0) / Ts.length
        );

        if (std / mean < STABLE_RATIO) {
            if (stableStart === null) stableStart = series[i].t;
        } else {
            if (stableStart !== null &&
                series[i].t - stableStart >= STABLE_MIN_MS) {
                stableSeries = series.filter(
                    p => p.t >= stableStart && p.t <= series[i].t
                );
                return;
            }
            stableStart = null;
        }
    }

    if (stableStart !== null) {
        stableSeries = series.filter(p => p.t >= stableStart);
    }
}

/* ================= 曲线绘制 ================= */
function drawCurve() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if (series.length < 2) return;

    const Ts = series.map(p=>p.T);
    const minT = Math.min(...Ts);
    const maxT = Math.max(...Ts);
    const span = Math.max(1, maxT - minT);

    ctx.beginPath();
    series.forEach((p,i)=>{
        const x = p.t / RECORD_MS * canvas.width;
        const y = canvas.height - (p.T - minT) / span * canvas.height;
        i ? ctx.lineTo(x,y) : ctx.moveTo(x,y);
    });
    ctx.strokeStyle = "#0070f3";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 稳定段高亮
    if (stableSeries.length > 1) {
        ctx.beginPath();
        stableSeries.forEach((p,i)=>{
            const x = p.t / RECORD_MS * canvas.width;
            const y = canvas.height - (p.T - minT) / span * canvas.height;
            i ? ctx.lineTo(x,y) : ctx.moveTo(x,y);
        });
        ctx.strokeStyle = "#00c853";
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}

/* ================= 结束处理 ================= */
function finishMeasurement() {
    recording = false;

    detectStableSegment();
    const data = stableSeries.length ? stableSeries : series;
    if (data.length === 0) return;

    const Ts = data.map(p=>p.T);
    const avg = Ts.reduce((a,b)=>a+b,0) / Ts.length;

    $("avg").textContent = `${avg.toFixed(1)} N`;
    $("max").textContent = `${Math.max(...Ts).toFixed(1)} N`;
    $("min").textContent = `${Math.min(...Ts).toFixed(1)} N`;

    drawCurve();
}

/* ================= 主循环 ================= */
function loop() {
    if (!recording) return;

    analyser.getByteFrequencyData(freqData);

    const sr = audioCtx.sampleRate;
    const fft = analyser.fftSize;

    let idx = 0;
    for (let i = 1; i < freqData.length; i++)
        if (freqData[i] > freqData[idx]) idx = i;

    if (freqData[idx] > 20) {
        const f = idx * sr / fft;
        const T = calcTension(f);

        const t = performance.now() - startTime;
        series.push({ t, T });

        $("nowT").textContent = `${T.toFixed(1)} N`;
        drawCurve();
    }

    const remain = Math.max(0, (RECORD_MS - (performance.now()-startTime))/1000);
    $("countdown").textContent = remain.toFixed(1);

    if (remain > 0) {
        requestAnimationFrame(loop);
    } else {
        finishMeasurement();
    }
}

/* ================= 启动 ================= */
$("startBtn").onclick = async () => {

    series = [];
    stableSeries = [];

    if (!audioCtx) {
        audioCtx = new AudioContext();
        const stream = await navigator.mediaDevices.getUserMedia({audio:true});
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 4096;
        audioCtx.createMediaStreamSource(stream).connect(analyser);
        freqData = new Uint8Array(analyser.frequencyBinCount);
    }

    recording = true;
    startTime = performance.now();
    loop();
};
