const default_color = "#b0b1b0";
const yellow_color = "#ffd82a";
const green_color = "#47ff62";
const colors = [
    [168, 80, 236], [139, 42, 190],
    [170, 210, 250], [59, 110, 199],
    [69, 250, 179], [22, 190, 124],
    [255, 214, 67], [227, 181, 16],
    [250, 140, 18], [200, 110, 13],
    [], [255, 80, 18]
]

function mix_colors(color_1, color_2, color_3) {
    let r = 0;
    let g = 0;
    let b = 0;

    r += Math.pow(color_1[0], 2) * 0.5;
    r += Math.pow(color_2[0], 2) * 0.333;
    r += Math.pow(color_3[0], 2) * 0.167;

    g += Math.pow(color_1[1], 2) * 0.5;
    g += Math.pow(color_2[1], 2) * 0.333;
    g += Math.pow(color_3[1], 2) * 0.167;

    b += Math.pow(color_1[2], 2) * 0.5;
    b += Math.pow(color_2[2], 2) * 0.333;
    b += Math.pow(color_3[2], 2) * 0.167;

    r = Math.sqrt(r);
    g = Math.sqrt(g);
    b = Math.sqrt(b);

    return [Math.round(r), Math.round(g), Math.round(b)];
}

function colors_equal(lhs, rhs) {
    return lhs[0] === rhs[0] &&
        lhs[1] == rhs[1] &&
        lhs[2] == rhs[2]
}

function colors_contained(list, color) {
    contained = false;
    list.forEach(color_to_test => {
        if (color_to_test[0] == color[0]
            && color_to_test[1] == color[1]
            && color_to_test[2] == color[2]) {
                contained = true;
        }
    });

    return contained;
}

function get_color(color, checked, index) {
    if (colors_equal(color, checked[index])) {
        return green_color;
    }

    if (colors_equal(color, checked[0])) {
        return yellow_color;
    } else if (colors_equal(color, checked[1])) {
        return yellow_color;
    } else if (colors_equal(color, checked[2])) {
        return yellow_color;
    }

    return default_color;
}

function mix_colors_to_string(color_1, color_2, color_3) {
    let col = mix_colors(color_1, color_2, color_3);

    return `rgb(${col[0]}, ${col[1]}, ${col[2]})`
}

let current = [];
let attempt = 1;
let finished = false;

function update() {
    if (attempt > 6 && !finished) {
        document.getElementById("segment-1")
            .style.background = `rgb(${target[0][0]}, ${target[0][1]}, ${target[0][2]})`;
        document.getElementById("segment-2")
            .style.background = `rgb(${target[1][0]}, ${target[1][1]}, ${target[1][2]})`;
        document.getElementById("segment-3")
            .style.background = `rgb(${target[2][0]}, ${target[2][1]}, ${target[2][2]})`;
        return;
    } else if (finished) { return; }

    if (current.length > 0) {
        document.querySelector(`#attempt-${attempt} .color-1`)
            .style.background = `rgb(${current[0][0]}, ${current[0][1]}, ${current[0][2]})`;
        document.getElementById("segment-1")
            .style.background = `rgb(${current[0][0]}, ${current[0][1]}, ${current[0][2]})`;
    } else {
        document.querySelector(`#attempt-${attempt} .color-1`).style.background = default_color;
        document.getElementById("segment-1")
            .style.background = default_color;
    }

    if (current.length > 1) {
        document.querySelector(`#attempt-${attempt} .color-2`)
            .style.background = `rgb(${current[1][0]}, ${current[1][1]}, ${current[1][2]})`
        document.getElementById("segment-2")
            .style.background = `rgb(${current[1][0]}, ${current[1][1]}, ${current[1][2]})`;
    } else {
        document.querySelector(`#attempt-${attempt} .color-2`).style.background = default_color;
        document.getElementById("segment-2").style.background = default_color;
    }

    if (current.length > 2) {
        document.querySelector(`#attempt-${attempt} .color-3`)
            .style.background = `rgb(${current[2][0]}, ${current[2][1]}, ${current[2][2]})`
        document.getElementById("segment-3")
            .style.background = `rgb(${current[2][0]}, ${current[2][1]}, ${current[2][2]})`;
    } else {
        document.querySelector(`#attempt-${attempt} .color-3`).style.background = default_color;
        document.getElementById("segment-3").style.background = default_color;
    }
}

let target = [];
function new_target() {
    current = [];
    attempt = 1;
    finished = false;

    document.querySelectorAll("#attempts .color").forEach(element => {
        element.style.background = default_color;
        element.style.outlineColor = "#000000";
    });

    document.querySelectorAll("#attempts .attempt-result").forEach(element => {
        element.style.outlineColor = default_color;
    });


    document.querySelectorAll(".attempt-result span").forEach(element => {
        element.innerText = "N/A";
        element.style.color = "#000000";
    });

    target = [
        colors[Math.round(Math.random() * colors.length) % colors.length],
        colors[Math.round(Math.random() * colors.length) % colors.length],
        colors[Math.round(Math.random() * colors.length) % colors.length]
    ];

    while (colors_contained(target, [])) {
        target = [
            colors[Math.round(Math.random() * colors.length) % colors.length],
            colors[Math.round(Math.random() * colors.length) % colors.length],
            colors[Math.round(Math.random() * colors.length) % colors.length]
        ];
    }

    while (target[1] == target[0] || colors_contained(target, [])) {
        target[1] = colors[Math.round(Math.random() * colors.length) % colors.length];
    }

    while (target[2] == target[1] || target[2] == target[0] || colors_contained(target, [])) {
        target[2] = colors[Math.round(Math.random() * colors.length) % colors.length];
    }

    document.getElementById("target").style.background = mix_colors_to_string(target[0], target[1], target[2]);
    update();
}

function get_readable_text_color(color) {
    const brightness = Math.round(((color[0] * 299) + (color[1] * 587) + (color[2] * 114)) / 1000);
    if (brightness >= 150) { return "#000000"; }
    return "#ffffff";
}

window.addEventListener("load", () => {
    for (let i = 0; i < colors.length; i++) {
        const column = Math.floor(i / 2) + 1;
        const top = i % 2 != 0;

        if (colors[i].length != 3) { continue; }

        let element = document.getElementById(`color-${top && "top" || "bottom"}-${column}`);
        element.style.backgroundColor = `rgb(${colors[i][0]}, ${colors[i][1]}, ${colors[i][2]})`;
        element.addEventListener("click", () => {
            if (current.length > 3 || finished || colors_contained(current, colors[i])) {
                return;
            }

            current.push(colors[i]);
            update();
        })
    }

    document.getElementById("retry-button").addEventListener("click", new_target)
    document.getElementById("remove-color").addEventListener("click", () => {
        if (finished) {
            return;
        }

        current.pop();
        update();
    });

    document.getElementById("finalize-attempt").addEventListener("click", () => {
        if (current.length < 3 || finished) {
            return;
        }

        const current_mixed = mix_colors(current[0], current[1], current[2]);
        const target_mixed = mix_colors(target[0], target[1], target[2]);

        let result = document.querySelector(`#attempt-${attempt} .attempt-result`);
        const mixed_str = mix_colors_to_string(current[0], current[1], current[2]);
        result.style.background = mixed_str;
        result.style.outlineColor = mixed_str;

        let result_text = result.querySelector("span");
        result_text.style.color = get_readable_text_color(current_mixed);
        console.log(result.style.color);

        let perc_r = Math.abs(current_mixed[0] - target_mixed[0]) / 255;
        let perc_g = Math.abs(current_mixed[1] - target_mixed[1]) / 255;
        let perc_b = Math.abs(current_mixed[2] - target_mixed[2]) / 255;
        let average = (perc_r + perc_g + perc_b) / 3;
        result_text.innerText = `${Math.abs(100 - average * 100).toFixed(1)}%`;

        document.querySelector(`#attempt-${attempt} .color-1`)
            .style.outlineColor = get_color(current[0], target, 0);
        document.querySelector(`#attempt-${attempt} .color-2`)
            .style.outlineColor = get_color(current[1], target, 1);
        document.querySelector(`#attempt-${attempt} .color-3`)
            .style.outlineColor = get_color(current[2], target, 2);
        
        if (Math.ceil(average) == 0) {
            current = target;
            attempt = 999;
            finished = true;

            current[0] = current_mixed;
            current[1] = current_mixed;
            current[2] = current_mixed;
        } else {
            current = [];
        }

        attempt += 1;

        update();
    });

    new_target();
});
