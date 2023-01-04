
function mirae() {
    let mi_adkey = "okrcl";
    let mi_is_defender = "";
    let mi_date =
    parseInt(
        new Date()
        .toISOString()
        .slice(0, 13)
        .replace(/-/g, "")
        .replace(/t/gi, "")
        .replace(/:/gi, "")
    ) + Math.abs(new Date().getTimezoneOffset() / 60);
    let mi_script =
    "<scr" +
    "ipt " +
    "type='text/javascr" +
    "ipt' src='//log1.toup.net/mirae_log.js?t=" +
    mi_date +
    "' async='true'></scr" +
    "ipt>";
    document.writeln(mi_script);
}

export default function callMirae() {
    let script = document.createElement('script');
    script.type='text/javascript';
   // script.src=
} 
