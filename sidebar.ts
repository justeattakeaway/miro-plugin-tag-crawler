import { clearLines, colors } from "./common";
import config from "./config";


var aws_access_key_id="AKIAIOSFODNN7EXAMPLE";
var aws_secret_access_key="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

miro.onReady(() => {
  new Vue({
    el: "#mn_app",
    data: {
      colors,
      activeColor: null,
      enabled: false,
    },
    methods: {
      setColor: async function (color: string) {

        // todo: colors not updating. Reported: https://community.miro.com/developer-platform-and-apis-57/widget-style-changes-ignored-in-update-function-7089
        // const allLines = await miro.board.widgets.get({ type: "line" });
        // const tagCrawlerLineWidgets = allLines.filter((l) => (l.metadata[config.clientId] as IMeta).isTagCrawlerLine) as unknown as SDK.ILineWidget[];
        // for (let tagCrawlerLineWidget of tagCrawlerLineWidgets) {
        //   tagCrawlerLineWidget.style.lineColor = `#${colorMap[localStorage.getItem(config.storageKeys.settings.miroPluginTagCrawlerColor)]}`;
        // }
        // await miro.board.widgets.update(tagCrawlerLineWidgets);

        this.activeColor = color;
        localStorage.setItem(config.storageKeys.settings.miroPluginTagCrawlerColor, color);
      },
      toggle: async function () {
        if (!this.enabled) await clearLines();
        localStorage.setItem(config.storageKeys.settings.miroPluginTagCrawlerEnabled, this.enabled.toString());
      },
    },
    mounted: async function () {
      this.activeColor = localStorage.getItem(config.storageKeys.settings.miroPluginTagCrawlerColor);
      this.enabled = localStorage.getItem(config.storageKeys.settings.miroPluginTagCrawlerEnabled) === "true";
    },
  });
});
