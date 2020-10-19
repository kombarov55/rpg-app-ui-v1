import Globals from "./Globals";

export default {
    info: text => Globals.growl.show({severity: "info", summary: text}),
    error: text => Globals.growl.show({severity: "error", summary: text}),
    success: text => Globals.growl.show({severity: "success", summary: text})
}