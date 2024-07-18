//封面纯色
function coverColor() {
    var path = document.getElementById("post-cover")?.src;
    // console.log(path);
    if (path !== undefined) {

        // 获取颜色 https://github.com/fast-average-color/fast-average-color
        const fac = new FastAverageColor();

        fac.getColorAsync(path, {
            // 忽略白色
            ignoredColor: [255, 255, 255, 255]
        })
            .then(color => {
                /**
                 * 获取数据后的处理程序
                 */
                var value = color.hex;
                // console.log(value);
                // document.getElementById('page-header').style.backgroundColor=value;
                // document.styleSheets[0].addRule('#page-header:before','background: '+ value +'!important');

                if (getContrastYIQ(value) === "light") {
                    value = LightenDarkenColor(colorHex(value), -40)
                }

                const style = document.createElement('style');
                document.head.appendChild(style);
                const styleSheet = style.sheet;
                styleSheet.insertRule(`:root{--efu-main: ${value}!important}`, styleSheet.cssRules.length);
                styleSheet.insertRule(`:root{--efu-main-op: ${value}23!important}`, styleSheet.cssRules.length);
                styleSheet.insertRule(`:root{--efu-main-op-deep: ${value}dd!important}`, styleSheet.cssRules.length);
                styleSheet.insertRule(`:root{--efu-main-none: ${value}00!important}`, styleSheet.cssRules.length);
                sco.initThemeColor()
                document.getElementById("coverdiv").classList.add("loaded");
            })
            .catch(e => {
                console.log(e);
            });

    } else {
        // document.styleSheets[0].addRule('#page-header:before','background: none!important');
        const style = document.createElement('style');
        document.head.appendChild(style);
        const styleSheet = style.sheet;
        styleSheet.insertRule(`:root{--efu-main: var(--efu-theme)!important}`, styleSheet.cssRules.length);
        styleSheet.insertRule(`:root{--efu-main-op: var(--efu-theme-op)!important}`, styleSheet.cssRules.length);
        styleSheet.insertRule(`:root{--efu-main-op-deep:var(--efu-theme-op-deep)!important}`, styleSheet.cssRules.length);
        styleSheet.insertRule(`:root{--efu-main-none: var(--efu-theme-none)!important}`, styleSheet.cssRules.length);
        sco.initThemeColor()
    }
}

//RGB颜色转化为16进制颜色
function colorHex(str) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var that = str;
    if (/^(rgb|RGB)/.test(that)) {
        var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i = 0; i < aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = that;
        }
        return strHex;
    } else if (reg.test(that)) {
        var aNum = that.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return that;
        } else if (aNum.length === 3) {
            var numHex = "#";
            for (var i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return that;
    }
}

//16进制颜色转化为RGB颜色
function colorRgb(str) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = str.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "rgb(" + sColorChange.join(",") + ")";
    } else {
        return sColor;
    }
}

//变暗变亮主方法
function LightenDarkenColor(col, amt) {
    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;


    return (usePound ? "#" : "") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
}

//判断是否为亮色
function getContrastYIQ(hexcolor) {
    var colorrgb = colorRgb(hexcolor);
    var colors = colorrgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    var red = colors[1];
    var green = colors[2];
    var blue = colors[3];
    var brightness;
    brightness = (red * 299) + (green * 587) + (blue * 114);
    brightness = brightness / 255000;
    if (brightness >= 0.5) {
        return "light";
    } else {
        return "dark";
    }
}