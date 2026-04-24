import { j as jsxRuntimeExports } from "./index-BOLlBpkj.js";
function PriceDisplay({
  paisa,
  className = "",
  showSymbol = true
}) {
  const rupees = Number(paisa) / 100;
  const formatted = rupees.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className, children: [
    showSymbol ? "₹" : "",
    formatted
  ] });
}
function rupeesToPaisa(rupees) {
  return BigInt(Math.round(rupees * 100));
}
export {
  PriceDisplay as P,
  rupeesToPaisa as r
};
